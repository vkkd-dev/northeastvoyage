import { Bars3Icon } from "@heroicons/react/16/solid";
import { CgPhone } from "react-icons/cg";

interface Props {
  nav: boolean;
  openNav: () => void;
}

function Navbar({ nav, openNav }: Props) {
  return (
    <div className="w-[100%] bg-white">
      <div className="flex w-[90%] lg:w-[80%] mx-auto items-center justify-between h-[10vh]">
        <div className="relative cursor-pointer">
          <a
            href="/"
            className="text-xl lg:text-3xl font-extrabold text-primary"
          >
            Northeast Voyage
          </a>
          <h1 className="text-xs lg:text-sm font-bold">
            A SOCIAL TRAVEL COMMUNITY
          </h1>
        </div>
        <div className="flex items-center space-x-12">
          <a href="/" className="nav-links">
            Home
          </a>
          <a href="#" className="nav-links">
            Destination
          </a>
          <a href="#" className="nav-links">
            About Us
          </a>
          <a href="#" className="nav-links">
            Contact Us
          </a>
          {!nav && (
            <div className="flex space-x-3 lg:hidden">
              <div className="bg-[#D4D4D4] p-2 rounded-full">
                <CgPhone className="w-[1.5rem] lg:w-[2rem]  h-[1.5rem] lg:h-[2rem] text-black font-bolds" />
              </div>
              <div className="bg-[#D4D4D4] p-2 rounded-full">
                <Bars3Icon
                  onClick={openNav}
                  className="w-[1.5rem] lg:w-[2rem] h-[1.5rem] lg:h-[2rem] text-black font-bolds"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
