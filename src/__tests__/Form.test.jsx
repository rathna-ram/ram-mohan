import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackForm from "../components/FeedbackForm";
import { describe, it, expect, vi } from "vitest";

describe("FeedbackForm", () => {
  it("shows error on empty submit", () => {
    const setFeedbacks = vi.fn();

    render(<FeedbackForm id="1" setFeedbacks={setFeedbacks} />);

    const button = screen.getByText("Submit");

    fireEvent.click(button);

    expect(
      screen.getByText(/please give rating and feedback/i)
    ).toBeInTheDocument();
  });
});