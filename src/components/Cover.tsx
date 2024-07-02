import { useState } from "react";
import BottomSheet from "./BottomSheet";
import { Button } from "./ui/button";

const Cover = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  return (
    <div className="relative w-full h-[20vh] lg:h-[50vh]">
      <div className="absolute top-0 left-0 w-full h-full opacity-50"></div>
      <div
        id="hero"
        className="bg-cover bg-center bg-no-repeat h-full w-full z-10"
        style={{ backgroundImage: `url(/cover.jpeg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-gray-800" />

        <div className="absolute z-20 w-full h-full top-5 lg:top-16 left-5 lg:left-36 lg:space-y-3">
          <h1 className="font-extrabold text-white text-xl lg:text-3xl">
            Dreaming of your next Adventure
          </h1>
          <p className="text-white"> Hits us up!</p>
        </div>
        <Button
          onClick={openSheet}
          className="absolute z-50 bottom-5 lg:bottom-14 left-5 lg:left-36 bg-[#0DB295] rounded-full text-xs lg:text-sm text-white px-5 cursor-pointer"
        >
          Connect Now
        </Button>
        <BottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
      </div>
    </div>
  );
};

export default Cover;
