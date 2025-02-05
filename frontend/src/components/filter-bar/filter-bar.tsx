"use client";

import React, { useState, useEffect } from "react";
import { Typography } from "../ui/typography";
import { getCurrentSeason, getSeasonColor } from "@/utils/SeasonUtils";
import CardListWrapper from "../card-list.tsx/card-list-wrapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@radix-ui/react-select";
import { FaChevronDown } from "react-icons/fa";
import Heart from "../ui/heart";
import { useRouter, useSearchParams } from "next/navigation";
import { SlMagnifier } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

const seasons = [
  { label: "Frühling", value: "spring", color: "sfgreen" },
  { label: "Sommer", value: "summer", color: "sforange" },
  { label: "Herbst", value: "autumn", color: "sfred" },
  { label: "Winter", value: "winter", color: "sfblue" },
  { label: "ganzjährig", value: "all_year", color: "sfblack" },
];

const FilterBar = () => {
  const seasonalColor = getSeasonColor();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSeason = getCurrentSeason();
  const [inputValue, setInputValue] = useState(searchParams.get("title") || "");
  const [selectedSeason, setSelectedSeason] = useState(
    searchParams.get("season") || currentSeason,
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (inputValue) params.set("title", inputValue);
    if (selectedSeason) params.set("season", selectedSeason);

    router.push(`/recipes?${params.toString()}`);
  }, [inputValue, selectedSeason, router]);

  return (
    <CardListWrapper className="mb-4 flex cursor-pointer justify-between gap-2 max-[640px]:mt-8 min-[640px]:pl-6 min-[640px]:pr-4">
      {/* Saison-Filter */}
      <Select
        value={selectedSeason}
        onValueChange={setSelectedSeason}
        defaultValue="ganzjährig"
        aria-label="Saison-Filter"
      >
        <SelectTrigger
          className={`relative w-40 border-b-2 min-[1280px]:w-48 border-${seasonalColor}-dark inline-flex items-center justify-between gap-2 rounded-t-md border-x-0 px-2 min-[1024px]:gap-4 data-[state=open]:bg-${seasonalColor}-light focus:outline-none hover:bg-${seasonalColor}-light rounded-t-md`}
          data-testid="season-select-trigger"
        >
          <Typography
            variant="body"
            className="flex items-center justify-center gap-1 font-figtreeRegular min-[1024px]:gap-3"
          >
            {selectedSeason ? (
              <>
                <Heart
                  width={25}
                  height={25}
                  color={
                    seasons.find((s) => s.value === selectedSeason)?.color ||
                    "sfblack"
                  }
                  aria-hidden="true"
                />
                <span>
                  {seasons.find((s) => s.value === selectedSeason)?.label ||
                    "Wähle eine Saison"}
                </span>
              </>
            ) : (
              "Wähle eine Saison"
            )}
          </Typography>
          <FaChevronDown size={12} aria-hidden="true" />
        </SelectTrigger>
        <SelectContent
          className={`absolute left-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-md min-[1280px]:w-48 bg-${seasonalColor} bg-white p-1 shadow-lg`}
          position="popper"
        >
          <SelectGroup className="flex flex-col gap-1">
            {seasons.map((season) => (
              <SelectItem
                key={season.value}
                value={season.value}
                className={`cursor-pointer font-figtreeRegular hover:bg-${seasonalColor}-light rounded px-2 py-1.5 outline-none data-[highlighted]:bg-${seasonalColor}-light flex items-center gap-2 data-[highlighted]:text-sfblack`}
                aria-label={season.label}
              >
                <Heart width={20} height={20} color={season.color} />
                {season.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Suchfeld */}
      <form
        action="/recipes"
        method="get"
        className={`flex items-center rounded-md border-2 border-${seasonalColor}-dark bg-${seasonalColor}-light px-2 py-1 hover:bg-white active:bg-white`}
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Suchfeld"
      >
        <label htmlFor="season-select" className="sr-only">
          Wähle eine Jahreszeit
        </label>
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
            data-testid="clear-button"
            onClick={(e) => {
              e.preventDefault();
              setInputValue("");
            }}
            className="ml-2 text-sfblack"
          >
            <RxCross2
              size={20}
              className="cursor-pointer"
              data-testid="cross-button"
              aria-label="Suche löschen"
            />
          </button>
        ) : (
          <button type="submit" className="ml-2">
            <SlMagnifier
              size={20}
              className="stroke-sfblack stroke-2"
              data-testid="search-button"
              aria-label="Suche"
            />
          </button>
        )}
      </form>
    </CardListWrapper>
  );
};

export default FilterBar;
