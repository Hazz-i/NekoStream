import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSearch } from "@/context/searchProvier";

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

  // const { setSearch, isSearch } = useSearch();
  const { setSearch, isSearch, setIsSearch } = useSearch();
  const [searchAnime, setSearchAnime] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    setIsSearching(isSearch);
  }, [isSearch]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchAnime.length === 0) {
      navigate("/neko-stream/home");
    } else {
      setSearch(searchAnime);
      setIsSearch(true);
      navigate(`/neko-stream/search/${encodeURIComponent(searchAnime)}`);
    }

    setSearchAnime("");
  };

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
        <form
          className="flex w-full max-w-sm items-center space-x-2"
          onSubmit={handleSearch}
          action="#">
          <Input
            type="serach"
            placeholder="Cari anime..."
            value={searchAnime}
            onChange={(e) => setSearchAnime(e.target.value)}
          />
          <Button
            type="submit"
            disabled={isSearching}>
            cari
          </Button>
        </form>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </header>
  );
};

export default Header;
