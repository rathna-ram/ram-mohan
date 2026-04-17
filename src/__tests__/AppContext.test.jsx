import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider, AppContext } from "../context/AppContext";
import { useContext } from "react";
import { describe, it, expect } from "vitest";

/* 🔹 Test Component to consume context */
const TestComponent = () => {
  const {
    theme,
    toggleTheme,
    isLoggedIn,
    login,
    logout,
    user,
    updateProfile,
    switchRole,
  } = useContext(AppContext);

  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <p data-testid="login">{isLoggedIn ? "Logged In" : "Logged Out"}</p>
      <p data-testid="user">{user?.name || "No User"}</p>
      <p data-testid="role">{user?.role || "No Role"}</p>

      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => login({ name: "Rathna", role: "user" })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => updateProfile({ name: "Updated User" })}>
        Update Profile
      </button>
      <button onClick={() => switchRole("admin")}>
        Switch Role
      </button>
    </div>
  );
};

describe("AppContext", () => {
  it("default values", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(screen.getByTestId("login")).toHaveTextContent("Logged Out");
    expect(screen.getByTestId("user")).toHaveTextContent("No User");
  });

  it("toggles theme", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("login and logout works", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(screen.getByTestId("login")).toHaveTextContent("Logged In");
    expect(screen.getByTestId("user")).toHaveTextContent("Rathna");

    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("login")).toHaveTextContent("Logged Out");
  });

  it("updates profile", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText("Login"));
    fireEvent.click(screen.getByText("Update Profile"));

    expect(screen.getByTestId("user")).toHaveTextContent("Updated User");
  });

  it("switches role", () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText("Login"));
    fireEvent.click(screen.getByText("Switch Role"));

    expect(screen.getByTestId("role")).toHaveTextContent("admin");
  });
});