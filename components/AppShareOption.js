import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import colors from "../constants/colors";
import * as Sharing from 'expo-sharing';

export default function AppShareOption({ paymentUrl, clearSelectedMethod, setLinkSent }) {
  const shareLink = async () => {
    clearSelectedMethod();
    const isAvailable = await Sharing.isAvailableAsync();

    if (!isAvailable) {
      alert('No se puede compartir en este dispositivo');
      return;
    }

    await Sharing.shareAsync(paymentUrl);

    setLinkSent(true);
  };

  return (
    <Pressable onPress={shareLink}>
      <View style={styles.container}>
        <Ionicons name="share" size={24} color={colors.complementary} />
        <Text style={styles.nonFocusedText}>Compartir con otras aplicaciones</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "lightgrey",
    padding: 15,
    height: 60,
  },
  nonFocusedText: {
    textAlign: "start",
    width: '85%',
  },
});