import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const {
    theme,
    toggleTheme,
    isLoggedIn,
    logout,
    user,
    switchRole
  } = useContext(AppContext);

  const { showToast } = useNotification();

  const handleLogout = () => {
    logout?.();
    showToast?.("Logged out successfully 👋", "success");
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-white text-black shadow"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        {/* 🌐 LOGO */}
        <div className="flex items-center space-x-2">
          <span className="text-blue-500 text-2xl">🌐</span>
          <span className="text-xl font-bold">RathnaWeb</span>
        </div>

        {/* 📱 MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* 💻 DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">

          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/cards" className="hover:text-blue-500">Cards</Link>
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>

          {isLoggedIn && (
            <Link to="/profile" className="hover:text-blue-500">
              Profile
            </Link>
          )}

          {/* ROLE */}
          {isLoggedIn && (
            <select
              value={user?.role || "user"}
              onChange={(e) => {
                switchRole?.(e.target.value);
                showToast?.(`Switched to ${e.target.value} ✅`, "info");
              }}
              className="px-3 py-1 rounded border bg-white text-black dark:bg-slate-700 dark:text-white cursor-pointer"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}

          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {/* AUTH */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                Login
              </button>
            </Link>
          )}
        </nav>
      </div>

      {/* 📱 MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow px-5 py-5 flex flex-col space-y-4 text-lg font-medium">

          <Link to="/" className="block hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          <Link to="/cards" className="block hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
            Cards
          </Link>

          <Link to="/dashboard" className="block hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
            Dashboard
          </Link>

          <Link to="/about" className="block hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>

          {isLoggedIn && (
            <Link
              to="/profile"
              className="block hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          )}

          {/* ROLE */}
          {isLoggedIn && (
            <select
              value={user?.role || "user"}
              onChange={(e) => {
                switchRole?.(e.target.value);
                showToast?.(`Switched to ${e.target.value} ✅`, "info");
              }}
              className="w-full px-4 py-2 rounded border text-base bg-white text-black dark:bg-slate-700 dark:text-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}

          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          {/* AUTH */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;