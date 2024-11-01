import Card from "../card/card";

interface CardListProps {
  cardData?: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    prepDuration?: number;
    season?: string;
  }[];
  showDetail?: boolean;
  style?: LayoutOptions;
}

export enum LayoutOptions {
  FLEX = "flex pl-4 min-[640px]:p-8",
  GRID = "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3",
}

// Component mapping through several Cards
export const CardList = ({
  showDetail,
  style,
  cardData = [],
}: CardListProps) => {
  return (
    <div className={style}>
      {cardData.map((item) => (
        <Card
          key={item.id}
          imageSrc={item.imageSrc}
          imageAlt={item.imageAlt}
          title={item.title}
          prepDuration={item.prepDuration}
          season={item.season}
          showDetail={showDetail}
        />
      ))}
    </div>
  );
};
