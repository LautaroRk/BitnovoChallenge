import { Linking, StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import SmallButton from "./SmallButton";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import colors from "../constants/colors";

export default function WhatsAppInput({ countryCode, selectCountryCode, phoneNumber, setPhoneNumber, isFocused, unfocus, selectMethod, message }) {
  const sendWhatsAppMessage = () => {
    const completePhoneNumber = `${countryCode}${phoneNumber}`;
    const text = encodeURIComponent(message);

    const whatsappUrl = `whatsapp://send?phone=${completePhoneNumber}&text=${text}`;
    Linking.openURL(whatsappUrl);

    unfocus();
  };

  return (
    <Pressable onPress={selectMethod}>
      <View style={[styles.container, isFocused && styles.focused]}>
        <FontAwesome name="whatsapp" size={24} color={colors.complementary} />
        { isFocused ? (
          <>
            <SmallButton 
              text={countryCode} 
              onPress={selectCountryCode} 
              whiteBackground
              biggerText
              icon={<AntDesign name="down" size={16} color={colors.primaryDark} />}
            />
            <TextInput
              style={styles.input}
              placeholder="300 678 9087"
              inputMode="numeric"
              value={phoneNumber}
              autoComplete="tel"
              onChangeText={setPhoneNumber}
              autoFocus
            />
            <SmallButton onPress={sendWhatsAppMessage} text="Enviar" primary />
          </>
        ) : (
          <Text style={styles.nonFocusedText}>Enviar a número de WhatsApp</Text>
        )}
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
  input: {
    fontSize: 16,
    width: "50%",
    color: colors.primaryDark,
  },
  focused: {
    borderColor: colors.primary,
  },
  buttonContainer: {
    width: 100,
    height: 60,
    paddingVertical: 14,
  },
  nonFocusedText: {
    textAlign: "start",
    width: '85%',
  }
});