"use client";

import { CardList, LayoutOptions } from "@/components/card-list.tsx/card-list";
import { cardData } from "../../data/carddata";

const CardListWrapper = () => (
  <CardList
    cardData={cardData}
    showDetail={true}
    style={LayoutOptions.GRID}
    onClick={(index) => console.log("Card clicked at index:", index)}
  />
);

export default CardListWrapper;
