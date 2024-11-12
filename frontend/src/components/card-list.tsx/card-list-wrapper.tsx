"use client";
import { CardList } from "@/components/card-list.tsx/card-list";
import { LayoutOptionType } from "@/utils/layout-options";
import { useState } from "react";
import { RegisterBanner } from "../banner/register-banner";
import { useSession } from "next-auth/react";

interface CardListWrapperProps {
  cardData: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    prepDuration?: number;
    season?: string;
  }[];
  showDetail?: boolean;
  style?: LayoutOptionType;
}

const CardListWrapper = ({
  cardData,
  showDetail,
  style,
}: CardListWrapperProps) => {
  const { data: session, status } = useSession();
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

  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
  };

  return (
    <div>
      <CardList
        onBookmarkClick={handleBookmarkClick}
        cardData={cardData}
        showDetail={showDetail}
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
