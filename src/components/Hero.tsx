"use client";

import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/app/firebase/firebase-cofig";
import { ImSpinner2 } from "react-icons/im";

function Hero() {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHeroImage = async () => {
    setIsLoading(true);
    try {
      // Replace 'hero-image-path' with the actual path to your hero image in Firebase Storage
      const heroImageRef = ref(storage, "hero/currentImage");
      const url = await getDownloadURL(heroImageRef);
      setHeroImageUrl(url);
    } catch (error) {
      console.error("Error fetching hero image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImage();
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-full h-[30vh] lg:h-[90vh] flex justify-center items-center mt-4">
        <ImSpinner2
          height={30}
          width={30}
          className="animate-spin self-center text-center mt-4"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[30vh] lg:h-[90vh]">
      <div className="absolute top-0 left-0 w-full h-full opacity-50"></div>
      <div
        id="hero"
        className="bg-cover bg-center bg-no-repeat h-full w-full z-10"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute z-20 w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center flex-col w-full h-full">
            <SearchBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
