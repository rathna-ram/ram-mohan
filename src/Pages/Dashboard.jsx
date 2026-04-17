import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { cards, user, theme } = useContext(AppContext);

  const recentCards = cards?.slice(0, 6) || [];

  return (
    <div
      className={`min-h-screen px-4 py-6 ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 🔥 HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {user?.email}
          </p>
        </div>

        {/* 🔥 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* TOTAL CARDS */}
          <div className="bg-blue-500 text-white p-5 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold">Total Cards</h2>
            <p className="text-2xl font-bold mt-2">
              {cards?.length || 0}
            </p>
          </div>

          {/* USER ROLE */}
          <div className="bg-green-500 text-white p-5 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold">Role</h2>
            <p className="text-2xl font-bold mt-2">
              {user?.role}
            </p>
          </div>

          {/* QUICK INFO */}
          <div className="bg-purple-500 text-white p-5 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-lg font-semibold">Recent Count</h2>
            <p className="text-2xl font-bold mt-2">
              {recentCards.length}
            </p>
          </div>
        </div>

        {/* 🔥 RECENT CARDS */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Recent Cards
          </h2>

          {recentCards.length === 0 ? (
            <p className="text-gray-500">No recent cards</p>
          ) : (
            <ul className="space-y-3">
              {recentCards.map((card) => (
                <li
                  key={card.id}
                  className="p-4 rounded-xl bg-gray-100 dark:bg-slate-700 hover:shadow-md transition"
                >
                  <p className="font-medium">{card.title}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;