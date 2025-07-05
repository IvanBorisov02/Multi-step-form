import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  return (
    <AccountContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        phone,
        setPhone,
        error,
        setError,
        setTotal,
        total,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("You're outside the AccountProvider");
  }

  return context;
}

export { AccountProvider, useAccount };
