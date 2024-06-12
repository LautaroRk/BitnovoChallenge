import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./Header";
import colors from "../constants/colors";
import SearchBar from "./SearchBar";
import { useState } from "react";
import EuroImg from "../assets/currencies/eur.png";
import DollarImg from "../assets/currencies/usd.png";
import PoundImg from "../assets/currencies/gbp.png";
import { AntDesign } from "@expo/vector-icons";

function CurrencyItem({ currency, name, imgSrc, selectedCurrency, selectCurrency }) {
  const isSelected = currency === selectedCurrency;

  return (
    <TouchableOpacity onPress={() => selectCurrency(currency)} style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15, gap: 20 }}>
      <Image source={imgSrc} alt={name} style={{ width: 40, height: 40 }} />
      <View style={{ width: '70%', gap: 4 }}>
        <Text style={{ fontSize: 18, fontWeight: 700, lineHeight: 20, color: colors.primaryDark }}>{name}</Text>
        <Text style={{ fontSize: 18, fontWeight: 400, lineHeight: 20, color: colors.grey }}>{currency}</Text>
      </View>
      { isSelected
        ? <AntDesign name="checkcircle" size={20} style={{ marginRight: 10 }} color={colors.complementary} /> 
        : <AntDesign name="right" size={20} style={{ marginRight: 10 }} color={colors.grey} />
      }
    </TouchableOpacity>
  );
}

export default function SelectCurrencyModal({ isVisible, setIsVisible, selectedCurrency, setCurrency }) {
  const [searchPhrase, setSearchPhrase] = useState("");

  // const paymentContext = useContext(PaymentContext);
  // const currentCurrency = paymentContext.currency;
  // console.log(currentCurrency)

  // const [selectedCurrency, setSelectedCurrency] = useState(currentCurrency);

  // const contextValue = useMemo(() => ({
  //   ...paymentContext,
  //   currency: selectedCurrency,
  // }), [paymentContext, selectedCurrency]);

  // console.log(contextValue)

  const closeModal = () => {
    setSearchPhrase("");
    setIsVisible(false);
  };

  const currencyList = [
    { currency: "USD", name: "Dolar Estadounidense", img: DollarImg },
    { currency: "EUR", name: "Euro", img: EuroImg },
    { currency: "GBP", name: "Libra Esterlina", img: PoundImg },
  ];

  function filterCurrencies(searchPhrase) {
    if (!searchPhrase) return currencyList;
    return currencyList.filter(currency => 
      currency.name.toLowerCase().includes(searchPhrase.toLowerCase()) || 
      currency.currency.toLowerCase().includes(searchPhrase.toLowerCase())
    );
  }

  function selectCurrency(currency) {
    setSearchPhrase("");
    setCurrency(currency);
    setIsVisible(false);
  }

  const filteredList = filterCurrencies(searchPhrase);

  return (
    <Modal animationType='slide' visible={isVisible} onRequestClose={closeModal}>
      <View style={styles.container}>
        <Header title="Selecciona una divisa" showBackBtn backBtnAction={closeModal} noBorder />

        <View style={styles.content}>

          <SearchBar searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} />

          <View style={styles.listContainer}>
            {filteredList.map(({ currency, name, img }) => (
              <CurrencyItem 
                key={currency}
                currency={currency}
                name={name}
                imgSrc={img}
                selectedCurrency={selectedCurrency}
                selectCurrency={() => selectCurrency(currency)}
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
    paddingTop: 50,
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