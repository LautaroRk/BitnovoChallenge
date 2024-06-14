import { StyleSheet, Text, View } from "react-native";
import SmallButton from "./SmallButton";
import colors from "../constants/colors";
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const GoBackIcon = <Ionicons name="arrow-back" size={16} color={colors.primaryDark} />;
const GoBackButton = ({ action }) => <SmallButton onPress={action} icon={GoBackIcon} />;

export default function Header({ title, btnRight = null, showBackBtn = false, backBtnAction, noBorder = false }) {
  const goBack = () => {
    router.canGoBack() && router.back();
  }

  return (
    <View style={[styles.container, noBorder && styles.noBorder]}>
      <View style={styles.btnContainer}>
        {showBackBtn ? <GoBackButton action={backBtnAction || goBack} /> : <View />}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.btnContainer}>
        {btnRight ? <SmallButton onPress={btnRight.onPress} text={btnRight.text} icon={btnRight.icon} /> : <View />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    marginTop: 56,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightShadow,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.primaryDark,
  },
  btnContainer: {
    width: 100,
    paddingVertical: 14,
    paddingHorizontal: 18,
  }
});