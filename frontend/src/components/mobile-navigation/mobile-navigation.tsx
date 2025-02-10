import { getSeasonColor } from "@/utils/SeasonUtils";
import NavList from "../nav-list/nav-list";
import { RxCross2 } from "react-icons/rx";
import { NavStyle } from "@/utils/enum";

interface MobileNavigationProps {
  onClose: () => void;
  isOpen: boolean;
  navigationItems: {
    icon?: React.ReactNode;
    label: string;
    href: string;
  }[];
}

/*
  @desc Mobile navigation
*/
export default function MobileNavigation({ ...props }: MobileNavigationProps) {
  // get the seasonal color
  const seasonalColor = getSeasonColor();
  // check if the navigation is open
  if (!props.isOpen) return null;

  // render the component
  return (
    <div
      className={`fixed left-0 top-0 z-50 flex w-full flex-col items-center rounded-b-3xl bg-${seasonalColor}-light px-4 pb-10 pt-4 transition-all duration-500 ease-in-out min-[640px]:px-10 min-[640px]:py-10 ${
        props.isOpen
          ? "z-100 translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      {/* close button */}
      <RxCross2
        size={25}
        className="m-3 w-6 cursor-pointer self-end text-sfblack"
        data-testid="cross-icon"
        onClick={props.onClose}
      />
      {/* nav list */}
      <NavList items={props.navigationItems} style={NavStyle.HEADER} />
    </div>
  );
}
