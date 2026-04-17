import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);

  // ✅ LOAD DATA FROM LOCALSTORAGE (FIX FOR LIVE + REFRESH)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedTheme = localStorage.getItem("theme");

    if (savedUser) {
      setUser(savedUser);
      setIsLoggedIn(true);
    }

    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // ✅ LOGIN (UPDATED)
  const login = (userData) => {
    // 🔥 ensure role exists
    const finalUser = {
      ...userData,
      role: userData.role || "user",
    };

    setIsLoggedIn(true);
    setUser(finalUser);

    // ✅ SAVE
    localStorage.setItem("user", JSON.stringify(finalUser));
  };

  // ✅ LOGOUT (UPDATED)
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

    // ✅ CLEAR STORAGE
    localStorage.removeItem("user");
  };

  // ✅ PROFILE UPDATE (UPDATED)
  const updateProfile = (data) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        ...data,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // ✅ SWITCH ROLE (UPDATED 🔥)
  const switchRole = (role) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        role,
      };

      // ✅ SAVE ROLE
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // ✅ THEME (UPDATED)
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
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
        switchRole,
        cards,
        setCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};