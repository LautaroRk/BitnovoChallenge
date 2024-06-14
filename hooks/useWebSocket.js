import { useContext, useEffect } from 'react';
import { router } from 'expo-router';
import { isPaymentCompleted } from '../utils/payments';
import { fromStringToFloat } from '../utils/stringUtils';
import { PaymentContext } from '../context/PaymentContext';

const useWebSocket = (screenName) => {
  const { setPaymentDone, paymentDone, setPaymentData, orderId, amount, currency } = useContext(PaymentContext);

  useEffect(() => {
    if (paymentDone) router.navigate('/payment-done');
  }, [paymentDone]);

  useEffect(() => {
    const websocket = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${orderId}`);

    websocket.addEventListener('open', () => console.log(`[${screenName}] Socket opened`));
    websocket.addEventListener('close', () => console.log(`[${screenName}] Socket closed`));

    websocket.addEventListener('message', (event) => {
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

    return () => {
      websocket.close();
    };
  }, []);
};

export default useWebSocket;
