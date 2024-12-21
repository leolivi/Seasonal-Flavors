"use client";
import { CardList } from "@/components/card-list.tsx/card-list";
import { LayoutOptionType } from "@/utils/layout-options";
import { useState } from "react";
import { RegisterBanner } from "../banner/register-banner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CardListWrapperProps {
  cardData: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    imageId: number;
    title: string;
    prepDuration?: number;
    season?: string;
  }[];
  showDetail?: boolean;
  showEdit?: boolean;
  showBookmark?: boolean;
  style?: LayoutOptionType;
}

const CardListWrapper = ({
  cardData,
  showDetail,
  showBookmark,
  showEdit,
  style,
}: CardListWrapperProps) => {
  const { status } = useSession();
  const router = useRouter();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If the user is not authenticated, show the register banner
    if (status === "unauthenticated") {
      setShowRegisterBanner(true);
      // TODO: handle bookmark functionality for authenticated users here
    } else {
      console.log("Bookmark saved!");
    }
  };

  const handleEditClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("ID:", id);
    if (status === "authenticated") {
      router.push(`/recipes/edit/${id}`);
    }
  };

  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
  };

  return (
    <div>
      <CardList
        onBookmarkClick={handleBookmarkClick}
        onEditClick={(e, id) => handleEditClick(e, id)}
        showEdit={showEdit}
        cardData={cardData}
        showDetail={showDetail}
        showBookmark={showBookmark}
        style={style}
      />

      {showRegisterBanner && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2">
          <RegisterBanner
            label="anmelden"
            showCloseBtn={true}
            onClose={handleCloseBanner}
          />
        </div>
      )}
    </div>
  );
};

export default CardListWrapper;
