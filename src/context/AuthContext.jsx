import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Error parsing user from localStorage:", error);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
