import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

export default function Button({ text = "", icon = null, onPress, disabled = false }) {
  return (
    <TouchableOpacity 
      onClick={onPress} 
      style={[styles.container, disabled && styles.disabled]}
    >
      <Text style={[styles.text, disabled && styles.disabled]}>{text}</Text>
      {icon && icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 7,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  disabled: {
    backgroundColor: colors.complementaryLight,
    color: colors.complementary,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 20,
    color: colors.white,
  },
});