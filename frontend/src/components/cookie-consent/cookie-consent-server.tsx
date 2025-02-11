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
      className={`gap-2 border-2 border-${seasonalColor}-dark fixed bottom-0 right-0 flex flex-col items-center justify-center rounded-lg bg-${seasonalColor}-light z-30 max-w-full p-4 min-[640px]:flex-row`}
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
