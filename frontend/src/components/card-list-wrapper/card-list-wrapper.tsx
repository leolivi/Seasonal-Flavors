import { CardList, LayoutOptions } from "@/components/card-list.tsx/card-list";

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
}

const CardListWrapper = ({
  cardData,
  showDetail,
  style,
}: CardListWrapperProps) => (
  <CardList cardData={cardData} showDetail={true} style={LayoutOptions.GRID} />
);

export default CardListWrapper;
