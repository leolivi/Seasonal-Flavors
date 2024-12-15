"use client";
import { ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import NavList from "@/components/nav-list/nav-list";
import Logo from "@/components/ui/logo";
import { NavStyle } from "@/components/nav-item/nav-item";
import { getSeasonColor } from "@/utils/SeasonUtils";
import useMediaQuery from "@/hooks/useMediaQuery";

const FooterContainer = ({ color, children }: FooterProps) => (
  <footer
    className={`w-full rounded-t-3xl p-10 bg-${color}-light mt-auto list-none`}
  >
    {children}
  </footer>
);

const Copyright = () => (
  <li>
    <Typography variant="small" className="text-sfblack">
      <small>&#169; 2025 All rights reserved</small>
    </Typography>
  </li>
);

interface FooterProps {
  color: string;
  children: ReactNode;
}

const Footer = () => {
  const seasonalColor = getSeasonColor();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const footerItems = [
    {
      icon: null,
      label: "Datenschutz",
      href: "/datenschutz",
    },
    {
      icon: null,
      label: "Impressum",
      href: "/impressum",
    },
  ];

  return (
    <FooterContainer color={seasonalColor}>
      {isDesktop ? (
        <ul className="grid grid-cols-3 items-center">
          <div className="flex justify-start">
            <NavList items={footerItems} style={NavStyle.FOOTER} />
          </div>
          <div className="flex justify-center">
            <Logo variant="footer" />
          </div>
          <div className="flex justify-end">
            <Copyright />
          </div>
        </ul>
      ) : (
        <ul className="flex w-full flex-col items-center gap-5">
          <Logo variant="footer" />
          <NavList items={footerItems} style={NavStyle.FOOTER} />
          <Copyright />
        </ul>
      )}
    </FooterContainer>
  );
};

export default Footer;
