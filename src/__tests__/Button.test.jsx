import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";
import { describe, it, expect, vi } from "vitest";

describe("Button", () => {
  it("renders button and handles click", () => {
    const handleClick = vi.fn();

    render(<Button text="Click Me" onClick={handleClick} />);

    const button = screen.getByText("Click Me");

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});