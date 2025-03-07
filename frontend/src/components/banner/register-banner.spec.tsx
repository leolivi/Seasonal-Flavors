import { render, screen } from "@testing-library/react";
import { RegisterBanner } from "./register-banner";
import { Season } from "@/utils/Season";
import { useRouter } from "next/navigation";

// mock the season
jest.mock("@/utils/Season");
// mock the use media query hook
jest.mock("@/hooks/use-media-query");
// mock the next/navigation hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

/*
  @desc Tests the register banner component
*/
describe("RegisterBanner Component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render", () => {
    render(<RegisterBanner label={"jetzt registrieren"} />);

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

    render(<RegisterBanner label={""} />);

    const bannerElement = screen.getByTestId("register-banner");

    expect(bannerElement.className).toContain(`bg-${mockColor}-dark/80`);
    expect(bannerElement.className).toContain(`border-${mockColor}-dark`);
  });

  test("should call router.push on button click", () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    render(<RegisterBanner label="jetzt registrieren" />);

    const buttonElement = screen.getByText(/jetzt registrieren/i);
    buttonElement.click();

    expect(mockRouterPush).toHaveBeenCalledWith("/session?form=register");
  });
});
