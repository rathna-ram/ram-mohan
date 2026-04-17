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
    user
  } = useContext(AppContext);

  const { showToast } = useNotification();

  const handleLogout = () => {
    logout?.();
    showToast?.("Logged out successfully 👋", "success");
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur ${
      theme === "dark"
        ? "bg-slate-900/90 text-white"
        : "bg-white/90 text-black shadow-sm"
    }`}>
      
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">

        {/* 🌐 LOGO */}
        <div className="flex items-center space-x-2">
          <span className="text-blue-500 text-2xl">🌐</span>
          <span className="text-xl font-semibold tracking-wide">
            RathnaWeb
          </span>
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

          <Link to="/" className="hover:text-blue-500 transition">Home</Link>
          <Link to="/cards" className="hover:text-blue-500 transition">Cards</Link>
          <Link to="/dashboard" className="hover:text-blue-500 transition">Dashboard</Link>
          <Link to="/about" className="hover:text-blue-500 transition">About</Link>

          {isLoggedIn && (
            <Link to="/profile" className="hover:text-blue-500 transition">
              Profile
            </Link>
          )}

          {/* 🔥 USER INFO */}
          {isLoggedIn && (
            <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-lg">

              {/* 📧 Email */}
              <span className="text-sm">
                {user?.email}
              </span>

              {/* 🏷 Role Badge */}
              <span className={`text-xs px-2 py-1 rounded-full ${
                user?.role === "admin"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}>
                {user?.role}
              </span>
            </div>
          )}

          {/* 🌙 THEME */}
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg transition"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {/* 🔐 AUTH */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg transition">
                Login
              </button>
            </Link>
          )}
        </nav>
      </div>

      {/* 📱 MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-xl rounded-2xl mx-4 mt-2 p-4 flex flex-col space-y-4 text-lg">

          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/cards" onClick={() => setIsMenuOpen(false)}>Cards</Link>
          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>

          {isLoggedIn && (
            <>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>

              {/* 📧 Email + Role */}
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg text-center">
                <p className="text-sm">{user?.email}</p>
                <p className="text-xs mt-1">
                  Role: <span className="font-semibold">{user?.role}</span>
                </p>
              </div>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="w-full bg-green-500 text-white py-2 rounded-lg">
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