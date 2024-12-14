import { render, screen, fireEvent } from "@testing-library/react";
import { CreateRecipeInput } from "./create-recipe-input";
import { useForm, FormProvider } from "react-hook-form";
import { CreateRecipeSchema } from "@/validation/createRecipeSchema";

const TestWrapper = () => {
  const methods = useForm<CreateRecipeSchema>();
  return (
    <FormProvider {...methods}>
      <CreateRecipeInput
        fields={[
          { name: "title" as keyof CreateRecipeSchema, label: "Test Label" },
        ]}
        control={methods.control}
        onFileChange={() => {}}
      />
    </FormProvider>
  );
};

describe("CreateRecipeInput", () => {
  const mockOnFileChange = jest.fn();

  beforeEach(() => {
    mockOnFileChange.mockClear();
  });

  test("should render correctly", () => {
    const { debug } = render(<TestWrapper />);

    expect(screen.getByTestId("create-recipe-form")).toBeInTheDocument();
    expect(screen.getByTestId("form-item-title")).toBeInTheDocument();
    expect(screen.getByTestId("form-label-title")).toBeInTheDocument();
    expect(screen.getByTestId("input-title")).toBeInTheDocument();

    debug();
  });

  test("should handle text input correctly", () => {
    render(<TestWrapper />);
    const input = screen.getByTestId("input-title");
    fireEvent.change(input, { target: { value: "Test Eingabe" } });
    expect(input).toHaveValue("Test Eingabe");
  });
});
