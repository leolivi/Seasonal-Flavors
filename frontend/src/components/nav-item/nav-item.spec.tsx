// components/NavItem.test.js
import { render, screen } from "@testing-library/react";
import { Season } from "@/utils/Season";
import useMediaQuery from "@/utils/useMediaQuery";
import NavItem, { NavStyle } from "./nav-item";
import { useSession } from "next-auth/react";

jest.mock("@/utils/Season");
jest.mock("@/utils/useMediaQuery");

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ status: "unauthenticated" })),
}));

describe("NavItem", () => {
  const mockIcon = <svg data-testid="mock-icon" />;
  const label = "Test Label";
  const href = "/test";

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ status: "unauthenticated" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render", () => {
    render(
      <NavItem
        icon={mockIcon}
        label={label}
        href={href}
        style={NavStyle.HEADER}
      />,
    );

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  test("should navigate to correct href", () => {
    render(
      <NavItem
        icon={mockIcon}
        label={label}
        href={href}
        style={NavStyle.HEADER}
      />,
    );

    const link = screen.getByText(label).closest("a");
    expect(link).toHaveAttribute("href", href);
  });

  test("should apply correct styles for header based on Season color", () => {
    const expectedColor = "blue";
    (Season as unknown as jest.Mock).mockImplementation(() => {
      return {
        getColor: jest.fn().mockReturnValue(expectedColor),
      };
    });

    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(
      <NavItem
        icon={mockIcon}
        label={label}
        href={href}
        style={NavStyle.HEADER}
      />,
    );

    expect(screen.getByText(label).closest("li")).toHaveClass(
      `hover:bg-${expectedColor}-light`,
    );
  });

  test("should apply correct styles for footer", () => {
    render(
      <NavItem
        icon={mockIcon}
        label={label}
        href={href}
        style={NavStyle.FOOTER}
      />,
    );

    expect(screen.getByText(label).closest("li")).not.toHaveClass(
      "hover:bg-blue-light",
    );
  });
});
