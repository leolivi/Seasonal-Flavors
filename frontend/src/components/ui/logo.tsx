import Link from "next/link";
import SeasonalFlavorsLogo from "../../assets/logo/seasonal-flavors-logo.svg";

interface LogoProps {
  variant?: "header" | "footer";
}

// component for logo
const Logo = ({ variant = "header" }: LogoProps) => {
  // Conditional styles based on the variant (header or footer)
  const logoStyles =
    variant === "footer" ? "h-[1.8rem] w-auto" : "h-8 w-auto min-[640px]:h-10";

  return (
    <li
      className={`cursor-pointer ${variant === "footer" ? "min-[640px]:flex" : ""}`}
      data-testid="logo"
    >
      <Link href="/">
        <SeasonalFlavorsLogo className={logoStyles} />
      </Link>
    </li>
  );
};

export default Logo;
