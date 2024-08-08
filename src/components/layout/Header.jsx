import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navList = [
    {
      to: "/neko-stream/home",
      name: "Home",
    },
    {
      to: "/neko-stream/genre",
      name: "Genre",
    },
  ];

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(``);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`flex items-center justify-around py-4 border-b-2 border-gray-800 fixed w-full z-50 ${isScrolled ? "backdrop-blur-sm" : "bg-gray-900"}`}>
      <h1 className="font-bold text-2xl">Neko Stream</h1>

      <ul className="flex gap-5 items-center justify-center">
        {navList.map((nav, index) => (
          <li key={index}>
            <NavLink
              to={nav.to}
              className={({ isActive }) =>
                classNames(isActive ? `hover:text-purple-600 transition ease-in-out duration-300 cursor-pointer` : `hover:text-purple-600 transition ease-in-out duration-300 cursor-pointer text-gray-500`)
              }
              key={index}>
              <small className="text-sm">{nav.name}</small>
            </NavLink>
          </li>
        ))}
        <li className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="serach"
            placeholder="Cari anime..."
          />
          <Button type="submit">Cari</Button>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </header>
  );
};

export default Header;
