function HamburgerMenu({ isClicked, setIsClicked, searchClick, setSearchClick }) {
  const handleClick = () => {
    searchClick && setSearchClick(false);
    setIsClicked(!isClicked);
  };

  return (
    <button
      className="relative flex flex-col justify-center items-center w-8 h-8 lg:hidden"
      onClick={handleClick}
      aria-label="Toggle menu">
      <div className={`transform transition-transform duration-300 ease-in-out ${isClicked ? "rotate-45 translate-y-1.5" : ""} h-[2px] w-6 bg-white`} />
      <div className={`transition-opacity duration-300 ease-in-out ${isClicked ? "opacity-0" : "opacity-100"} h-[2px] w-6 bg-white my-1`} />
      <div className={`transform transition-transform duration-300 ease-in-out ${isClicked ? "-rotate-45 -translate-y-1.5" : ""} h-[2px] w-6 bg-white`} />
    </button>
  );
}

export default HamburgerMenu;
