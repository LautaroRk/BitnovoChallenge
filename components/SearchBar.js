import { StyleSheet, TextInput, View } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function SearchBar({ searchPhrase, setSearchPhrase, placeholder = "Buscar" }) {
  const clearSearchPhrase = () => setSearchPhrase("");

  return (
    <View style={styles.container}>
      <Feather
        name="search"
        size={20}
        color={colors.lightGrey}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.lightGrey}
        value={searchPhrase}
        onChangeText={setSearchPhrase}
      />

      {searchPhrase.length > 0 && (
        <Entypo name="cross" size={20} color={colors.lightGrey} onPress={clearSearchPhrase} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.lightGrey,
    padding: 15,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    color: colors.primaryDark,
  },
});