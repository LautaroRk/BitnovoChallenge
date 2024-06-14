import { createContext } from "react";

export const PaymentContext = createContext({
  amount: '',
  setAmount: () => {},
  currency: 'USD',
  setCurrency: () => {},
  concept: '',
  setConcept: () => {},
  paymentUrl: '',
  setPaymentUrl: () => {},
  orderId: '',
  setOrderId: () => {},
  paymentDone: false,
  setPaymentDone: () => {},
  paymentData: null,
  setPaymentData: () => {},
});
