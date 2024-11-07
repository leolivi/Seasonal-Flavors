"use client";
import { CardList } from "@/components/card-list.tsx/card-list";
import { LayoutOptionType } from "@/utils/layout-options";
import { useState } from "react";
import { RegisterBanner } from "../banner/register-banner";

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
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowRegisterBanner((prev) => !prev);
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
          <RegisterBanner showCloseBtn={true} onClose={handleCloseBanner} />
        </div>
      )}
    </div>
  );
};

export default CardListWrapper;
