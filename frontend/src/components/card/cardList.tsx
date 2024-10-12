import { Card } from "./card";

interface CardListProps {
  cardData: {
    imageSrc: string;
    imageAlt: string;
    cardContent: string;
  }[];
}

export const CardList = ({ cardData }: CardListProps) => (
  <div className="flex pl-8">
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
