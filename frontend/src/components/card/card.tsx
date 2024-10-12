import Image from "next/image";
import { Typography } from "../ui/typography";

interface CardProps {
  cardContent: string;
  imageSrc: string;
  imageAlt: string;
}

export const Card = ({ cardContent, imageSrc, imageAlt }: CardProps) => {
  return (
    <div className="mx-2 my-4 w-auto rounded-lg bg-sfwhite-light p-3 drop-shadow-lg first:ml-0">
      <div className="aspect-square w-56 min-[640px]:w-72 min-[1024px]:w-96">
        <Image
          className="pointer-events-none h-full w-full rounded-lg object-cover"
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={300}
        />
      </div>
      <div className="py-3">
        <Typography variant="heading3">
          <p className="text-wrap font-cordaMedium text-2xl font-semibold text-sfblack">
            {cardContent}
          </p>
        </Typography>
      </div>
    </div>
  );
};
