export const formatToTwoDecimalsString = (stringValue) => {
  if (!stringValue) return '';
  const dotValue = stringValue.replace(',', '.');
  const floatValue = parseFloat(dotValue);
  if (isNaN(floatValue)) return '';
  return floatValue.toFixed(2).toString().replace('.', ',');
};