import { useState } from "react";
import Image from "next/image";

const CategoryDropdown = ({ closeNav }: { closeNav: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["Group", "Family", "Honeymoon", "Solo"];

  return (
    <div className="relative">
      <div
        className="nav-links-mobile flex items-center justify-between w-full px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Category
        <Image width={15} height={15} alt="drop-down" src="/down-arrow.svg" />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10 mt-1">
          {categories.map((category) => (
            <li
              key={category}
              className="w-full px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                // Handle category selection here
                closeNav();
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
