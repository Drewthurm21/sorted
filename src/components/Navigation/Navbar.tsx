import { AiOutlineBorderlessTable } from "react-icons/ai";
import { ReactElement } from "react";

export default function NavbarWrapper() {
  return (
    <div className="absolute top-0 w-full h-20 justify-between align-center bg-emerald-400">
      <Navbar />
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex h-full justify-between">
      <div className="flex w-60 justify-evenly items-center">Algo Vis_</div>
      <div className="flex w-1/2 mr-20 justify-evenly items-center">
        {navbarItems.map((item) => (
          <NavbarItem {...item} />
        ))}
      </div>
    </div>
  );
}

const navbarItems = [
  { icon: <AiOutlineBorderlessTable />, label: "label" },
  { icon: <AiOutlineBorderlessTable />, label: "label" },
  { icon: <AiOutlineBorderlessTable />, label: "label" },
];

type NavbarItemProps = {
  icon: ReactElement;
  label: String;
};

function NavbarItem({ icon, label }: NavbarItemProps) {
  return (
    <div>
      {icon ? (
        <div>
          {icon}
          <div>{label}</div>
        </div>
      ) : (
        <div>{label}</div>
      )}
    </div>
  );
}
