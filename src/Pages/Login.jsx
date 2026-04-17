import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ Safe notification
  let showToast = () => {};
  try {
    const notification = useNotification();
    showToast = notification?.showToast || (() => {});
  } catch {
    showToast = () => {};
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ SIMPLE AUTH LOGIC (IMPROVED)
    if (password === "1234") {
      // 🔥 Role logic
      const role = email === "admin@gmail.com" ? "admin" : "user";

      login({ email, role });

      showToast("Login successful 🎉", "success");
      navigate("/dashboard");
    } else {
      showToast("Invalid credentials ❌", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">
      
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4"
      >
        {/* 🔥 Title */}
        <h2 className="text-2xl font-bold text-center">
          Welcome Back 👋
        </h2>

        {/* 📧 Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 🔒 Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 👁 Show/Hide */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-sm text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {/* 🔘 Remember + Forgot */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <span className="text-blue-500 cursor-pointer">
            Forgot?
          </span>
        </div>

        {/* 🚀 Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;