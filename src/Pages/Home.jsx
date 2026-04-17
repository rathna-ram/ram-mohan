import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useContext(AppContext);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to RathnaWeb
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-6">

        {/* LOGIN BUTTON */}
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
        >
          Login
        </button>

        {/* REGISTER BUTTON */}
        <button
          onClick={() => alert("Register not implemented")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
        >
          Register
        </button>

      </div>
    </div>
  );
};

export default Home;