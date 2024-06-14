import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import colors from "../constants/colors";
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function GenerateQROption({ paymentUrl, clearSelectedMethod }) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(paymentUrl);
    Toast.show('Enlace copiado', {
      duration: Toast.durations.SHORT,
      position: -120,
      hideOnPress: true,
      delay: 0,
    });
  }

  const navigateToQrScreen = () => {
    clearSelectedMethod();
    router.navigate('qr-code');
  }

  return (
    <View style={styles.container}>
      <View style={styles.linkContainer}>
        <Ionicons name="link" size={24} color={colors.complementary} />
        <TouchableOpacity onPress={copyToClipboard} style={styles.text}>
          <Text style={styles.text}>{paymentUrl}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.qrContainer} onPress={navigateToQrScreen}>
        <MaterialCommunityIcons name="qrcode-scan" size={24} color={colors.complementaryLight} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "lightgrey",
    padding: 15,
    height: 60,
    gap: 25,
    overflow: 'hidden',
  },
  text: {
    textAlign: "left",
    width: '100%',
  },
  qrContainer: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    height: 60,
    width: 60,
  },
});