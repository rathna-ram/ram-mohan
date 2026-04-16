import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);

  // ✅ LOGIN
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // ✅ LOGOUT
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // ✅ PROFILE UPDATE
  const updateProfile = (data) => {
    setUser((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // ✅ SWITCH ROLE 🔥
  const switchRole = (role) => {
    setUser((prev) => ({
      ...prev,
      role,
    }));
  };

  // ✅ THEME
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isLoggedIn,
        login,
        logout,
        user,
        updateProfile,
        switchRole, // ✅ IMPORTANT
        cards,
        setCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};