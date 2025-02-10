import { render, screen, fireEvent } from "@testing-library/react";
import { RecipeInput } from "./recipe-input";
import { useForm, FormProvider } from "react-hook-form";
import { CreateRecipeSchema } from "@/validation/createRecipeSchema";

// Test wrapper for the recipe input
const TestWrapper = () => {
  const methods = useForm<CreateRecipeSchema>();
  return (
    <FormProvider {...methods}>
      <RecipeInput
        fields={[
          { name: "title" as keyof CreateRecipeSchema, label: "Test Label" },
        ]}
        control={methods.control}
        onFileChange={() => {}}
      />
    </FormProvider>
  );
};

/*
  @desc Test the recipe input
*/
describe("RecipeInput", () => {
  const mockOnFileChange = jest.fn();

  beforeEach(() => {
    mockOnFileChange.mockClear();
  });

  test("should render correctly", () => {
    render(<TestWrapper />);

    expect(screen.getByTestId("create-recipe-form")).toBeInTheDocument();
    expect(screen.getByTestId("form-item-title")).toBeInTheDocument();
    expect(screen.getByTestId("form-label-title")).toBeInTheDocument();
    expect(screen.getByTestId("input-title")).toBeInTheDocument();
  });

  test("should handle text input correctly", () => {
    render(<TestWrapper />);
    const input = screen.getByTestId("input-title");
    fireEvent.change(input, { target: { value: "Test Eingabe" } });
    expect(input).toHaveValue("Test Eingabe");
  });
});
