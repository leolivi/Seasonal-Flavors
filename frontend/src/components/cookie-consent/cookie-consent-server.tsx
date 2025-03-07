import { getSeasonColor } from "@/utils/SeasonUtils";
import { Typography } from "../ui/typography";
import AcceptButton from "./accept-button";

/*
  @desc Cookie consent server component
*/
export default function CookieConsentServer() {
  // get the seasonal color
  const seasonalColor = getSeasonColor();

  return (
    <div
      className={`gap-2 border-2 border-${seasonalColor}-dark fixed bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center rounded-t-lg bg-${seasonalColor}-light z-30 w-full p-2 max-[640px]:text-center min-[640px]:flex-row`}
    >
      <Typography variant="small">
        <p className="font-figtreeRegular">
          Wir verwenden Cookies, um deine Nutzung unserer Website zu verbessern.
          <a
            href={"/data-protection"}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
          >
            Mehr erfahren.
          </a>
        </p>
      </Typography>
      <AcceptButton />
    </div>
  );
}
