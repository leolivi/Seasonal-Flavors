import { CardList, LayoutOptions } from "@/components/card-list.tsx/card-list";
import { ReactNode } from "react";

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
  style?: LayoutOptions;
  children?: ReactNode;
}

const CardListWrapper = ({
  cardData,
  showDetail,
  style,
  children,
}: CardListWrapperProps) => (
  <CardList cardData={cardData} showDetail={showDetail} style={style}>
    {children}9{" "}
  </CardList>
);

export default CardListWrapper;
