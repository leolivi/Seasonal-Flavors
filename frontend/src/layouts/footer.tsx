"use client";
import { ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import NavList from "@/components/nav-list/nav-list";
import Logo from "@/components/ui/logo";
import { NavStyle } from "@/components/nav-item/nav-item";
import { getSeasonColor } from "@/utils/SeasonUtils";
import useMediaQuery from "@/hooks/use-media-query";

/*
  @desc Footer container component
*/
const FooterContainer = ({ color, children }: FooterProps) => (
  <footer
    className={`w-full rounded-t-3xl p-10 bg-${color}-light z-50 mt-auto list-none`}
  >
    {children}
  </footer>
);

/*
  @desc Copyright component
*/
const Copyright = () => (
  <div aria-label="Copyright">
    <Typography variant="small" className="text-sfblack">
      <small>&#169; 2025 All rights reserved</small>
    </Typography>
  </div>
);

interface FooterProps {
  color: string;
  children: ReactNode;
}

/*
  @desc Footer component
*/
const Footer = () => {
  const seasonalColor = getSeasonColor();
  const isDesktop = useMediaQuery("(min-width: 720px)");

  const footerItems = [
    {
      icon: null,
      label: "Datenschutz",
      href: "/data-protection",
    },
    {
      icon: null,
      label: "Impressum",
      href: "/imprint",
    },
  ];

  return (
    <FooterContainer color={seasonalColor}>
      {/* Desktop layout */}
      {isDesktop ? (
        <ul className="grid grid-cols-3 items-center">
          <li className="flex justify-start">
            {/* Footer navigation */}
            <NavList items={footerItems} style={NavStyle.FOOTER} />
          </li>
          <li className="flex justify-center">
            <Logo variant="footer" />
          </li>
          <li className="flex justify-end">
            <Copyright />
          </li>
        </ul>
      ) : (
        /* Mobile layout */
        <ul className="flex w-full flex-col items-center gap-5">
          <li>
            <Logo variant="footer" />
          </li>
          <li>
            {/* Footer navigation */}
            <NavList items={footerItems} style={NavStyle.FOOTER} />
          </li>
          <Copyright />
        </ul>
      )}
    </FooterContainer>
  );
};

export default Footer;
