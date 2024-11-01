import { ReactNode } from "react";
import Card from "../card/card";
import Link from "next/link";

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
  children?: ReactNode;
}

export enum LayoutOptions {
  FLEX = "flex pl-4 min-[640px]:p-8 space-x-4 overflow-x-auto",
  GRID = "grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3",
}

// Component mapping through several Cards
export const CardList = ({
  showDetail,
  style,
  cardData = [],
  children,
}: CardListProps) => {
  return (
    <div className={style}>
      {cardData.map((item) => (
        <Link key={item.id} href={`/recipes/${item.id}`}>
          <Card
            key={item.id}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            title={item.title}
            prepDuration={item.prepDuration}
            season={item.season}
            showDetail={showDetail}
          />
        </Link>
      ))}
      {children}
    </div>
  );
};
