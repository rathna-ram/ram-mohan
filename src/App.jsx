import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AppContext } from "./context/AppContext.jsx";

// Lazy Imports (with .jsx)
const Home = lazy(() => import("./Pages/Home.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const About = lazy(() => import("./Pages/About.jsx"));
const Cards = lazy(() => import("./Pages/Cards.jsx"));
const Dashboard = lazy(() => import("./Pages/Dashboard.jsx"));
const UserProfile = lazy(() => import("./Pages/UserProfile.jsx"));

function App() {
  const { theme } = useContext(AppContext);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <BrowserRouter>
        {/* Header */}
        <Header />

        {/* Lazy Loading */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <h1 className="text-2xl">Loading...</h1>
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route
              path="/cards"
              element={
                <ProtectedRoute>
                  <Cards />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;