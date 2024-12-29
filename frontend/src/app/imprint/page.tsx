import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import imprintData from "@/data/imprint.json";
import sourcesData from "@/data/sources.json";
import { getSeasonColor } from "@/utils/SeasonUtils";

export default function ImprintPage() {
  const seasonalColor = getSeasonColor();
  return (
    <div className="px-4 min-[640px]:px-10">
      <ScrollButton />
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>Impressum</h1>
        </Typography>
      </div>
      <div className="flex flex-col items-center pt-10 text-center">
        <Typography variant="body" className="font-figtreeRegular">
          <p className="mb-4">{imprintData.company}</p>
          <p className="mb-4">
            <strong>Represented by:</strong> <br />
            {imprintData.representative} <br />
            {imprintData.address.street} <br /> {imprintData.address.postalCode}
            {imprintData.address.city}
          </p>
          <p className="mb-4">
            <strong>Designed and created by:</strong> <br />
            {imprintData.creator.name} <br />
            {imprintData.creator.email}
          </p>
        </Typography>
      </div>
      <div className="pt-10">
        <Typography variant="heading3" className="font-figtreeRegular">
          <h2>Quellen</h2>
        </Typography>
        {/* TODO: Add sources */}
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
    </div>
  );
}
