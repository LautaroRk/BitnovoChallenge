import DollarImg from "../assets/currencies/usd.png";
import EuroImg from "../assets/currencies/eur.png";
import PoundImg from "../assets/currencies/gbp.png";

export const currencyList = [
  { value: "USD", name: "Dolar Estadounidense", img: DollarImg },
  { value: "EUR", name: "Euro", img: EuroImg },
  { value: "GBP", name: "Libra Esterlina", img: PoundImg },
];

export const currencySymbolMap = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};