import { Bars3Icon, PhoneIcon } from "@heroicons/react/16/solid";

interface Props {
  nav: boolean;
  openNav: () => void;
}

function Navbar({ nav, openNav }: Props) {
  const handleDial = () => {
    window.location.href = "tel:9876543210";
  };

  return (
    <div className="w-[100%] bg-white">
      <div className="flex w-[80%] mx-auto items-center justify-between h-[12vh]">
        <div className="relative cursor-pointer">
          <h1 className="lg:text-2xl font-extrabold text-primary">
            Northeast Voyage
          </h1>
          <h1 className="text-xs lg:text-lg font-bold">
            A SOCIAL TRAVEL COMMUNITY
          </h1>
        </div>
        <div className="flex items-center space-x-12">
          <a href="#" className="nav-links">
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
            <div className="flex space-x-3">
              <PhoneIcon
                onClick={handleDial}
                className="w-[1.5rem] lg:w-[2rem] lg:hidden h-[1.5rem] lg:h-[2rem] text-black font-bolds"
              />
              <Bars3Icon
                onClick={openNav}
                className="w-[1.5rem] lg:w-[2rem] lg:hidden h-[1.5rem] lg:h-[2rem] text-black font-bolds"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
