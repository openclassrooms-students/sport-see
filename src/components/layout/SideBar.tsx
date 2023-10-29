import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";

export const SideBar = () => {
  const currentYear: number = new Date().getFullYear();

  const navLinks = [
    {
      id: 1,
      icon: <Icon.Meditation />,
    },
    {
      id: 2,
      icon: <Icon.Swimming />,
    },
    {
      id: 1,
      icon: <Icon.Bike />,
    },
    {
      id: 2,
      icon: <Icon.Bodybuilding />,
    },
  ];

  return (
    <aside className="fixed bottom-0 w-28 h-full bg-black flex flex-col justify-center items-center">
      <nav className="flex flex-col gap-5">
        {navLinks.map((link) => (
          <Link to="/" key={link.id} className="w-16 h-16">
            {link.icon}
          </Link>
        ))}
      </nav>

      <small className="fixed bottom-24 -rotate-90 text-white text-xs font-medium whitespace-nowrap">
        Copyright SportSee - {currentYear}
      </small>
    </aside>
  );
};
