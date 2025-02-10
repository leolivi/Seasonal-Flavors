import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditRecipeForm from "./edit-recipe-form";
import { FormField } from "../recipe-form-wrapper/recipe-form-wrapper";
import { clearCommonMocks, setupCommonMocks } from "../__mocks__/test-mocks";

// mock the router
const mockRouter = { push: jest.fn(), back: jest.fn() };
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

// mock the tags
const mockTags = [
  { id: 1, name: "Frühling" },
  { id: 2, name: "Sommer" },
];

// mock the user
const mockUser = {
  id: 1,
  email: "test@example.com",
  username: "testuser",
};

// mock the recipe data
const mockRecipeData = {
  id: 1,
  title: "Test Rezept",
  cooking_time: 30,
  prep_time: 15,
  servings: 4,
  steps: JSON.stringify({ type: "doc", content: [] }),
  ingredients: "Zutaten",
  season: [1, 2],
  user_id: "1",
};

// mock the form fields
const mockFormFields = [
  { name: "title", label: "Titel" },
  { name: "cover_image", label: "Cover Image" },
  { name: "cooking_time", label: "Kochzeit" },
  { name: "servings", label: "Portionen" },
  { name: "prep_time", label: "Vorbereitungszeit" },
  { name: "ingredients", label: "Zutaten" },
  { name: "steps", label: "Schritte" },
];

/*
  @desc Test the edit recipe form
*/
describe("EditRecipeForm", () => {
  beforeAll(() => {
    setupCommonMocks();
  });

  afterEach(() => {
    clearCommonMocks();
  });

  test("should render the form with all fields", () => {
    render(
      <EditRecipeForm
        formFields={mockFormFields as FormField[]}
        recipeData={{ ...mockRecipeData, user_id: mockUser.id.toString() }}
        tags={mockTags}
        user={mockUser}
      />,
    );

    expect(
      screen.getByRole("button", { name: /speichern/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /abbrechen/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("tiptap-editor")).toBeInTheDocument();

    expect(screen.getByTestId("ingredient-input-0")).toBeInTheDocument();

    mockTags.forEach((tag) => {
      expect(
        screen.getByRole("checkbox", {
          name: new RegExp(tag.name, "i"),
        }),
      ).toBeInTheDocument();
    });
  });

  test("should navigate back when clicking cancel", () => {
    render(
      <EditRecipeForm
        formFields={mockFormFields as FormField[]}
        recipeData={mockRecipeData}
        tags={mockTags}
        user={mockUser}
      />,
    );

    const cancelButton = screen.getByRole("button", { name: /abbrechen/i });
    fireEvent.click(cancelButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });

  test("should show validation errors", async () => {
    render(
      <EditRecipeForm
        formFields={mockFormFields as FormField[]}
        recipeData={{
          ...mockRecipeData,
          cooking_time: 0,
          prep_time: -1,
          title: "",
        }}
        tags={mockTags}
        user={mockUser}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /speichern/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/kochzeit muss eine positive zahl sein/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/vorbereitungszeit muss eine positive zahl sein/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/titel ist erforderlich/i)).toBeInTheDocument();
    });
  });
});
