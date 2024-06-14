import { StyleSheet, View, Text, Image } from "react-native";
import colors from "../constants/colors";
import LogoImg from '../assets/bitnovo-logo.png';
import Button from "../components/Button";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { PaymentContext } from "../context/PaymentContext";
import { useContext } from "react";
import { currencySymbolMap } from "../constants/currencies";
import { formatToTwoDecimalsString } from "../utils/stringUtils";

export default function PaymentDoneScreen() {
  const { setAmount, setCurrency, setConcept, setPaymentUrl, setOrderId, setPaymentDone, paymentData } = useContext(PaymentContext);

  const reset = () => {
    setAmount('');
    setCurrency('USD');
    setConcept('');
    setPaymentUrl('');
    setOrderId('');
    setPaymentDone(false);
  }

  const newRequest = () => {
    reset();
    router.navigate('/');
  }

  const amount = paymentData["fiat_amount"];
  const formattedAmount = formatToTwoDecimalsString(amount.toString());
  const fiat = paymentData["fiat"];
  const currencySymbol = currencySymbolMap[fiat];

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>

        <Image source={LogoImg} style={{ width: 130, height: 130 }} />

        <Text style={styles.text}>
          ¡Pago recibido!
        </Text>

        <Text style={styles.amount}>
          {formattedAmount} {currencySymbol}
        </Text>

        <View style={styles.bottomContent}>
          <Button 
            text="Nueva solicitud"
            onPress={newRequest}
            textColor={colors.primary}
            backgroundColor={colors.complementaryLight}
            icon={<MaterialCommunityIcons name="wallet-plus" size={24} style={{ marginLeft: 10 }} color={colors.primary} />}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    backgroundColor: colors.complementary,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
    paddingTop: 30,
    gap: 30,
  },
  text: {
    color: colors.primaryDark,
    fontSize: 32,
    lineHeight: 35,
    fontWeight: '700',
    marginTop: 10,
  },
  amount: {
    color: colors.primaryDark,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: '700',
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
  }
});