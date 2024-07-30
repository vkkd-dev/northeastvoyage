"use client";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";

interface Pros {
  nav: boolean;
  closeNav: () => void;
}

interface Category {
  id: string;
  title: string;
}

interface Destination {
  id: string;
  alt: string;
}

function MobileNavbar({ nav, closeNav }: Pros) {
  const navAnimation = nav ? "translate-x-0" : "translate-x-[100%]";
  const [isDestinationsExpanded, setIsDestinationsExpanded] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "categories")
        );
        const categoriesData: Category[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: (doc.data() as Omit<Category, "id">).title,
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchDestinations = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "destinations")
        );
        const destinationsData: Destination[] = querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            alt: (doc.data() as Omit<Destination, "id">).alt,
          })
        );
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchCategories();
    fetchDestinations();
  }, []);

  const handleToggleDestinations = () => {
    setIsDestinationsExpanded(!isDestinationsExpanded);
  };

  const handleToggleCategories = () => {
    setIsCategoriesExpanded(!isCategoriesExpanded);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    closeNav();
  };

  return (
    <div
      className={`fixed ${navAnimation} bg-white transform transition-all duration-300 top-0 right-0 bottom-0 z-[10000]`}
    >
      <div
        onClick={closeNav}
        className="absolute bg-[#D4D4D4] p-2 rounded-full cursor-pointer top-[1rem] right-[1rem] z-[999]"
      >
        <XMarkIcon className="w-[1.5rem] h-[1.5rem] text-black font-bold" />
      </div>
      <div className="w-[60vw] h-[100vh] flex flex-col">
        <div className="flex flex-col pt-20">
          <div className="nav-links-mobile-border">
            <div
              className="nav-links-mobile"
              onClick={() => handleNavigation("/")}
            >
              <span className="nav-links-mobile-text">Home</span>
            </div>
          </div>
          <div className="nav-links-mobile-border">
            <div
              className="nav-links-mobile"
              onClick={handleToggleDestinations}
            >
              <span className="nav-links-mobile-text">
                Destination
                <Image
                  width={15}
                  height={15}
                  alt="drop-down"
                  src="/down-arrow.svg"
                  className={`transition-transform ${
                    isDestinationsExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </div>
            {isDestinationsExpanded && (
              <div className="mt-5">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="w-full py-5 cursor-pointer border-t-[1px] border-gray-400"
                    onClick={() =>
                      handleNavigation(`/about?id=${destination.id}`)
                    }
                  >
                    <span className="nav-links-mobile-text">
                      {destination.alt}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="nav-links-mobile-border">
            <div className="nav-links-mobile" onClick={handleToggleCategories}>
              <span className="nav-links-mobile-text">
                Categories
                <Image
                  width={15}
                  height={15}
                  alt="drop-down"
                  src="/down-arrow.svg"
                  className={`transition-transform ${
                    isCategoriesExpanded ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </div>
            {isCategoriesExpanded && (
              <div className="mt-5">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="w-full py-5 cursor-pointer border-t-[1px] border-gray-400"
                    onClick={() =>
                      handleNavigation(`/category?id=${category.id}`)
                    }
                  >
                    <span className="nav-links-mobile-text">
                      {category.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="nav-links-mobile-border">
            <div
              className="nav-links-mobile"
              onClick={() => handleNavigation("aboutus")}
            >
              <span className="nav-links-mobile-text">About Us</span>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleNavigation("contactus")}
          className="relative lg:inline-flex items-center justify-center self-center mt-16 px-8 py-2 overflow-hidden font-medium tracking-tighter text-white bg-primary rounded-full group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-900 rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="absolute inset-0 w-full -mt-1 rounded-lg opacity-30 bg-gradient-to-t from-transparent via-transparent bg-green-600"></span>
          <span className="relative text-sm">Contact Us</span>
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
