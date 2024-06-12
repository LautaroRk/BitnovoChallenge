import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function SmallButton({ text = null, icon = null, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {text && <Text style={styles.text}>{text}</Text>}
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
  text: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 16,
    color: colors.primaryDark,
  },
});
