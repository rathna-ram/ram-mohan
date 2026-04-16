import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ Safe notification (prevents crash)
  let showToast = () => {};
  try {
    const notification = useNotification();
    showToast = notification?.showToast || (() => {});
  } catch {
    showToast = () => {};
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Fake login validation (for now)
    if (email === "admin@gmail.com" && password === "1234") {
      login({ email, role: "admin" }); // ✅ pass object

      showToast("Login successful 🎉", "success");
      navigate("/dashboard");
    } else {
      showToast("Invalid credentials ❌", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;