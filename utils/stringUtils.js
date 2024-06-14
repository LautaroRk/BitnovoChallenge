export const formatToTwoDecimalsString = (stringValue) => {
  if (!stringValue) return '';
  const dotValue = stringValue.replace(',', '.');
  const floatValue = parseFloat(dotValue);
  if (isNaN(floatValue)) return '';
  return floatValue.toFixed(2).toString().replace('.', ',');
};

export const fromStringToFloat = (stringValue) => {
  if (!stringValue) return null;
  const dotValue = stringValue.replace(',', '.');
  const floatValue = parseFloat(dotValue);
  if (isNaN(floatValue)) return 0;
  return floatValue;
}