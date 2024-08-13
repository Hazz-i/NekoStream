import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import HamburgerMenu from "../HamburgerMenu";

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

  // SM SIZE
  const [isClicked, setIsClicked] = useState(false);
  const [searchClick, setSearchClick] = useState(false);

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
    setSearchClick(false);
  };

  const handleSearchClicked = () => {
    setSearchClick(!searchClick);
    isClicked && setIsClicked(false);
  };

  return (
    <>
      <header className={`flex items-center justify-between px-5 lg:px-0 lg:justify-around py-3 lg:py-4 border-b-2 border-gray-800 fixed w-full z-50 ${isScrolled ? "backdrop-blur-sm" : "bg-gray-900"}`}>
        <div className="flex  items-center justify-center gap-2">
          <HamburgerMenu
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            searchClick={searchClick}
            setSearchClick={setSearchClick}
          />
          <h1 className="font-bold lg:text-2xl">Neko Stream</h1>
        </div>

        {/* HANDLE SEARCH SM SIZE */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="lg:hidden flex items-center justify-center py-1 px-4 rounded-full"
              variant="outline"
              onClick={() => isClicked && setIsClicked(false)}>
              <i className="bx bx-search"></i>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm rounded-e-lg">
            <DialogHeader>
              <DialogTitle>Cari anime</DialogTitle>
            </DialogHeader>
            <form
              className="flex w-full max-w-sm items-center space-x-2"
              onSubmit={handleSearch}
              action="#">
              <Input
                type="serach"
                placeholder="Tulis Judul Anime..."
                value={searchAnime}
                onChange={(e) => setSearchAnime(e.target.value)}
              />
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={isSearching}>
                  cari
                </Button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
        {/* END HANDLE SEARCH SM SIZE */}

        <ul className="hidden lg:flex gap-5 items-center justify-center">
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

      {/* HANDLE CLICK SM SIZE */}
      {isClicked && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-gray-950">
          <ul className="grid gap-2 text-center">
            {navList.map((nav, index) => (
              <li key={index}>
                <NavLink
                  onClick={() => setIsClicked(false)}
                  to={nav.to}
                  className={({ isActive }) => classNames(isActive ? `` : `text-gray-500`)}
                  key={index}>
                  <h1>{nav.name}</h1>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* END LG HIDDEN */}
    </>
  );
};

export default Header;
