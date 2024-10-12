"use client";
import SeasonalFlavorsBrandmark from "../../assets/logo/seasonal-flavors-brandmark.svg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Season } from "@/utils/Season";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

interface RotationConfig {
  spring: { start: number; end: number };
  summer: { start: number; end: number };
  autumn: { start: number; end: number };
  winter: { start: number; end: number };
}

export default function SeasonAnimation() {
  const container = useRef<HTMLDivElement>(null);

  const season = new Season();
  const seasonName = season.getSeason();

  // TODO: change to no hardcoded rotation
  const rotationConfig: RotationConfig = {
    spring: { start: 180, end: 270 },
    summer: { start: 90, end: 180 },
    autumn: { start: 0, end: 90 },
    winter: { start: 270, end: 360 },
  };

  // to test the function
  // const hardcodedSeason = "Herbst";

  const { start, end } = rotationConfig[seasonName as keyof RotationConfig] || {
    start: 0,
    end: 180,
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".brandmark",
        { x: -200, rotate: start },
        {
          x: 0,
          rotate: end,
          duration: 4,
          scrollTrigger: {
            trigger: ".brandmark",
            start: "top 80%",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="mt-20 flex items-center justify-center">
      <SeasonalFlavorsBrandmark className="brandmark h-auto w-full min-[640px]:w-2/5" />
    </div>
  );
}
