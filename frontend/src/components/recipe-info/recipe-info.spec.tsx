import { render, screen } from "@testing-library/react";
import { RecipeInfo } from "./recipe-info";
import { Season } from "@/utils/Season";

jest.mock("@/utils/Season");

describe("RecipeInfo Component", () => {
  test("displays prep time, cooking time, and servings correctly", () => {
    render(
      <RecipeInfo
        id={1}
        title={"Test"}
        steps={"Test"}
        user_id={"Test"}
        prep_time={15}
        cooking_time={30}
        servings={4}
        ingredients="Tomato, Basil, Mozzarella"
      />,
    );

    expect(screen.getByText(/zubereiten/i)).toBeInTheDocument();
    expect(screen.getByText("15 min")).toBeInTheDocument();
    expect(screen.getByText(/kochen/i)).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
    expect(screen.getByText(/Portionen/i)).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  test("renders each ingredient in the ingredients list", () => {
    render(
      <RecipeInfo
        id={1}
        title={"Test"}
        steps={"Test"}
        user_id={"Test"}
        prep_time={15}
        cooking_time={30}
        servings={4}
        ingredients="Tomato, Basil, Mozzarella"
      />,
    );

    expect(screen.getByText("Tomato")).toBeInTheDocument();
    expect(screen.getByText("Basil")).toBeInTheDocument();
    expect(screen.getByText("Mozzarella")).toBeInTheDocument();
  });

  test("should have the correct color based on the current season", () => {
    const mockColor = "sfgreen";
    (Season as unknown as jest.Mock).mockImplementation(() => {
      return {
        getColor: jest.fn().mockReturnValue(mockColor),
      };
    });

    render(
      <RecipeInfo
        id={1}
        title={"Test"}
        steps={"Test"}
        user_id={"Test"}
        prep_time={15}
        cooking_time={30}
        servings={4}
        ingredients="Tomato, Basil, Mozzarella"
      />,
    );

    const container = screen.getByTestId("recipe-info-container");

    expect(container).toHaveClass(`border-${mockColor}`);
    expect(container).toHaveClass(`bg-${mockColor}-light`);
  });
});
