import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import FilterBar from "./filter-bar";
import { dataFetch, dataFetchWithToken } from "@/lib/data-fetch";
import { Session } from "next-auth";

// Mock dependencies
jest.mock("src/assets/icons/magnifier.svg", () => () => (
  <span>MagnifierMock</span>
));
jest.mock("src/assets/icons/bookmark.svg", () => () => (
  <span>BookmarkMock</span>
));

// Mock API calls
jest.mock("@/lib/data-fetch", () => ({
  dataFetchWithToken: jest.fn(),
  dataFetch: jest.fn(),
}));

const mockOnShowFavorites = jest.fn();
const mockOnHideFavorites = jest.fn();

describe("FilterBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSession: Session = {
    user: {
      name: "Test User",
      email: "test@example.com",
      image: "https://example.com/test-user.jpg",
    },
    expires: "2024-12-31T23:59:59.999Z",
    accessToken: "test-token",
  };

  const renderWithSession = (
    ui: React.ReactNode,
    sessionData: Session | null,
  ) => {
    return render(
      <SessionProvider session={sessionData}>{ui}</SessionProvider>,
    );
  };

  test("renders with default title", () => {
    renderWithSession(
      <FilterBar
        title="Default Title"
        onShowFavorites={mockOnShowFavorites}
        onHideFavorites={mockOnHideFavorites}
      />,
      mockSession,
    );
    expect(screen.getByPlaceholderText("suchen")).toBeInTheDocument();
    expect(screen.getByText("Favoriten")).toBeInTheDocument();
  });

  test("updates input value on change", () => {
    renderWithSession(
      <FilterBar
        onShowFavorites={mockOnShowFavorites}
        onHideFavorites={mockOnHideFavorites}
      />,
      mockSession,
    );
    const input = screen.getByPlaceholderText("suchen");

    fireEvent.change(input, { target: { value: "New Input" } });
    expect(input).toHaveValue("New Input");
  });

  test("clears input when clear button is clicked", () => {
    renderWithSession(
      <FilterBar
        onShowFavorites={mockOnShowFavorites}
        onHideFavorites={mockOnHideFavorites}
      />,
      mockSession,
    );
    const input = screen.getByPlaceholderText("suchen");

    fireEvent.change(input, { target: { value: "Some Input" } });
    expect(input).toHaveValue("Some Input");

    const clearButton = screen.getByText("✕");

    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });

  test("calls onShowFavorites when favorites button is clicked (activate favorites)", async () => {
    (dataFetchWithToken as jest.Mock)
      .mockResolvedValueOnce({ id: 1 })
      .mockResolvedValueOnce([{ id: 1, title: "Recipe 1" }]);
    (dataFetch as jest.Mock).mockResolvedValue([]);

    renderWithSession(
      <FilterBar
        onShowFavorites={mockOnShowFavorites}
        onHideFavorites={mockOnHideFavorites}
      />,
      mockSession,
    );

    const favoritesButton = screen.getByText("Favoriten");
    await act(async () => {
      fireEvent.click(favoritesButton);
    });

    expect(mockOnShowFavorites).toHaveBeenCalled();
    expect(mockOnHideFavorites).not.toHaveBeenCalled();
  });

  test("calls onHideFavorites when favorites button is clicked again (deactivate favorites)", async () => {
    (dataFetchWithToken as jest.Mock)
      .mockResolvedValueOnce({ id: 1 })
      .mockResolvedValueOnce([{ id: 1, title: "Recipe 1" }]);
    (dataFetch as jest.Mock).mockResolvedValue([]);

    renderWithSession(
      <FilterBar
        onShowFavorites={mockOnShowFavorites}
        onHideFavorites={mockOnHideFavorites}
      />,
      mockSession,
    );

    const favoritesButton = screen.getByText("Favoriten");

    // Simulate first click to activate favorites
    await act(async () => {
      fireEvent.click(favoritesButton);
    });
    expect(mockOnShowFavorites).toHaveBeenCalledTimes(1);

    // Simulate second click to deactivate favorites
    await act(async () => {
      fireEvent.click(favoritesButton);
    });
    expect(mockOnHideFavorites).toHaveBeenCalledTimes(1);
  });

  test("disables favorites functionality when session is missing", async () => {
    renderWithSession(
      <FilterBar
        onShowFavorites={mockOnShowFavorites}
        onHideFavorites={mockOnHideFavorites}
      />,
      null,
    );

    const favoritesButton = screen.getByText("Favoriten");

    // Simulate a click without a session
    fireEvent.click(favoritesButton);

    // Ensure no callbacks are invoked
    expect(mockOnShowFavorites).not.toHaveBeenCalled();
    expect(mockOnHideFavorites).not.toHaveBeenCalled();
  });
});
