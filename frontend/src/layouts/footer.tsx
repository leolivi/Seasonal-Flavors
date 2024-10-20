"use client";
import { Season } from "../utils/Season";
import { ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import NavList from "@/components/navList/navList";
import Logo from "@/components/ui/logo";
import { NavStyle } from "@/components/navItem/navItem";

const FooterContainer = ({ color, children }: FooterProps) => (
  <footer className={`rounded-t-3xl p-10 bg-${color}-light`}>
    <ul className="flex w-full flex-col items-center gap-5">{children}</ul>
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
  const season = new Season();
  const seasonalColor = season.getColor();

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
      <Logo variant="footer" />
      <NavList items={footerItems} style={NavStyle.FOOTER} />
      <Copyright />
    </FooterContainer>
  );
};

export default Footer;
