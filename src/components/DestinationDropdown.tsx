import { useState } from "react";
import Image from "next/image";

const DestinationDropdown = ({ closeNav }: { closeNav: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const destinations = [
    "Assam",
    "Arunachal",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Tripura",
    "Sikkim",
  ];

  return (
    <div className="relative">
      <div
        className="nav-links-mobile flex items-center justify-between w-full px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Destination
        <Image width={15} height={15} alt="drop-down" src="/down-arrow.svg" />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10 mt-1">
          {destinations.map((destination) => (
            <li
              key={destination}
              className="w-full px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                // Handle destination selection here
                closeNav();
              }}
            >
              {destination}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationDropdown;
