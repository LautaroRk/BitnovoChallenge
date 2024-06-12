import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import Button from '../components/Button';
import colors from '../constants/colors';
import { formatToTwoDecimalsString } from '../utils/stringUtils';
import SelectCurrencyModal from '../components/SelectCurrencyModal';

export default function CreatePayment() {
  const [value, setValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [concept, setConcept] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [isConceptFocused, setIsConceptFocused] = useState(false);

  const currencyChar = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const handleAmountChange = (value) => {
    setHasChanged(true);
    const formattedValue = value;
    const dotCount = formattedValue.split(',').length - 1;
    if (dotCount > 1) return;
    if (formattedValue.split(',')[1]?.length > 2) return;
    if (value.length === 0 || value.startsWith('.') || value.startsWith(',') || value.startsWith('0')) {
      setValue('');
      setHasChanged(false);
      return;
    }
    setValue(formattedValue);
  };

  const handleSetAmount = () => {
    const formattedValue = formatToTwoDecimalsString(value);
    setValue(formattedValue);
  };

  const validConcept = concept.length <= 140;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <SelectCurrencyModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        selectedCurrency={currency}
        setCurrency={setCurrency}
      />

      <Header 
        title="Crear pago"
        btnRight={{ 
          text: currency,
          icon: <AntDesign name="down" size={16} color={colors.primaryDark} />,
          onPress: () => setModalVisible(true),
        }}
      />
      
      <View style={styles.content}>
        <View style={styles.topContent}>
          <View style={styles.amountInputContainer}>
            <Text style={[styles.currency, !hasChanged && styles.grayed]}>
              {currencyChar[currency]}
            </Text>
            <TextInput 
              style={[styles.amountInput, !hasChanged && styles.grayed]} 
              value={value} 
              placeholder='0,00' 
              placeholderTextColor={colors.lightGrey}
              onChangeText={handleAmountChange} 
              onEndEditing={handleSetAmount} 
              inputMode='decimal' 
            />
          </View>

          <View style={styles.conceptInputContainer}>
            <Text style={styles.conceptLabel}>Concepto</Text>
            <TextInput 
              inputMode='text' 
              style={[styles.conceptInput, isConceptFocused && styles.onfocus]} 
              placeholder='Añade descripción del pago' 
              value={concept}
              onChangeText={setConcept}
              onBlur={() => setIsConceptFocused(false)} 
              onFocus={() => setIsConceptFocused(true)}
              multiline 
            />
            <Text style={[styles.charCount, !validConcept && styles.invalidConcept]}>
              {concept.length} / 140 caracteres
            </Text>
          </View>
        </View>

        <View style={styles.bottomContent}>
          <Button 
            text='Continuar' 
            onPress={() => {}} 
            disabled={!value || value.length === 0 || value === '0.00' || !validConcept}
          />
        </View> 
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors.white,
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  topContent: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 50,
  },
  currency: {
    fontSize: 40,
    fontWeight: 500,
    lineHeight: 50,
    textAlign: 'center',
    color: colors.primary,
    marginRight: 5,
  },
  amountInput: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 50,
    textAlign: 'center',
    color: colors.primary,
  },
  grayed: {
    color: colors.lightGrey,
  },
  conceptInputContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: 40,
    gap: 5,
  },
  conceptLabel: {
    color: colors.primaryDark,
  },
  conceptInput: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    textAlign: 'start',
    color: colors.primaryDark,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 5,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  charCount: {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    alignSelf: 'flex-end',
    color: colors.lightGrey,
  },
  invalidConcept: {
    color: colors.red,
  },
  onfocus: {
    borderColor: colors.complementary,
  },
  bottomContent: {
    width: '100%',
    marginBottom: 50,
  }
});
