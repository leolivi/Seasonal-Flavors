import { getSeasonColor } from "@/utils/SeasonUtils";
import { Typography } from "@/components/ui/typography";
import imprintData from "@/data/imprint.json";
import ScrollButton from "@/components/scroll-button/scroll-button";
import sourcesData from "@/data/sources.json";

/*
  @desc Displays the imprint page
*/
export default function ImprintPage() {
  // retrieve the seasonal color
  const seasonalColor = getSeasonColor();

  // return the imprint page
  return (
    <div className="mb-10 px-4 min-[640px]:px-10">
      {/* heading */}
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1 aria-label="Impressum" tabIndex={0}>
            Impressum
          </h1>
        </Typography>
      </div>
      {/* imprint data */}
      <div className="flex flex-col items-center pt-10 text-center">
        <Typography variant="body" className="font-figtreeRegular">
          <p className="mb-4">{imprintData.company}</p>
          <p className="mb-4">
            <strong>Represented by:</strong> <br />
            {imprintData.representative} <br />
            {imprintData.address.street} <br /> {imprintData.address.postalCode}{" "}
            {imprintData.address.city}
          </p>
          <p className="mb-4">
            <strong>Designed and created by:</strong> <br />
            {imprintData.creator.name} <br />
            {imprintData.creator.email}
          </p>
        </Typography>
      </div>
      {/* sources of project */}
      <div className="pt-10">
        <Typography variant="heading3" className="font-figtreeRegular">
          <h2>Quellen</h2>
        </Typography>
        <Typography variant="small" className="mt-5 font-figtreeRegular">
          <ul>
            {sourcesData.sources.map((source) => (
              <li key={source.id} className="mb-4">
                <strong>{source.type}:</strong> <br />
                {source.author}, {source.year}. {source.title}.{" "}
                {source.platform}.{" "}
                <em>
                  [online] einsehbar unter{" "}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-${seasonalColor}-dark`}
                  >
                    <strong>diesem Link</strong>
                  </a>{" "}
                  [zuletzt abgerufen am {source.lastAccessed}]
                </em>
              </li>
            ))}
          </ul>
        </Typography>
      </div>
      <ScrollButton />
    </div>
  );
}
