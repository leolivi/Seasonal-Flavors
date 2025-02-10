import { render, screen } from "@testing-library/react";
import { Season } from "@/utils/Season";
import useMediaQuery from "@/hooks/use-media-query";
import NavItem, { NavStyle } from "./nav-item";
import { useSession } from "next-auth/react";

// mock the season utils
jest.mock("@/utils/Season");
// mock the use media query hook
jest.mock("@/hooks/use-media-query");
// mock the session status
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({ status: "unauthenticated" })),
}));

// mock the icon
const mockIcon = <svg data-testid="mock-icon" />;
// mock the label
const label = "Test Label";
// mock the href
const href = "/test";

/*
  @desc Test the nav item
*/
describe("NavItem", () => {
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

    const link = screen.getByText(label).closest("a");
    expect(link).toHaveClass(
      `via-${expectedColor}-dark`,
      `to-${expectedColor}-dark`,
      `hover:text-${expectedColor}-dark`,
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
