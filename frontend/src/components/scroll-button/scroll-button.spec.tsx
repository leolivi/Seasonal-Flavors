import { render, screen } from "@testing-library/react";
import ScrollButton from "./scroll-button";
import { act } from "react";

jest.mock("@/utils/Season", () => {
  return {
    Season: jest.fn().mockImplementation(() => ({
      getColor: jest.fn().mockReturnValue("sfgreen"),
    })),
  };
});

describe("ScrollButton Component", () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should not be visible on initial render", () => {
    render(<ScrollButton />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });

  test("should become visible after scrolling down", () => {
    render(<ScrollButton />);

    act(() => {
      window.scrollY = 301;
      window.dispatchEvent(new Event("scroll"));
    });

    const button = screen.getByTestId("scroll-button");
    expect(button).toBeInTheDocument();
  });

  test("should apply the correct seasonal color classes to the SVG", () => {
    render(<ScrollButton />);

    act(() => {
      window.scrollY = 301;
      window.dispatchEvent(new Event("scroll"));
    });

    const svg = screen.getByTestId("scroll-button").querySelector("svg");

    expect(svg).toHaveClass("bg-sfgreen-dark");
    expect(svg).toHaveClass("opacity-80");
  });
});
