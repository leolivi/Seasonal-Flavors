/* eslint-disable react/display-name */
import { render, screen } from "@testing-library/react";
import Card from "@/components/card/card";
import fetchMock from "jest-fetch-mock";

// mock the next/navigation hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
  })),
}));

// mock the bookmark component
jest.mock("@/components/ui/bookmark.tsx", () => () => (
  <div data-testid="bookmark">BookmarkMock</div>
));

/*
  @desc Tests the card component
*/
describe("Card", () => {
  const defaultProps = {
    id: 1,
    imageSrc: "/test-image.jpg",
    imageAlt: "Test Image",
    imageId: 1,
    title: "Test Recipe",
    prep_time: 30,
    season: "summer,winter", // Beispiel für die Saison
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("renders the image with correct src and alt attributes", () => {
    render(
      <Card
        deleteRecipe={jest.fn()}
        cooking_time={0}
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
        deleteRecipe={jest.fn()}
        cooking_time={0}
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
        deleteRecipe={jest.fn()}
        cooking_time={0}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
        showDetail={false}
      />,
    );

    expect(screen.queryByText("30 Minuten")).not.toBeInTheDocument();
    expect(screen.queryByTestId("bookmark")).not.toBeInTheDocument();
  });

  test("renders Bookmark and cooking time when showDetail is true", async () => {
    const onBookmarkClick = jest.fn();
    render(
      <Card
        deleteRecipe={jest.fn()}
        cooking_time={30}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
        showDetail={true}
        showBookmark={true}
        onBookmarkClick={onBookmarkClick}
      />,
    );

    expect(screen.queryByText("30 Minuten")).toBeInTheDocument();
    expect(screen.queryByTestId("bookmark")).toBeInTheDocument();
  });

  test("renders edit button when showEdit is true", () => {
    const onEditClick = jest.fn();
    render(
      <Card
        deleteRecipe={jest.fn()}
        cooking_time={0}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
        showEdit={true}
        onEditClick={onEditClick}
      />,
    );

    const editButton = screen.getByText("bearbeiten");
    expect(editButton).toBeInTheDocument();
    editButton.click();
    expect(onEditClick).toHaveBeenCalled();
  });

  test("calls deleteRecipe when delete button is clicked", () => {
    const deleteRecipeMock = jest.fn();
    render(
      <Card
        deleteRecipe={deleteRecipeMock}
        cooking_time={0}
        servings={0}
        steps={""}
        ingredients={""}
        user_id={""}
        {...defaultProps}
        showEdit={true}
      />,
    );

    const deleteButton = screen.getByText("löschen");
    deleteButton.click();
  });
});
