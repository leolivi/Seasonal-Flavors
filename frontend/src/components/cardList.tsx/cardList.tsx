import { Card } from "../card/card";

interface CardListProps {
  cardData: {
    imageSrc: string;
    imageAlt: string;
    cardContent: string;
  }[];
}

// Component mapping through several Cards
export const CardList = ({ cardData }: CardListProps) => (
  <div className="flex pl-4 min-[640px]:p-8">
    {cardData.map((item, index) => (
      <Card
        key={index}
        imageSrc={item.imageSrc}
        imageAlt={item.imageAlt}
        cardContent={item.cardContent}
      />
    ))}
  </div>
);
