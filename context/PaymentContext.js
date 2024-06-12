import { createContext } from "react";

export const PaymentContext = createContext({
  value: '',
  currency: 'USD',
  concept: '',
});
