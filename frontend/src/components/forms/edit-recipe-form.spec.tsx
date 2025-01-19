import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditRecipeForm from "./edit-recipe-form";
import { useRouter } from "next/navigation";
import { FormField } from "../recipe-form-wrapper/recipe-form-wrapper";

jest.mock("src/assets/icons/cross.svg", () => {
  const CrossMock = () => <span>CrossMock</span>;
  CrossMock.displayName = "CrossMock";
  return CrossMock;
});

jest.mock("src/assets/icons/plus.svg", () => {
  const PlusMock = () => <span>PlusMock</span>;
  PlusMock.displayName = "PlusMock";
  return PlusMock;
});

jest.mock("@/services/recipe/recipePatch", () => ({
  handleRecipePatch: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

jest.mock("@/services/image/imageUpload");
jest.mock("@/services/image/imageDelete");

describe("EditRecipeForm", () => {
  const mockRouter = { push: jest.fn(), back: jest.fn() };
  const mockTags = [
    { id: 1, name: "Frühling" },
    { id: 2, name: "Sommer" },
  ];
  const mockUser = {
    id: 1,
    email: "test@example.com",
    username: "testuser",
  };
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
  const mockFormFields = [
    { name: "title", label: "Titel" },
    { name: "cover_image", label: "Cover Image" },
    { name: "cooking_time", label: "Kochzeit" },
    { name: "servings", label: "Portionen" },
    { name: "prep_time", label: "Vorbereitungszeit" },
    { name: "ingredients", label: "Zutaten" },
    { name: "steps", label: "Schritte" },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      expect(screen.getByLabelText(tag.name)).toBeInTheDocument();
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
