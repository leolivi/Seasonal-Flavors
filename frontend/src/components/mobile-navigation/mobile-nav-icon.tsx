import { CgMenu } from "react-icons/cg";

interface MobileNavIconProps {
  onClick: () => void;
  color: string;
}

// component for mobile nav icon
export const MobileNavIcon = ({ onClick, color }: MobileNavIconProps) => (
  <li
    className={`absolute right-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-${color}-light min-[640px]:right-8`}
    data-testid="mobile-nav-icon"
    onClick={onClick}
  >
    <CgMenu onClick={onClick} size={25} />
  </li>
);
