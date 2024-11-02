import Image from "next/image";
import { Typography } from "../ui/typography";
import Clock from "../../assets/icons/clock.svg";
import Bookmark from "../../assets/icons/bookmark.svg";
import Heart from "../ui/heart";
import { Season } from "@/utils/Season";

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  prepDuration?: number;
  showDetail?: boolean;
  season?: string;
}

export default function Card({
  imageSrc,
  imageAlt,
  title,
  prepDuration,
  showDetail = false,
  season,
}: CardProps) {
  const seasonColors = season
    ? season.split(",").map((s) => new Season().getColor(s.trim()))
    : [];

  return (
    <div
      className={
        showDetail
          ? "mx-0 my-4 cursor-pointer rounded-lg bg-sfwhite-light p-3 drop-shadow-lg min-[640px]:mx-2"
          : "cursor-pointer!important mx-2 my-4 min-h-[21rem] w-80 rounded-lg bg-sfwhite-light p-3 drop-shadow-lg first:ml-0 min-[640px]:min-h-[26rem]"
      }
    >
      {/* "" */}
      {/* Set a fixed width here */}
      <div className="min-[640px]:min-w-70 min-[1024px]:min-w-90 relative aspect-square min-w-56">
        {showDetail && (
          <Bookmark className="absolute right-4 top-4 h-12 w-auto" />
        )}
        <Image
          className="pointer-events-none h-full w-full rounded-lg object-cover"
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={300}
        />
      </div>
      <div className="py-3 min-[640px]:min-h-20">
        <Typography
          variant={showDetail ? "heading3" : "body"}
          className="text-wrap font-cordaMedium text-2xl font-semibold text-sfblack"
        >
          {title}
        </Typography>
      </div>
      {showDetail && (
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2">
            <Clock />
            <p className="text-sfblack">{prepDuration} Min. aktiv</p>
          </div>
          <div className="flex gap-1">
            {seasonColors.map((color, index) => (
              <Heart key={index} color={color} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
