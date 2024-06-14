import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Platform, Keyboard, Pressable } from "react-native";
import { useContext, useState } from "react";
import { PaymentContext } from "../context/PaymentContext";
import colors from "../constants/colors";
import PaymentImg from "../assets/payment.png";
import { currencySymbolMap } from "../constants/currencies";
import WhatsAppInput from "../components/WhatsAppInput";
import SelectModal from "../components/SelectModal";
import { countryCodesList } from "../constants/country-codes";
import EmailInput from "../components/EmailInput";
import AppShareOption from "../components/AppShareOption";
import Button from "../components/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import GenerateQROption from "../components/GenerateQROption";
import { RootSiblingParent } from 'react-native-root-siblings';
import useWebSocket from "../hooks/useWebSocket";
import MessageSentModal from "../components/MessageSentModal";

export default function ShareLinkScreen() {
  const { 
    amount, setAmount,
    currency, setCurrency,
    concept, setConcept,
    paymentUrl, setPaymentUrl,
    orderId, setOrderId,
    setPaymentDone,
  } = useContext(PaymentContext);

  useWebSocket('share-link');
  
  console.log('paymentUrl', paymentUrl);

  const currencySymbol = currencySymbolMap[currency];

  const [modalVisible, setModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+34');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);

  const [linkSent, setLinkSent] = useState(false);

  let message = `Enlace de pago: ${paymentUrl}`;
  if (concept) message += `\nConcepto: ${concept}`;

  const closeKeyboard = () => {
    Keyboard.dismiss();
  }

  const reset = () => {
    setAmount('');
    setConcept('');
    setCurrency('USD');
    setPaymentDone(false);
    setEmail('');
    setPhoneNumber('');
    setSelectedMethod(null);
    setPaymentUrl('');
    setOrderId('');
  }

  const newRequest = () => {
    reset();
    router.navigate('/');
  }

  const clearSelectedMethod = () => {
    setSelectedMethod(null);
  }

  return (
    <RootSiblingParent>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        <SelectModal
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          title="Selecciona un país"
          options={countryCodesList}
          selectedItem={countryCode}
          setSelectedItem={setCountryCode}
        />

        <MessageSentModal
          visible={linkSent}
          selectedMethod={selectedMethod}
          closeModal={() => {
            setLinkSent(false);
            clearSelectedMethod();
          }}
        />

        <View style={styles.top}>
          <Pressable onPress={closeKeyboard}>
            <View style={cardStyles.card}>
              <View style={cardStyles.cardTop}>
                <View style={cardStyles.topLeft}>
                  <Image source={PaymentImg} style={cardStyles.image} />
                </View>
                <View style={cardStyles.topRight}>
                  <Text style={cardStyles.title}>Solicitud de pago</Text>

                  <View style={cardStyles.amountContainer}>
                    <Text style={cardStyles.amount}>{amount}</Text>
                    <Text style={cardStyles.amount}>{currencySymbol}</Text>
                  </View>
                </View>
              </View>

              <Text style={cardStyles.instructions}>Comparte el enlace de pago con el cliente</Text>
            </View>
          </Pressable>

          <View style={styles.sharingOptions}>
            <GenerateQROption
              paymentUrl={paymentUrl}
              clearSelectedMethod={clearSelectedMethod}
            />

            <EmailInput
              isFocused={selectedMethod === 'email'}
              unfocus={() => setSelectedMethod(null)}
              paymentUrl={paymentUrl}
              email={email}
              setEmail={setEmail}
              selectMethod={() => setSelectedMethod('email')}
              message={message}
              setLinkSent={setLinkSent}
            />

            <WhatsAppInput
              isFocused={selectedMethod === 'WhatsApp'}
              unfocus={() => setSelectedMethod(null)}
              paymentUrl={paymentUrl}
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectCountryCode={() => setModalVisible(true)}
              selectMethod={() => setSelectedMethod('WhatsApp')}
              message={message}
              setLinkSent={setLinkSent}
            />

            <AppShareOption
              paymentUrl={paymentUrl}
              setLinkSent={setLinkSent}
              clearSelectedMethod={clearSelectedMethod}
            />
          </View>
        </View>

        <View style={styles.bottomContent}>
          <Button 
            text="Nueva solicitud"
            onPress={newRequest}
            textColor={colors.primary}
            backgroundColor={colors.complementaryLight}
            icon={<MaterialCommunityIcons name="wallet-plus" size={24} style={{ marginLeft: 10 }} color={colors.primary} />}
          />
        </View>
      </KeyboardAvoidingView>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    paddingTop: 70,
    paddingHorizontal: 20,
    gap: 15,
  },
  top: {
    width: '100%',
  },
  sharingOptions: {
    gap: 15,
  },
  bottomContent: {
    width: '100%',
    marginBottom: 35,
  }
});

const cardStyles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.lighterGrey,
    margin: 0,
    padding: 20,
    paddingTop: 0,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  topRight: {
    flexDirection: 'column',
    gap: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.grey,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  amount: {
    fontSize: 25,
    fontWeight: '700',
  },
  image: {
    width: 60,
    height: 60,
  },
  instructions: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
    color: colors.grey,
  },
});