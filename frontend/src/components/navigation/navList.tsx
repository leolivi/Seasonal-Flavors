// components/NavList.js
import NavItem from "./navItem";

interface NavListProps {
  items: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
}

const NavList = ({ items }: NavListProps) => {
  return (
    <ul className="flex flex-col items-start gap-2 space-y-4 pt-6">
      {items.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default NavList;
