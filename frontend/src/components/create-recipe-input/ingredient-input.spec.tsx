import { render, screen, fireEvent } from "@testing-library/react";
import { IngredientInput } from "./ingredient-input";
import { useForm, FormProvider } from "react-hook-form";
import { CreateRecipeSchema } from "@/validation/createRecipeSchema";

// Mock the cross icon
jest.mock("@/assets/icons/cross.svg", () => ({
  __esModule: true,
  default: ({ "data-testid": testId }: { "data-testid": string }) => (
    <div data-testid={testId}>X</div>
  ),
}));

/*
  @desc Test wrapper for the ingredient input
*/
const TestWrapper: React.FC = () => {
  const methods = useForm<CreateRecipeSchema>();
  return (
    <FormProvider {...methods}>
      <IngredientInput name="ingredients" control={methods.control} />
    </FormProvider>
  );
};

describe("IngredientInput", () => {
  test("should render correctly", () => {
    render(<TestWrapper />);

    expect(screen.getByTestId("ingredient-form-item")).toBeInTheDocument();
    expect(screen.getByTestId("ingredient-label")).toBeInTheDocument();
    expect(screen.getByTestId("ingredient-input-0")).toBeInTheDocument();
    expect(screen.queryByTestId("remove-ingredient-0")).not.toBeInTheDocument();
    expect(screen.getByText("+ Zutat hinzufügen")).toBeInTheDocument();
  });

  test("should remove ingredient inputfield", () => {
    render(<TestWrapper />);

    fireEvent.click(screen.getByText("+ Zutat hinzufügen"));

    expect(screen.getByTestId("ingredient-input-0")).toBeInTheDocument();
    expect(screen.getByTestId("ingredient-input-1")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remove-ingredient-0"));

    expect(screen.queryByTestId("ingredient-input-0")).toBeInTheDocument();
    expect(screen.queryByTestId("ingredient-input-1")).not.toBeInTheDocument();
  });

  test("adds new ingredient inputfields", () => {
    render(<TestWrapper />);

    const addButton = screen.getByText("+ Zutat hinzufügen");
    fireEvent.click(addButton);

    expect(screen.getByTestId("ingredient-input-0")).toBeInTheDocument();
    expect(screen.getByTestId("ingredient-input-1")).toBeInTheDocument();
  });

  test("should update ingredient values correctly", () => {
    render(<TestWrapper />);

    const input = screen.getByTestId("ingredient-input-0");
    fireEvent.change(input, { target: { value: "Mehl" } });

    expect(input).toHaveValue("Mehl");
  });
});
