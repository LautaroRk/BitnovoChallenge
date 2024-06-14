import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import colors from "../constants/colors";
import { MaterialIcons } from '@expo/vector-icons';
import Button from "./Button";

export default function MessageSentModal({ visible, closeModal, selectedMethod }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.bottomView}>
        <View style={styles.modalView}>

          <View style={styles.iconContainer}>
            <MaterialIcons name="check" size={50} color={colors.green} />
          </View>

          <Text style={styles.title}>Solicitud enviada</Text>
          <Text style={styles.description}>Tu solicitud de pago ha sido enviada con éxito por {selectedMethod}.</Text>

          <View style={styles.buttonContainer}>
            <Button text="Entendido" onPress={closeModal} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  modalView: {
    width: '97%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: "center",
    shadowColor: colors.lightShadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 450,
  },
  iconContainer: {
    backgroundColor: colors.lightGreen,
    borderRadius: 50,
    padding: 10,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: 25,
    textAlign: "center",
  },
  description: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.grey,
  }
});
