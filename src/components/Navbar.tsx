import { Bars3Icon } from "@heroicons/react/16/solid";
import { IoIosArrowDown } from "react-icons/io";
import { CgPhone } from "react-icons/cg";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";

interface Props {
  nav: boolean;
  openNav: () => void;
}

function Navbar({ nav, openNav }: Props) {
  const handleCall = () => {
    window.location.href = "tel:+918099451325";
  };

  return (
    <div className="w-[100%] bg-white fixed z-50 shadow-lg">
      <div className="flex w-[90%] lg:w-[85%] mx-auto items-center justify-between h-[10vh]">
        <div className="flex items-center">
          <div className="relative cursor-pointer">
            <a
              href="/"
              className="text-xl lg:text-3xl font-extrabold text-primary"
            >
              Northeast Voyage
            </a>
            <h1 className="text-xs lg:text-xs font-extrabold tracking-wider">
              A SOCIAL TRAVEL COMMUNITY
            </h1>
          </div>
        </div>

        <div className="flex items-center lg:gap-10">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1">
                <a href="#" className="nav-links">
                  Destination
                </a>
                <IoIosArrowDown className="nav-links" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              {/* <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md z-50"> */}
              <ul className="py-2">
                {[
                  "Assam",
                  "Arunachal",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Tripura",
                  "Sikkim",
                ].map((destination) => (
                  <li key={destination} className="px-4 py-2 hover:bg-gray-200">
                    <Link href={`#`}>{destination}</Link>
                  </li>
                ))}
              </ul>
              {/* </div> */}
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1">
                <a href="#" className="nav-links">
                  Categories
                </a>
                <IoIosArrowDown className="nav-links" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              {/* <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md z-50"> */}
              <ul className="py-2">
                {["Trips", "Destinations"].map((category) => (
                  <li key={category} className="px-4 py-2 hover:bg-gray-200">
                    <Link href={`#`}>{category}</Link>
                  </li>
                ))}
              </ul>
              {/* </div> */}
            </HoverCardContent>
          </HoverCard>

          <div className="flex items-center gap-1">
            <a href="#" className="nav-links">
              About Us
            </a>
          </div>
          {!nav && (
            <div className="flex space-x-3 lg:hidden">
              <div
                className="bg-[#D4D4D4] p-2 rounded-full"
                onClick={handleCall}
              >
                <CgPhone className="w-[1.5rem] lg:w-[2rem]  h-[1.5rem] lg:h-[2rem] text-black font-bold" />
              </div>
              <div className="bg-[#D4D4D4] p-2 rounded-full">
                <Bars3Icon
                  onClick={openNav}
                  className="w-[1.5rem] lg:w-[2rem] h-[1.5rem] lg:h-[2rem] text-black font-bold"
                />
              </div>
            </div>
          )}
        </div>

        <div
          className="hidden lg:flex items-center gap-2 cursor-pointer"
          onClick={handleCall}
        >
          <div className="bg-[#D4D4D4] w-[2.5rem] h-[2.5rem] p-2 rounded-full">
            <CgPhone className="w-[1.5rem] h-[1.5rem] text-black font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Call Us</span>
            <h1 className="text-base font-bold">
              +91 8099451325
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
