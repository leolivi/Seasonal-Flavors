"use client";
import React, { useState, useEffect } from "react";
import Magnifier from "src/assets/icons/magnifier.svg";
import Bookmark from "src/assets/icons/bookmark.svg";
import { Typography } from "../ui/typography";
import { Season } from "@/utils/Season";

interface FilterBarProps {
  title?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ title = "" }) => {
  const [inputValue, setInputValue] = useState(title);

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const season = new Season();
  const seasonalColor = season.getColor();

  return (
    <div className="mb-4 flex justify-between gap-2 pl-4 pr-8 max-[640px]:mt-8">
      <button
        onClick={() => {}}
        className={`border-${seasonalColor}-dark flex items-center gap-4 border-b-2 px-8 text-lg font-medium text-sfblack`}
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
            className="bg-transparent text-sfblack outline-none focus:border-none active:border-none"
          />
        </Typography>
        <button type="submit">
          <Magnifier />
        </button>
      </form>
    </div>
  );
};

export default FilterBar;
