import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "./filter-bar";

jest.mock("src/assets/icons/magnifier.svg", () => () => (
  <span>MagnifierMock</span>
));
jest.mock("src/assets/icons/bookmark.svg", () => () => (
  <span>BookmarkMock</span>
));

describe("FilterBar Component", () => {
  test("renders with default title", () => {
    render(<FilterBar />);
    expect(screen.getByPlaceholderText("suchen")).toBeInTheDocument();
    expect(screen.getByText("Favoriten")).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    render(<FilterBar />);
    const input = screen.getByPlaceholderText("suchen");

    fireEvent.change(input, { target: { value: "New Input" } });
    expect(input).toHaveValue("New Input");
  });

  test("clears input when clear button is clicked", () => {
    render(<FilterBar />);
    const input = screen.getByPlaceholderText("suchen");

    fireEvent.change(input, { target: { value: "Some Input" } });
    expect(input).toHaveValue("Some Input");

    const clearButton = screen.getByText("✕");

    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });
});
