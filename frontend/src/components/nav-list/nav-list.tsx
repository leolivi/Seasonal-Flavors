import NavItem, { NavStyle } from "../nav-item/nav-item";

interface NavListProps {
  items: {
    icon?: React.ReactNode;
    label: string;
    href: string;
    isActive?: boolean;
  }[];
  style?: NavStyle;
}

// component to map through items for navigation
const NavList = ({ items = [], style = NavStyle.HEADER }: NavListProps) => {
  return (
    <ul
      className={`min-[730px]:flex-row min-[730px]:items-center min-[730px]:justify-evenly min-[730px]:gap-4 min-[730px]:space-y-0 min-[1024px]:gap-10 ${style === NavStyle.FOOTER ? "flex justify-center gap-8" : "flex w-auto flex-col items-start gap-2 space-y-4 [&>li:last-child]:self-center"}`}
    >
      {items.map((item, index) => (
        <NavItem key={index} {...item} style={style} />
      ))}
    </ul>
  );
};

export default NavList;
