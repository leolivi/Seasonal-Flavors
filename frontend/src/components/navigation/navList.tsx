// components/NavList.js
import NavItem from "./navItem";

interface NavListProps {
  items: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
}

const NavList = ({ items = [] }: NavListProps) => {
  return (
    <ul className="flex w-auto flex-col items-start gap-2 space-y-4 pt-6 min-[640px]:flex-row min-[640px]:items-center min-[640px]:justify-evenly min-[640px]:gap-4 min-[640px]:space-y-0 min-[640px]:pt-0 min-[1024px]:gap-10">
      {items.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default NavList;
