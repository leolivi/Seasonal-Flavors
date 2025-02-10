import { FormField } from "../recipe-form-wrapper/recipe-form-wrapper";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TipTapEditor } from "../tiptap/tiptap-editor";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import CreateRecipeForm from "./create-recipe-form";

// mock the cross icon
jest.mock("src/assets/icons/cross.svg", () => {
  const CrossMock = () => <span>CrossMock</span>;
  CrossMock.displayName = "CrossMock";
  return CrossMock;
});

// mock the plus icon
jest.mock("src/assets/icons/plus.svg", () => {
  const PlusMock = () => <span>PlusMock</span>;
  PlusMock.displayName = "PlusMock";
  return PlusMock;
});

// mock the recipe create service
jest.mock("@/services/recipe/recipeCreate", () => ({
  handleCreateRecipe: jest.fn(),
}));

// mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// mock the toast
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

// mock the image upload service
jest.mock("@/services/image/imageUpload");

const mockRouter = { push: jest.fn(), back: jest.fn() };
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
  @desc Test the create recipe form
*/
describe("CreateRecipeForm", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the form with all fields", () => {
    render(
      <CreateRecipeForm
        formFields={mockFormFields as FormField[]}
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
      <CreateRecipeForm
        formFields={mockFormFields as FormField[]}
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
      <CreateRecipeForm
        formFields={mockFormFields as FormField[]}
        tags={mockTags}
        user={mockUser}
      />,
    );

    const submitButton = screen.getByRole("button", { name: /speichern/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Kochzeit ist erforderlich."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Vorbereitungszeit ist erforderlich."),
      ).toBeInTheDocument();
      expect(screen.getByText("Titel ist erforderlich.")).toBeInTheDocument();
    });
  });

  test("renders TipTapEditor", () => {
    const TipTapEditorWrapper = () => {
      const methods = useForm({
        defaultValues: {
          steps: { type: "doc", content: [] },
        },
      });

      return (
        <FormProvider {...methods}>
          <TipTapEditor
            data-testid="tiptap-editor"
            content={{ type: "doc", content: [] }}
            onContentChange={() => {}}
          />
        </FormProvider>
      );
    };

    render(<TipTapEditorWrapper />);

    expect(screen.getByTestId("tiptap-editor")).toBeInTheDocument();
  });
});
