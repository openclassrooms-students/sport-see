import { Link } from "react-router-dom";
import { Icon } from "../ui/Icon";

const navLinks = [
  {
    id: 1,
    title: "Accueil",
    path: "/",
  },
  {
    id: 2,
    title: "Profil",
    path: "/profil",
  },
  {
    id: 3,
    title: "Réglage",
    path: "/reglage",
  },
  {
    id: 4,
    title: "Communauté",
    path: "/communaute",
  },
];

export const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full h-24 bg-black flex items-center justify-between px-8 z-10">
      <Link to="/" className="flex items-center gap-2.5 ">
        <Icon.Logo className="h-14 w-14" />
        <h2 className="text-primary text-2xl font-bold">SportSee</h2>
      </Link>
      <ul className="flex gap-52">
        {navLinks.map((link) => (
          <li
            key={link.id}
            className="text-white text-2xl font-medium leading-normal"
          >
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
