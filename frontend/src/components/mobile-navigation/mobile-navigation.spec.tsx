import { render, screen, fireEvent } from "@testing-library/react";
import MobileNavigation from "./mobile-navigation";
import { Season } from "../../utils/Season";

// mock the cross icon
jest.mock("../../assets/icons/cross.svg", () => {
  const CrossIconMock = ({ onClick }: { onClick: () => void }) => (
    <svg data-testid="cross-icon" onClick={onClick} />
  );
  CrossIconMock.displayName = "CrossIconMock";
  return CrossIconMock;
});

// mock the season utils
jest.mock("../../utils/Season");

// mock the nav list
jest.mock("../nav-list/nav-list", () => {
  return jest.fn(
    ({
      items,
    }: {
      items: { icon: React.ReactNode; label: string; href: string }[];
    }) => (
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    ),
  );
});

// mock the navigation items
const navigationItems = [
  { icon: <svg data-testid="mock-icon" />, label: "Home", href: "/" },
  { icon: <svg data-testid="mock-icon" />, label: "About", href: "/about" },
];

/*
  @desc Test the mobile navigation
*/
describe("MobileNavigation", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    (Season as unknown as jest.Mock).mockImplementation(() => {
      return {
        getColor: jest.fn().mockReturnValue("blue"),
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render when isOpen is true", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        navigationItems={navigationItems}
      />,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByTestId("cross-icon")).toBeInTheDocument();
  });

  test("should apply correct styles based on season color", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        navigationItems={navigationItems}
      />,
    );

    expect(screen.getByTestId("cross-icon").closest("div")).toHaveClass(
      "bg-blue-light",
    );
  });

  test("calls onClose when Cross icon is clicked", () => {
    render(
      <MobileNavigation
        isOpen={true}
        onClose={mockOnClose}
        navigationItems={navigationItems}
      />,
    );

    fireEvent.click(screen.getByTestId("cross-icon"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("does not render when isOpen is false", () => {
    const { container } = render(
      <MobileNavigation
        isOpen={false}
        onClose={mockOnClose}
        navigationItems={navigationItems}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
