import { Season } from "../../utils/Season";
import Cross from "../../assets/icons/cross.svg";
import Home from "../../assets/icons/home.svg";
import Soup from "../../assets/icons/soup.svg";
import Profil from "../../assets/icons/profil.svg";
import NavList from "./navList";
import { Typography } from "../ui/typography";

interface MobileNavigationProps {
  onClose: () => void;
  isOpen: boolean;
}

const navigationItems = [
  {
    icon: <Home className="w-5" />,
    label: "Home",
    href: "/",
  },
  {
    icon: <Soup className="w-5" />,
    label: "Rezepte",
    href: "/rezepte",
  },
  {
    icon: <Profil className="w-5" />,
    label: "anmelden",
    href: "/login",
  },
];

export default function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps) {
  const season = new Season();
  const seasonalColor = season.getColor();

  return (
    <div
      className={`absolute left-0 top-0 flex w-full flex-col items-center rounded-b-3xl bg-${seasonalColor}-light px-10 py-10 transition-all duration-500 ease-in-out ${
        isOpen
          ? "z-100 translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <Cross className="m-2 w-6 cursor-pointer self-end" onClick={onClose} />
      <NavList items={navigationItems} />
      <ul className="flex flex-row justify-center gap-8 pt-14">
        <Typography variant="small" className="text-sfblack">
          <li className="cursor-pointer">Datenschutz</li>
        </Typography>
        <Typography variant="small" className="text-sfblack">
          <li className="cursor-pointer">Impressum</li>
        </Typography>
      </ul>
    </div>
  );
}
