import { Season } from "../../utils/Season";
import Cross from "../../assets/icons/cross.svg";
import { NavStyle } from "../nav-item/nav-item";
import NavList from "../nav-list/nav-list";

interface MobileNavigationProps {
  onClose: () => void;
  isOpen: boolean;
  navigationItems: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
}

// component defining content for mobile navigation
export default function MobileNavigation({
  isOpen,
  onClose,
  navigationItems,
}: MobileNavigationProps) {
  const season = new Season();
  const seasonalColor = season.getColor();
  if (!isOpen) return null;

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex w-full flex-col items-center rounded-b-3xl bg-${seasonalColor}-light px-4 pb-10 pt-4 transition-all duration-500 ease-in-out min-[640px]:px-10 min-[640px]:py-10 ${
        isOpen
          ? "z-100 translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <Cross
        className="m-2 w-6 cursor-pointer self-end"
        onClick={onClose}
        data-testid="cross-icon"
      />
      <NavList items={navigationItems} style={NavStyle.HEADER} />
    </div>
  );
}
