import { StyleSheet, Text, TextInput, Pressable, View } from "react-native";
import SmallButton from "./SmallButton";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../constants/colors";
import * as MailComposer from 'expo-mail-composer';

export default function EmailInput({ email, setEmail, isFocused, selectMethod, message, setLinkSent }) {
  const sendEmailMessage = async () => {
    if (!email) return;

    const isServiceAvailable = await MailComposer.isAvailableAsync();
    if (!isServiceAvailable) {
      alert('No se puede enviar correos electrónicos en este dispositivo');
      return;
    }

    const response = await MailComposer.composeAsync({
      recipients: [email],
      subject: 'Solicitud de pago',
      body: message,
    });

    if (response.status === 'sent') {
      setLinkSent(true);
    }
  };

  return (
    <Pressable onPress={selectMethod}>
      <View style={[styles.container, isFocused && styles.focused]}>
        <MaterialIcons name="email" size={24} color={colors.complementary} />
        { isFocused ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="someone@email.com"
              inputMode="email"
              value={email}
              onChangeText={setEmail}
              autoComplete="email"
              autoFocus
            />
            <SmallButton onPress={sendEmailMessage} text="Enviar" primary />
          </>
        ) : (
          <Text style={styles.nonFocusedText}>Enviar por correo electrónico</Text>
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
    fontSize: 14,
    lineHeight: 20,
    width: "60%",
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