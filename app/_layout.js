import { Stack } from "expo-router/stack";
import { PaymentContext } from "../context/PaymentContext";
import { useState } from "react";

export default function Layout() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [concept, setConcept] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [orderId, setOrderId] = useState("");
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  return (
    <PaymentContext.Provider
      value={{
        amount,
        setAmount,
        currency,
        setCurrency,
        concept,
        setConcept,
        paymentUrl,
        setPaymentUrl,
        orderId,
        setOrderId,
        paymentDone,
        setPaymentDone,
        paymentData,
        setPaymentData,
      }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PaymentContext.Provider>
  );
}
