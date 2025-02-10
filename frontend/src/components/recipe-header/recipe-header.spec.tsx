/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { RecipeHeader } from "./recipe-header";
import { useSession } from "next-auth/react";

// mock the use router hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// mock the arrow left icon
jest.mock("src/assets/icons/arrow-left.svg", () => {
  const ArrowLeftMock = () => <div>ArrowLeftMock</div>;
  ArrowLeftMock.dataTestId = "arrow-left";
  return ArrowLeftMock;
});

// mock the use session hook
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

// mock the use media query hook
jest.mock("@/hooks/use-media-query");

/*
  @desc Test the recipe header
*/
describe("RecipeHeader Component", () => {
  const mockRouter = { back: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "TestUser" }, expires: "fake-expiry-date" },
      status: "authenticated",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders header with title, username, and save button", () => {
    render(
      <RecipeHeader
        title="Test Recipe"
        username="Testuser"
        recipe={null as any}
      />,
    );

    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText(/Testuser/i)).toBeInTheDocument();
    expect(screen.getByText("speichern")).toBeInTheDocument();
  });

  test("calls router.back() when the ArrowLeft is clicked", () => {
    render(
      <RecipeHeader
        title="Test Recipe"
        username="Testuser"
        recipe={null as any}
      />,
    );

    const backButton = screen.getByRole("button", { name: /go back/i });
    fireEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  test("displays a 'speichern' button with a bookmark icon", () => {
    render(
      <RecipeHeader
        title="Test Recipe"
        username="Testuser"
        recipe={null as any}
      />,
    );

    const saveButton = screen.getByRole("button", { name: /speichern/i });
    expect(saveButton).toBeInTheDocument();
  });
});
