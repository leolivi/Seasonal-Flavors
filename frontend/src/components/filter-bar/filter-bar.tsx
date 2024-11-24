"use client";
import React, { useState, useEffect } from "react";
import Magnifier from "src/assets/icons/magnifier.svg";
import Bookmark from "src/assets/icons/bookmark.svg";
import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";

interface FilterBarProps {
  title?: string;
}

const FilterBar = ({ title = "" }: FilterBarProps) => {
  const [inputValue, setInputValue] = useState(title);

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const seasonalColor = getSeasonColor();

  const clearInput = () => setInputValue("");

  return (
    <div className="mb-4 flex justify-between gap-2 max-[640px]:mt-8 min-[640px]:pl-6 min-[640px]:pr-7">
      {/* TODO: Implement Favortie function */}
      {/* TODO: Convert to Button Component? */}
      <button
        onClick={() => {}}
        className={`border-${seasonalColor}-dark flex items-center gap-4 border-b-2 px-8 text-lg font-medium text-sfblack max-[540px]:px-4`}
      >
        <Bookmark className="h-8 w-auto" />
        <Typography variant="body">Favoriten</Typography>
      </button>
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
        {inputValue ? (
          <button
            type="button"
            onClick={clearInput}
            className="ml-2 text-sfblack"
          >
            &#x2715;
          </button>
        ) : (
          <button type="submit" className="ml-2">
            <Magnifier />
          </button>
        )}
      </form>
    </div>
  );
};

export default FilterBar;
