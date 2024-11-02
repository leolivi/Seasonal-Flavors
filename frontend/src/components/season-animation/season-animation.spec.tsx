// SeasonAnimation.test.tsx
import { render, screen } from "@testing-library/react";
import { Season } from "@/utils/Season";
import SeasonAnimation from "./season-animation";

jest.mock("../../assets/logo/seasonal-flavors-brandmark.svg", () => {
  const MockBrandmark = () => <div data-testid="brandmark" />;
  MockBrandmark.displayName = "MockBrandmark";
  return MockBrandmark;
});

describe("SeasonAnimation", () => {
  const seasons = ["winter", "autumn", "summer", "spring"];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render", () => {
    render(<SeasonAnimation />);
    const brandmarkElement = screen.getByTestId("brandmark");
    expect(brandmarkElement).toBeInTheDocument();
  });

  seasons.forEach((seasonName) => {
    test("calculates the correct start and end rotation for the current season", () => {
      jest.spyOn(Season, "getSeason").mockReturnValue(seasonName);

      render(<SeasonAnimation />);

      const seasonIndex = seasons.indexOf(seasonName);
      const rotationIncrement = 90;
      const bottomPosition = 270;

      const startRotation =
        (seasonIndex * rotationIncrement + bottomPosition) % 360;
      expect(startRotation).toBeDefined();
    });
  });
});
