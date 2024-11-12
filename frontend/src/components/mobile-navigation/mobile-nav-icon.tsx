import MobileNav from "@/assets/icons/mobile-nav.svg";

interface MobileNavIconProps {
  onClick: () => void;
  color: string;
}

// component for mobile nav icon
export const MobileNavIcon = ({ onClick, color }: MobileNavIconProps) => (
  <li
    className="absolute right-4 cursor-pointer min-[640px]:right-0"
    data-testid="mobile-nav-icon"
  >
    <MobileNav
      onClick={onClick}
      className={`bg-${color}-light h-12 w-auto rounded-full`}
    />
  </li>
);
