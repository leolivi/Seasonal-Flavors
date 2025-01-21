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

jest.mock("../ui/bookmark", () => () => <div>BookmarkMock</div>);

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

  test("does not render Bookmark and cooking time when showDetail is false", () => {
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

    expect(screen.queryByText("30 Minuten")).not.toBeInTheDocument();
    expect(screen.queryByText("BookmarkMock")).not.toBeInTheDocument();
  });

  test("renders Bookmark and cooking time when showDetail is true", () => {
    render(
      <Card
        cooking_time={30}
        prep_time={30}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
        showDetail={true}
        showBookmark={true} // Setze showBookmark auf true
      />,
    );

    const bookmarks = screen.getByText("BookmarkMock");
    expect(bookmarks).toBeInTheDocument();
    expect(screen.getByText("30 Minuten")).toBeInTheDocument();
  });
});
