import { useContext, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { isPaymentCompleted } from '../utils/payments';
import { fromStringToFloat } from '../utils/stringUtils';
import { PaymentContext } from '../context/PaymentContext';
import { AppState } from 'react-native';

const useWebSocket = (screenName) => {
  const { setPaymentDone, paymentDone, setPaymentData, orderId, amount, currency } = useContext(PaymentContext);

  const socketRef = useRef(null);

  function openSocket() {
    console.log(`[${screenName}] Opening socket`);

    socketRef.current = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${orderId}`);

    socketRef.current.addEventListener('open', () => console.log(`[${screenName}] Socket opened`));
    socketRef.current.addEventListener('close', () => console.log(`[${screenName}] Socket closed`));

    socketRef.current.addEventListener('message', (event) => {
      if (!event?.data) return;

      console.log(`[${screenName}] event.data:`, event.data);

      const parsedData = JSON.parse(event.data);
      const parsedAmount = fromStringToFloat(amount);

      const success = isPaymentCompleted(parsedData, parsedAmount, currency);

      if (success) {
        setPaymentDone(true);
        setPaymentData(parsedData);
        router.navigate('/payment-done');
      }
    });
  }

  useEffect(() => {
    if (paymentDone) router.navigate('/payment-done');
  }, [paymentDone]);

  useEffect(() => {
    const socketAlreadyOpen = socketRef.current?.readyState === 1;

    if (!socketAlreadyOpen) {
      openSocket();
    }

    return () => {
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('App has come to foreground');

        if (!socketRef.current || socketRef.current.readyState !== 1) {
          console.log('Socket needs to be reopened');
          openSocket();
        }
      }
    };

    AppState.isAvailable && AppState.addEventListener && AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.isAvailable && AppState.removeEventListener && AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
};

export default useWebSocket;
