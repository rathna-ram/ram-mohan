import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { cards, user } = useContext(AppContext);

  const recentCards = cards?.slice(0, 6) || [];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* USER INFO */}
     

      {/* TOTAL CARDS */}
      <div className="mb-6 p-4 bg-blue-400 rounded">
        <h2 className="text-xl font-semibold">
          Total Cards: {cards?.length || 0}
        </h2>
      </div>

      {/* RECENT CARDS */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Recent Cards</h2>

        {recentCards.length === 0 ? (
          <p>No recent cards</p>
        ) : (
          <ul className="space-y-2">
            {recentCards.map((card) => (
              <li
                key={card.id}
                className="p-3 bg-white rounded shadow"
              >
                {card.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;