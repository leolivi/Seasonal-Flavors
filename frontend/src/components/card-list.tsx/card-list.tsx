import { Card } from "../card/card";

interface CardListProps {
  cardData: {
    imageSrc: string;
    imageAlt: string;
    cardTitle: string;
    prepDuration?: number;
    season?: string;
  }[];
  showDetail?: boolean;
  style?: LayoutOptions;
  onClick?: (index: number) => void;
}

export enum LayoutOptions {
  FLEX = "flex pl-4 min-[640px]:p-8",
  GRID = "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3",
}

// Component mapping through several Cards
export const CardList = ({
  cardData,
  showDetail,
  style,
  onClick,
}: CardListProps) => (
  <div className={style}>
    {cardData.map((item, index) => (
      <Card
        key={index}
        imageSrc={item.imageSrc}
        imageAlt={item.imageAlt}
        cardTitle={item.cardTitle}
        prepDuration={item.prepDuration}
        season={item.season}
        showDetail={showDetail}
        onClick={() => onClick?.(index)}
      />
    ))}
  </div>
);
