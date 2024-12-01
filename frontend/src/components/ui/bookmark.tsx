import BookmarkIcon from "../../assets/icons/bookmark.svg";

interface BookmarkButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export default function BookmarkButton({ onClick }: BookmarkButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="absolute right-4 top-4"
        aria-label="Bookmark"
      >
        <BookmarkIcon className="h-10 w-auto" />
      </button>
    </>
  );
}
