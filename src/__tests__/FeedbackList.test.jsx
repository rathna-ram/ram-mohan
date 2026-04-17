import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackList from "../components/FeedbackList";
import { describe, it, expect, vi } from "vitest";

describe("FeedbackList", () => {
  const mockSetFeedbacks = vi.fn();

  const feedbacks = [
    { id: 1, rating: 5, comment: "Excellent" },
    { id: 2, rating: 3, comment: "Good" },
  ];

  it("renders empty state", () => {
    render(
      <FeedbackList feedbacks={[]} id="1" setFeedbacks={mockSetFeedbacks} />
    );

    expect(screen.getByText(/no feedback yet/i)).toBeInTheDocument();
  });

  it("renders feedback items", () => {
    render(
      <FeedbackList
        feedbacks={feedbacks}
        id="1"
        setFeedbacks={mockSetFeedbacks}
      />
    );

    expect(screen.getByText("Excellent")).toBeInTheDocument();
    expect(screen.getByText("Good")).toBeInTheDocument();
  });

  it("handles delete click", () => {
    render(
      <FeedbackList
        feedbacks={feedbacks}
        id="1"
        setFeedbacks={mockSetFeedbacks}
      />
    );

    const deleteButtons = screen.getAllByText(/delete/i);

    fireEvent.click(deleteButtons[0]);

    expect(mockSetFeedbacks).toHaveBeenCalled();
  });
});