"use client";

import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/app/firebase/firebase-cofig";

function Hero() {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        // Replace 'hero-image-path' with the actual path to your hero image in Firebase Storage
        const heroImageRef = ref(storage, "hero/currentImage");
        const url = await getDownloadURL(heroImageRef);
        setHeroImageUrl(url);
      } catch (error) {
        console.error("Error fetching hero image:", error);
      }
    };

    fetchHeroImage();
  }, []);

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
