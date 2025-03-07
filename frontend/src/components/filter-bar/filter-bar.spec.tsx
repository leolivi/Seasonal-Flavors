import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import FilterBar from "./filter-bar";
import { Session } from "next-auth";

// mock the magnifier icon
jest.mock("src/assets/icons/magnifier.svg", () => {
  const MagnifierMock = () => <span>Magnifier</span>;
  MagnifierMock.dataTestId = "search-button";
  return MagnifierMock;
});

// mock the cross icon
jest.mock("src/assets/icons/cross.svg", () => {
  const CrossMock = () => <span>Cross</span>;
  CrossMock.dataTestId = "cross-button";
  return CrossMock;
});

// mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: jest.fn(() => "/"),
}));

/*
  @desc Test the filter bar
*/
describe("FilterBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // mock session
  const mockSession: Session = {
    user: {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      image: "https://example.com/test-user.jpg",
    },
    expires: "2024-12-31T23:59:59.999Z",
    accessToken: "test-token",
  };

  // render with session
  const renderWithSession = (
    ui: React.ReactNode,
    sessionData: Session | null,
  ) => {
    return render(
      <SessionProvider session={sessionData}>{ui}</SessionProvider>,
    );
  };

  test("should render with default title", () => {
    renderWithSession(<FilterBar />, mockSession);
    expect(screen.getByPlaceholderText("suchen")).toBeInTheDocument();
  });

  test("should update input value on change", () => {
    renderWithSession(<FilterBar />, mockSession);
    const input = screen.getByPlaceholderText("suchen");

    fireEvent.change(input, { target: { value: "New Input" } });
    expect(input).toHaveValue("New Input");
  });

  test("should clear input when clear button is clicked", () => {
    renderWithSession(<FilterBar />, mockSession);
    const input = screen.getByPlaceholderText("suchen");

    fireEvent.change(input, { target: { value: "Some Input" } });
    expect(input).toHaveValue("Some Input");

    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });

  test("filter should select a season and updates the URL", async () => {
    renderWithSession(<FilterBar />, mockSession);
    const selectTrigger = screen.getByTestId("season-select-trigger");

    fireEvent.click(selectTrigger);
    const seasonOption = screen.getByText("Sommer");
    fireEvent.click(seasonOption);

    expect(selectTrigger).toHaveTextContent("Sommer");
  });
});
