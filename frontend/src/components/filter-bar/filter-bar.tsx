"use client";

import React, { useState, useEffect } from "react";
import Magnifier from "src/assets/icons/magnifier.svg";
import Cross from "@/assets/icons/cross.svg";
import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";
import CardListWrapper from "../card-list.tsx/card-list-wrapper";
import { RegisterBanner } from "../banner/register-banner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

interface FilterBarProps {
  title?: string;
}

const FilterBar = ({ title = "" }: FilterBarProps) => {
  const [inputValue, setInputValue] = useState(title);
  const seasonalColor = getSeasonColor();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const titleFromQuery = searchParams.get("title");
    if (titleFromQuery) {
      setInputValue(titleFromQuery);
    }
  }, []);

  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
  };

  return (
    <CardListWrapper className="mb-4 flex justify-between gap-2 max-[640px]:mt-8 min-[640px]:pl-6 min-[640px]:pr-7">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Wähle eine Saison" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Saisons</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <form
        action="/recipes"
        method="get"
        className={`flex items-center rounded-md border-2 border-${seasonalColor}-dark bg-${seasonalColor}-light px-2 py-1 hover:bg-white active:bg-white`}
      >
        <Typography variant="body">
          <input
            type="text"
            name="title"
            placeholder="suchen"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent text-sfblack outline-none focus:border-none active:border-none max-[540px]:w-[10rem] max-[480px]:w-[5rem]"
          />
        </Typography>
        {inputValue && setInputValue ? (
          <button
            type="button"
            data-testid="clear-button"
            onClick={() => {
              setInputValue("");
            }}
            className="ml-2 text-sfblack"
          >
            <Cross className="m-2 w-6 cursor-pointer stroke-sfblack stroke-2" />
          </button>
        ) : (
          <button type="submit" className="ml-2">
            <Magnifier />
          </button>
        )}
      </form>
      {showRegisterBanner && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2">
          <RegisterBanner
            content={
              <>
                erstelle deine eigene
                <br />
                Rezeptesammlung!
              </>
            }
            label="anmelden"
            showCloseBtn={true}
            onClose={handleCloseBanner}
          />
        </div>
      )}
    </CardListWrapper>
  );
};

export default FilterBar;
