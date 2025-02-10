import { render } from "@testing-library/react";
import { InspirationText } from "./inspiration-text";
import * as SeasonUtils from "@/utils/SeasonUtils";

// mock the season utils
jest.mock("@/utils/SeasonUtils", () => ({
  getSeasonColor: jest.fn(() => "sfgreen"),
  translateSeason: jest.fn(() => "Frühling"),
}));

/*
  @desc Test the inspiration text
*/
describe("InspirationText", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the component with correct text and styling", () => {
    const { getByText, container } = render(
      <InspirationText seasonName="spring" />,
    );

    expect(getByText("Inspirationen für den Frühling")).toBeInTheDocument();

    const textElement = container.querySelector(".seasontext");
    expect(textElement).toHaveClass("font-figtreeMedium");
    expect(textElement).toHaveClass("text-sfgreen-dark");
  });

  test("should call the SeasonUtils functions with correct parameters", () => {
    render(<InspirationText seasonName="spring" />);

    expect(SeasonUtils.getSeasonColor).toHaveBeenCalled();
    expect(SeasonUtils.translateSeason).toHaveBeenCalledWith("spring");
  });
});
