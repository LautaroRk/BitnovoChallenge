import { StyleSheet, Text, View } from "react-native";
import Button from "./SmallButton";
import colors from "../constants/colors";

export default function Header({ title, btnRight = null, btnLeft = null }) {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        {btnLeft ? <Button onPress={btnLeft.onPress} text={btnLeft.text} icon={btnLeft.icon} /> : <View />}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.btnContainer}>
        {btnRight ? <Button onPress={btnRight.onPress} text={btnRight.text} icon={btnRight.icon} /> : <View />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightShadow,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.primaryDark,
  },
  btnContainer: {
    width: 100,
    paddingVertical: 14,
    paddingHorizontal: 18,
  }
});