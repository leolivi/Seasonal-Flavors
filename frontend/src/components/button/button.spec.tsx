import { render, fireEvent } from "@testing-library/react";
import { Button } from "./button";
import { Season } from "@/utils/Season";

jest.mock("@/utils/Season");

describe("Button Component", () => {
  test("should call on Click when btn is clicked", () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button label="Click Me" onClick={mockOnClick} />,
    );

    const buttonElement = getByText(/click me/i);

    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should have the correct color based on the current season", () => {
    const mockColor = "sfgreen";
    (Season as jest.Mock).mockImplementation(() => {
      return {
        getColor: jest.fn().mockReturnValue(mockColor),
      };
    });

    const { getByText } = render(
      <Button label="Click Me" onClick={() => {}} />,
    );

    const buttonElement = getByText(/click me/i).closest("button");

    expect(buttonElement).toHaveClass(`bg-${mockColor}-light`);
    expect(buttonElement).toHaveClass(`hover:bg-${mockColor}`);
    expect(buttonElement).toHaveClass(`active:bg-${mockColor}-dark`);
  });
});
