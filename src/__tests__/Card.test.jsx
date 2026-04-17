import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import { AppContext } from "../context/AppContext";
import { describe, it, expect } from "vitest";

describe("Card", () => {
  it("renders card with props", () => {
    const mockContext = {
      user: { role: "admin" },
    };

    render(
      <AppContext.Provider value={mockContext}>
        <Card
          id="1"
          title="Test Card"
          body="Test Description"   // ✅ FIXED HERE
          feedbacks={{}}
          setFeedbacks={() => {}}
        />
      </AppContext.Provider>
    );

    expect(screen.getByText(/test card/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });
});