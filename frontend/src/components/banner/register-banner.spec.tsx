import { render, screen } from "@testing-library/react";
import { RegisterBanner } from "./register-banner";
import { Season } from "@/utils/Season";
import { useRouter } from "next/navigation";

jest.mock("@/utils/Season");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RegisterBanner Component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render", () => {
    render(<RegisterBanner />);

    const bannerElement = screen.getByTestId("register-banner");
    const buttonElement = screen.getByText(/jetzt registrieren/i);
    expect(bannerElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("should apply the correct seasonal color classes", () => {
    const mockColor = "sfgreen";

    (Season as unknown as jest.Mock).mockImplementation(() => ({
      getColor: jest.fn().mockReturnValue(mockColor),
    }));

    render(<RegisterBanner />);

    const bannerElement = screen.getByTestId("register-banner");

    expect(bannerElement.className).toContain(`bg-${mockColor}-dark/80`);
    expect(bannerElement.className).toContain(`border-${mockColor}-dark`);
  });

  test("should call router.push on button click", () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    render(<RegisterBanner />);

    const buttonElement = screen.getByText(/jetzt registrieren/i);
    buttonElement.click();

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });
});
