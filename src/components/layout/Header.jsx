import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-around py-4 border-b-2 border-gray-800 fixed w-full">
      <h1 className="font-bold text-2xl">Neko Stream</h1>

      <ul className="flex gap-2 items-center justify-center">
        <li>
          <a
            href="#"
            className="font-semibold">
            Home
          </a>
        </li>
        <li>
          <a href="#">Genre</a>
        </li>
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
