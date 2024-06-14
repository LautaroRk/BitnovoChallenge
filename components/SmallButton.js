import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function SmallButton({ text = null, icon = null, onPress, whiteBackground, primary, biggerText }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, whiteBackground && styles.whiteBackground, primary && [styles.blueBackground, styles.squared]]}>
      {text && <Text style={[styles.text, biggerText && styles.biggerText, primary && styles.whiteText]}>{text}</Text>}
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
    gap: 7,
    borderRadius: 50,
    height: 34,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.lightShadow,
    alignSelf: 'flex-start'
  },
  squared: {
    borderRadius: 5,
  },
  whiteBackground: {
    backgroundColor: colors.white,
  },
  blueBackground: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    color: colors.primaryDark,
  },
  whiteText: {
    color: colors.white,
  },
  biggerText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '300',
  },
});
