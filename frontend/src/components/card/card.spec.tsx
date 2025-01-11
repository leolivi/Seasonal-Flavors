/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import Card from "@/components/card/card";
import fetchMock from "jest-fetch-mock";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
  })),
}));

jest.mock("src/assets/icons/clock.svg", () => () => <div>ClockMock</div>);
jest.mock("src/assets/icons/bookmark.svg", () => () => <div>BookmarkMock</div>);

beforeEach(() => {
  fetchMock.resetMocks();
});

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
    render(
      <Card
        cooking_time={0}
        prep_time={0}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
      />,
    );
    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
  });

  test("displays the title correctly", () => {
    render(
      <Card
        cooking_time={0}
        prep_time={0}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
      />,
    );
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
  });

  test("does not render Bookmark and Clock icons when showDetail is false", () => {
    render(
      <Card
        cooking_time={0}
        prep_time={0}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
        showDetail={false}
      />,
    );

    expect(screen.queryByText("30 Min. aktiv")).not.toBeInTheDocument();
    expect(screen.queryByTestId("bookmark-icon")).not.toBeInTheDocument();
  });

  test("renders Bookmark and Clock icons when showDetail is true", () => {
    render(
      <Card
        cooking_time={0}
        prep_time={0}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
        showDetail={true}
      />,
    );

    const bookmarks = screen.getAllByText("BookmarkMock");
    expect(bookmarks.length).toBeGreaterThan(0);
    expect(screen.getByText("0 Min. aktiv")).toBeInTheDocument();
  });
});
