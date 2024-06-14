import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../components/Header';
import { AntDesign } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import Button from '../components/Button';
import colors from '../constants/colors';
import { formatToTwoDecimalsString, fromStringToFloat } from '../utils/stringUtils';
import { PaymentContext } from '../context/PaymentContext';
import { router } from 'expo-router';
import { currencyList, currencySymbolMap } from '../constants/currencies';
import SelectModal from '../components/SelectModal';
import { createOrder } from '../services/orders.service';

export default function CreatePaymentScreen() {
  const { 
    amount, setAmount,
    currency, setCurrency,
    concept, setConcept,
    setPaymentUrl, setOrderId,
  } = useContext(PaymentContext);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [isConceptFocused, setIsConceptFocused] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAmountChange = (amount) => {
    setHasChanged(true);
    const formattedValue = amount;
    const dotCount = formattedValue.split(',').length - 1;
    if (dotCount > 1) return;
    if (formattedValue.split(',')[1]?.length > 2) return;
    if (amount.length === 0 || amount.startsWith('.') || amount.startsWith(',')) {
      setAmount('');
      setHasChanged(false);
      return;
    }
    setAmount(formattedValue);
  };

  const handleSetAmount = () => {
    const formattedValue = formatToTwoDecimalsString(amount);
    setAmount(formattedValue);
  };

  const validConcept = concept.length <= 140;

  const createPaymentOrder = async () => {
    setLoading(true);

    Keyboard.dismiss();

    const order = {
      expected_output_amount: fromStringToFloat(amount),
      fiat: currency,
      reference: concept,
    }

    const response = await createOrder(order);

    const url = response['web_url'];
    const identifier = response['identifier'];

    if (!url) {
      setError(true);
      setLoading(false);
      return;
    }

    setPaymentUrl(url);
    setOrderId(identifier);
    setLoading(false);

    router.navigate('share-link');
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SelectModal
          isVisible={modalVisible}
          setIsVisible={setModalVisible}
          title='Selecciona una divisa'
          options={currencyList}
          selectedItem={currency}
          setSelectedItem={setCurrency}
        />

        <Header 
          title="Crear pago"
          btnRight={{ 
            text: currency,
            icon: <AntDesign name="down" size={16} color={colors.primaryDark} />,
            onPress: loading ? () => {} : () => setModalVisible(true),
          }}
        />
        
        <View style={styles.content}>
          <View style={styles.topContent}>
            <View style={styles.amountInputContainer}>
              <TextInput 
                style={[styles.amountInput, (!hasChanged || amount.length === 0) && styles.grayed]} 
                value={amount} 
                placeholder='0,00' 
                placeholderTextColor={colors.lightGrey}
                onChangeText={handleAmountChange} 
                onEndEditing={handleSetAmount} 
                inputMode='decimal'
                disabled={loading}
              />
              <Text style={[styles.currency, (!hasChanged || amount.length === 0) && styles.grayed]}>
                {currencySymbolMap[currency]}
              </Text>
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
                disabled={loading}
              />
              <Text style={[styles.charCount, !validConcept && styles.invalidConcept]}>
                {concept.length} / 140 caracteres
              </Text>
            </View>

            {error ? <Text style={styles.errorMessage}>Ocurrió un error al crear la orden de pago</Text> : null}
          </View>

          <View style={styles.bottomContent}>
            <Button 
              text={loading ? 'Creando orden...' : 'Continuar'}
              onPress={createPaymentOrder}
              disabled={loading || !amount || amount.length === 0 || amount === '0.00' || !validConcept}
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
  amountInput: {
    fontSize: 45,
    fontWeight: '700',
    lineHeight: 50,
    textAlign: 'center',
    color: colors.primary,
    marginRight: 3,
  },
  currency: {
    fontSize: 45,
    fontWeight: '700',
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
    fontWeight: '400',
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
    fontWeight: '400',
    lineHeight: 16,
    alignSelf: 'flex-end',
    color: colors.lightGrey,
  },
  invalidConcept: {
    color: colors.red,
  },
  errorMessage: {
    color: colors.red,
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  onfocus: {
    borderColor: colors.complementary,
  },
  bottomContent: {
    width: '100%',
    marginBottom: 130,
  }
});
