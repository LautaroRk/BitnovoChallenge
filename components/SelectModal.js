import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import colors from "../constants/colors";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

function Item({ value, name, imgSrc, selectedItem, selectItem }) {
  const isSelected = value === selectedItem;

  return (
    <TouchableOpacity key={value} onPress={() => selectItem(value)} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15, gap: 20 }}>
      <Image source={imgSrc} alt={name} style={{ width: 40, height: 40 }} />
      <View style={{ width: '70%', gap: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', lineHeight: 20, color: colors.primaryDark }}>{name}</Text>
        <Text style={{ fontSize: 18, fontWeight: '400', lineHeight: 20, color: colors.grey }}>{value}</Text>
      </View>
      { isSelected
        ? <AntDesign name="checkcircle" size={20} style={{ marginRight: 10 }} color={colors.complementary} /> 
        : <AntDesign name="right" size={20} style={{ marginRight: 10 }} color={colors.grey} />
      }
    </TouchableOpacity>
  );
}

export default function SelectModal({ isVisible, setIsVisible, title = "Selecciona una divisa", options, selectedItem, setSelectedItem }) {
  const [searchPhrase, setSearchPhrase] = useState("");

  const closeModal = () => {
    setSearchPhrase("");
    setIsVisible(false);
  };

  function filterItems(searchPhrase) {
    if (!searchPhrase) return options;
    return options.filter(option => 
      option.name.toLowerCase().includes(searchPhrase.toLowerCase()) || 
      option.value.toLowerCase().includes(searchPhrase.toLowerCase())
    );
  }

  function selectItem(value) {
    setSearchPhrase("");
    setSelectedItem(value);
    setIsVisible(false);
  }

  const filteredList = filterItems(searchPhrase);

  return (
    <Modal animationType='slide' visible={isVisible} onRequestClose={closeModal}>
      <View style={styles.container}>
        <Header title={title} showBackBtn backBtnAction={closeModal} noBorder />

        <View style={styles.content}>

          <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

          <View style={styles.listContainer}>
            {filteredList.map(({ value, name, img }, index) => (
              <Item 
                key={index}
                value={value}
                name={name}
                imgSrc={img}
                selectedItem={selectedItem}
                selectItem={() => selectItem(value)}
              />
            ))}
          </View>
        </View>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 20,
    paddingTop: 0,
  },
  listContainer: {
    width: '100%',
    marginTop: 20,
  },
});