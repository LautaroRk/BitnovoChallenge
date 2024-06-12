import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default function SmallButton({ text = "", icon = null, onPress }) {
  return (
    <View onClick={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {icon && icon}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.complementaryLight,
  },
  text: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 16,
    color: colors.primaryDark,
  },
});
