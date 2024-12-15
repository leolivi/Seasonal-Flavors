import { render, screen } from "@testing-library/react";
import CreateRecipeFormWrapper from "./create-recipe-form-wrapper";

jest.mock("../forms/create-recipe-form", () => ({
  __esModule: true,
  default: ({
    formFields,
  }: {
    formFields: { name: string; label: string }[];
  }) => (
    <div data-testid="mock-recipe-form">
      {formFields.map((field, index) => (
        <div key={index} data-testid={`form-field-${field.name}`}>
          {field.label}
        </div>
      ))}
    </div>
  ),
}));

describe("CreateRecipeFormWrapper", () => {
  test("should render correctly", () => {
    const { container } = render(<CreateRecipeFormWrapper />);
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("mock-recipe-form")).toBeInTheDocument();
  });

  test("renders all required form fields", () => {
    render(<CreateRecipeFormWrapper />);

    expect(screen.getByTestId("mock-recipe-form")).toBeInTheDocument();

    expect(screen.getByTestId("form-field-title")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-cooking_time")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-prep_time")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-servings")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-cover_image")).toBeInTheDocument();
  });
});
