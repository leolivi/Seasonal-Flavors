import { render, screen } from "@testing-library/react";
import CreateRecipeForm from "./create-recipe-form";

jest.mock("../create-recipe-form-wrapper/create-recipe-form-wrapper", () => ({
  __esModule: true,
  default: ({
    formFields,
  }: {
    formFields: { name: string; label: string }[];
  }) => (
    <div data-testid="mock-form-wrapper">
      {formFields.map((field, index) => (
        <div key={index} data-testid={`form-field-${field.name}`}>
          {field.label}
        </div>
      ))}
    </div>
  ),
}));

describe("CreateRecipeForm", () => {
  test("should render correctly", async () => {
    const { container } = render(await CreateRecipeForm());
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("mock-form-wrapper")).toBeInTheDocument();
  });

  test("renders all required form fields", async () => {
    render(await CreateRecipeForm());

    expect(screen.getByTestId("mock-form-wrapper")).toBeInTheDocument();

    expect(screen.getByTestId("form-field-title")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-cooking_time")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-prep_time")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-servings")).toBeInTheDocument();
    expect(screen.getByTestId("form-field-cover_image")).toBeInTheDocument();
  });
});
