import { createContext, useContext, useState } from "react";

const AccessContext = createContext();

export default function AccessProvider({ children }) {
  const [isOwner, setIsOwner] = useState(false);
  const handleAccess = (password) => {
    if (password === import.meta.env.VITE_ACCESS_PASSWORD) {
      setIsOwner(true);
      alert("You now have access to all functionalities");
    } else {
      alert(
        "Typed in password is not the same as the admin password and you'll still be limited functional wise"
      );
    }
  };
  return (
    <AccessContext.Provider value={{ isOwner, setIsOwner, handleAccess }}>
      {children}
    </AccessContext.Provider>
  );
}

export const useAccess = () => useContext(AccessContext);
