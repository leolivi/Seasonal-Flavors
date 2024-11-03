// RecipeHeader.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { RecipeHeader } from "./recipe-header";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("src/assets/icons/arrow-left.svg", () => () => (
  <div>ArrowLeftMock</div>
));

describe("RecipeHeader Component", () => {
  const mockRouter = { back: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders header with title, username, and save button", () => {
    render(<RecipeHeader title="Test Recipe" username="Testuser" />);

    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText(/Testuser/i)).toBeInTheDocument();
    expect(screen.getByText("speichern")).toBeInTheDocument();
  });

  test("calls router.back() when the ArrowLeft is clicked", () => {
    const { debug } = render(
      <RecipeHeader title="Test Recipe" username="Testuser" />,
    );

    const backButton = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
    debug();
  });

  test("displays a 'speichern' button with a bookmark icon", () => {
    render(<RecipeHeader title="Test Recipe" username="Testuser" />);

    const saveButton = screen.getByRole("button", { name: /speichern/i });
    expect(saveButton).toBeInTheDocument();
  });
});
