import { render, screen, fireEvent } from "@testing-library/react";
import { SeasonCheckbox } from "./season-checkbox";
import { useForm, FormProvider } from "react-hook-form";
import { CreateRecipeSchema } from "@/validation/createRecipeSchema";

// mock tags
const mockTags = [
  { id: 1, name: "Frühling" },
  { id: 2, name: "Sommer" },
  { id: 3, name: "Herbst" },
  { id: 4, name: "Winter" },
];

// test wrapper
const TestWrapper = () => {
  const methods = useForm<CreateRecipeSchema>({
    defaultValues: {
      tags: [],
    },
  });

  return (
    <FormProvider {...methods}>
      <SeasonCheckbox control={methods.control} tags={mockTags} name="tags" />
    </FormProvider>
  );
};

/*
  @desc Test SeasonCheckbox component
*/
describe("SeasonCheckbox", () => {
  test("should render all seasons correctly", () => {
    render(<TestWrapper />);

    mockTags.forEach((season) => {
      expect(screen.getByText(season.name)).toBeInTheDocument();
    });
  });

  test("should show the correct label text", () => {
    render(<TestWrapper />);

    expect(screen.getByText("Saison")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Wähle die Jahreszeiten aus, in denen die Zutaten des Rezeptes in Saison sind.",
      ),
    ).toBeInTheDocument();
  });

  test("should allow selecting and deselecting checkboxes", () => {
    render(<TestWrapper />);

    const firstCheckbox = screen.getByRole("checkbox", {
      name: new RegExp(mockTags[0].name, "i"),
    });

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
  });

  test("should render the correct number of checkboxes", () => {
    render(<TestWrapper />);

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(mockTags.length);
  });
});
