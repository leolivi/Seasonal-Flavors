/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import Card from "@/components/card/card";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
  })),
}));

jest.mock("src/assets/icons/clock.svg", () => () => <div>ClockMock</div>);
jest.mock("src/assets/icons/bookmark.svg", () => () => <div>BookmarkMock</div>);

describe("Card", () => {
  const defaultProps = {
    id: 1,
    imageSrc: "/test-image.jpg",
    imageAlt: "Test Image",
    imageId: 1,
    title: "Test Recipe",
    prepDuration: 30,
  };

  test("renders the image with correct src and alt attributes", () => {
    render(<Card {...defaultProps} />);
    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
  });

  test("displays the title correctly", () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
  });

  test("does not render Bookmark and Clock icons when showDetail is false", () => {
    render(<Card {...defaultProps} showDetail={false} />);

    expect(screen.queryByText("30 Min. aktiv")).not.toBeInTheDocument();
    expect(screen.queryByTestId("bookmark-icon")).not.toBeInTheDocument();
  });

  test("renders Bookmark and Clock icons when showDetail is true", () => {
    render(<Card {...defaultProps} showDetail={true} />);

    const bookmarks = screen.getAllByText("BookmarkMock");
    expect(bookmarks.length).toBeGreaterThan(0);
    expect(screen.getByText("30 Min. aktiv")).toBeInTheDocument();
  });
});
