import { Season } from "../utils/Season";
import SeasonalFlavorsLogo from "../assets/logo/seasonal-flavors-wordmark.svg";
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
      <Copyright />
    </FooterContainer>
  );
};

const FooterContainer = ({ color, children }: FooterProps) => (
  <nav className={`rounded-t-3xl p-10 bg-${color}-light`}>
    <ul className="flex w-full flex-col items-center gap-5">{children}</ul>
  </nav>
);

const Logo = () => (
  <li className="cursor-pointer">
    <Link href="/">
      <SeasonalFlavorsLogo className="h-10 w-40" />
    </Link>
  </li>
);

const Copyright = () => (
  <li>
    <Typography variant="small" className="text-sfblack">
      <small>&#169; 2025 All rights reserved</small>
    </Typography>
  </li>
);

export default Footer;
