import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    amount: '',
    currency: '',
    concept: '',
    countryCode: '',
    whatsappNumber: '',
    email: '',
    url: ''
  });

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};
