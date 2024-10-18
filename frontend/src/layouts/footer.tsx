import { Season } from "../utils/Season";
// import SeasonalFlavorsLogo from "../assets/logo/seasonal-flavors-wordmark.svg";
import SeasonalFlavorsLogo from "../assets/logo/seasonal-flavors-logo.svg";
import { ReactNode } from "react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";

interface FooterProps {
  color: string;
  children: ReactNode;
}

const Footer = () => {
  const season = new Season();
  const seasonalColor = season.getColor();

  return (
    <FooterContainer color={seasonalColor}>
      <Logo />
      <Data />
      <Copyright />
    </FooterContainer>
  );
};

const FooterContainer = ({ color, children }: FooterProps) => (
  <footer className={`rounded-t-3xl p-10 bg-${color}-light`}>
    <ul className="flex w-full flex-col items-center gap-5">{children}</ul>
  </footer>
);

const Logo = () => (
  <li className="cursor-pointer">
    <Link href="/">
      {/* <SeasonalFlavorsLogo className="h-10 w-40" /> */}
      <SeasonalFlavorsLogo className="h-5 min-[640px]:h-6" />
    </Link>
  </li>
);

const Data = () => (
  <nav>
    <ul className="flex flex-row justify-center gap-8">
      <li>
        <Link href="/datenschutz">
          <Typography variant="small" className="cursor-pointer text-sfblack">
            Datenschutz
          </Typography>
        </Link>
      </li>
      <li>
        <Link href="/impressum">
          <Typography variant="small" className="cursor-pointer text-sfblack">
            Impressum
          </Typography>
        </Link>
      </li>
    </ul>
  </nav>
);

const Copyright = () => (
  <li>
    <Typography variant="small" className="text-sfblack">
      <small>&#169; 2025 All rights reserved</small>
    </Typography>
  </li>
);

export default Footer;
