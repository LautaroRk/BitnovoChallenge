import { Dimensions, StyleSheet, View, Text } from "react-native";
import colors from "../constants/colors";
import { PaymentContext } from "../context/PaymentContext";
import { useContext } from "react";
import QRCode from 'react-native-qrcode-svg';
import LogoImg from '../assets/bitnovo-logo.png';
import Header from "../components/Header";
import { currencySymbolMap } from "../constants/currencies";
import useWebSocket from "../hooks/useWebSocket";

export default function QrCodeScreen() {
  const { paymentUrl, amount, currency } = useContext(PaymentContext);

  useWebSocket('qr-code');

  const windowWidth = Dimensions.get('window').width;
  const qrSize = windowWidth * 0.9;
  const logoSize = qrSize * 0.2;

  const currencySymbol = currencySymbolMap[currency];

  return (
    <View style={styles.container}>
      <Header showBackBtn />

      <View style={styles.contentContainer}>
        <View style={styles.instructionsBanner}>
          <View style={styles.exclamationCircle}>
            <Text>!</Text>
          </View>
          <Text style={styles.instructionsText}>Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay.</Text>
        </View>

        <QRCode
          size={qrSize}
          value={paymentUrl}
          logo={LogoImg}
          logoSize={logoSize}
          logoBackgroundColor={colors.white}
          logoMargin={10}
          logoBorderRadius={50}
          quietZone={15}
          backgroundColor={colors.white}
          color={colors.primaryDark}
        />

        <Text style={styles.amount}>{amount} {currencySymbol}</Text>

        <Text style={styles.willUpdate}>Esta pantalla se actualizará automáticamente.</Text>
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
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    padding: 20,
    paddingTop: 30,
    gap: 30,
  },
  instructionsBanner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.lighterGrey,
    borderRadius: 5,
    width: '100%',
  },
  exclamationCircle: {
    backgroundColor: colors.complementary,
    borderRadius: 50,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  instructionsText: {
    color: colors.primaryDark,
    fontSize: 14,
    lineHeight: 20,
    width: '87%',
  },
  amount: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '600',
    marginTop: 10,
  },
  willUpdate: {
    color: colors.white,
  },
});