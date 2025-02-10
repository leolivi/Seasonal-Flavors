import { render, screen } from "@testing-library/react";
import RecipeFormWrapper from "./recipe-form-wrapper";
import { useRouter } from "next/navigation";

// mock the use router hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// mock the create recipe form
jest.mock("../forms/create-recipe-form", () => {
  return jest.fn(() => <div data-testid="mock-recipe-form" />);
});

// mock the edit recipe form
jest.mock("../forms/edit-recipe-form", () => {
  return jest.fn(() => <div data-testid="mock-edit-recipe-form" />);
});

// mock the tags
const mockTags = [
  { id: 1, name: "Tag1" },
  { id: 2, name: "Tag2" },
];

// mock the user
const mockUser = {
  id: 1,
  name: "User  1",
  username: "user1",
  email: "user1@example.com",
};

/*
  @desc Test the recipe form wrapper
*/
describe("RecipeFormWrapper", () => {
  beforeEach(() => {
    // mock the use router hook
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test("should render correctly", () => {
    const { container } = render(
      <RecipeFormWrapper tags={mockTags} user={mockUser} />,
    );
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("mock-recipe-form")).toBeInTheDocument();
  });

  test("should render CreateRecipeForm when no recipeData is provided", () => {
    render(<RecipeFormWrapper tags={mockTags} user={mockUser} />);

    expect(screen.getByTestId("mock-recipe-form")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-edit-recipe-form"),
    ).not.toBeInTheDocument();
  });

  test("should render EditRecipeForm when recipeData is provided", () => {
    const mockRecipeData = {
      id: 1,
      user_id: "1",
      title: "Test Recipe",
      cooking_time: 30,
      prep_time: 15,
      servings: 4,
      cover_image: "image_url",
      steps: JSON.stringify(["Step 1", "Step 2", "Step 3"]),
      ingredients: JSON.stringify([
        { name: "Ingredient 1", quantity: "1 cup" },
        { name: "Ingredient 2", quantity: "2 tbsp" },
      ]),
      season: "1",
    };

    render(
      <RecipeFormWrapper
        recipeData={mockRecipeData}
        tags={mockTags}
        user={mockUser}
      />,
    );

    expect(screen.getByTestId("mock-edit-recipe-form")).toBeInTheDocument();
    expect(
      screen.queryByTestId("mock-create-recipe-form"),
    ).not.toBeInTheDocument();
  });
});
