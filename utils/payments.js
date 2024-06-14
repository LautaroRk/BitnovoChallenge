export const isPaymentCompleted = (paymentData, expectedAmount, expectedFiat) => {
  if (!paymentData || !paymentData['fiat'] || !paymentData['fiat_amount'] || !paymentData['status']) return false;

  if (paymentData['status'] !== "CO") return false;
  if (paymentData['fiat'] !== expectedFiat) return false;
  if (paymentData['fiat_amount'] < expectedAmount) return false;

  return true;
}