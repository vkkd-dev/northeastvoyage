import { XMarkIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface Pros {
  nav: boolean;
  closeNav: () => void;
}

function MobileNavbar({ nav, closeNav }: Pros) {
  const navAnimation = nav ? "translate-x-0" : "translate-x-[100%]";

  const handleNavigation = () => {
    closeNav();
  };

  return (
    <div
      className={`fixed ${navAnimation} bg-white transform transition-all duration-300 top-0 right-0 bottom-0 z-[10000]`}
    >
      <div className="w-[60vw] h-[100vh] flex flex-col items-center justify-center">
        <div className="flex flex-col items-start">
          <div className="nav-links-mobile" onClick={handleNavigation}>
            Home
          </div>
          <div className="nav-links-mobile" onClick={handleNavigation}>
            Destination
          </div>
          <div className="nav-links-mobile" onClick={handleNavigation}>
            About Us
          </div>
        </div>
        <div
          onClick={handleNavigation}
          className="relative lg:inline-flex items-center justify-center px-10 py-3 overflow-hidden font-medium tracking-tighter text-white bg-primary rounded-full group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-900 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full -mt-1 rounded-lg opacity-30 bg-gradient-to-t from-transparent via-transparent bg-green-600"></span>
          <span className="relative">Contact Us</span>
        </div>
      </div>
      <div
        onClick={closeNav}
        className="absolute cursor-pointer top-[2rem] z-[999] right-[2rem] w-[2rem] h-[2rem] text-black"
      >
        <XMarkIcon />
      </div>
    </div>
  );
}

export default MobileNavbar;
