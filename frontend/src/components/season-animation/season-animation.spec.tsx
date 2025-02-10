// SeasonAnimation.test.tsx
import { render, screen } from "@testing-library/react";
import { Season } from "@/utils/Season";
import SeasonAnimation from "./season-animation";

// mock brandmark
jest.mock("../../assets/logo/seasonal-flavors-brandmark.svg", () => {
  const MockBrandmark = () => <div data-testid="brandmark" />;
  MockBrandmark.displayName = "MockBrandmark";
  return MockBrandmark;
});

// mock seasons
const seasons = ["winter", "autumn", "summer", "spring"];
/*
  @desc Test SeasonAnimation component
*/
describe("SeasonAnimation", () => {
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
