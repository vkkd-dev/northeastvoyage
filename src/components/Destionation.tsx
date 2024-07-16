import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Destination {
  id: string;
  alt: string;
  description: string;
  img: string;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 4,
  },
};

const Destination: React.FC = () => {
  const router = useRouter();
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "destinations")
        );
        const destinations = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Destination[];
        console.log("destinations:", destinations);
        setDestinationData(destinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (destination: Destination) => {
    // router.push(`/about/${destination.id}`);
    router.push(`/about?id=${destination.id}`);
  };

  const renderMobileView = () => {
    const itemsPerRow = 4;
    const rows: JSX.Element[][] = [];
    let currentRow: JSX.Element[] = [];

    destinationData.forEach((destination, index) => {
      if (index > 0 && index % itemsPerRow === 0) {
        rows.push(currentRow);
        currentRow = [];
      }
      currentRow.push(
        <div
          key={index}
          className="m-2 cursor-pointer"
          onClick={() => handleNavigation(destination)}
        >
          <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden">
            <Image
              src={destination.img}
              alt={destination.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <h1 className="destination-h1 text-center mt-2">{destination.alt}</h1>
        </div>
      );
    });

    // Push the last row if it's not already added
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return (
      <div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center">
            {row}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-evenly pt-2 pb-5">
          {[1, 2, 3, 4, 5, 6, 7, 8]
            .slice(0, isMobileView ? 4 : 8)
            .map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <Skeleton className="h-20 w-20 lg:h-28 lg:w-28 rounded-full" />
                <Skeleton className="h-4 w-[75px] lg:w-[100px]" />
              </div>
            ))}
        </div>
      )}

      {!isLoading && destinationData.length === 0 && (
        <h1 className="text-center py-5">No Available Destinations</h1>
      )}

      {!isLoading && destinationData.length > 0 && (
        <Carousel
          // additionalTransfrom={0}
          swipeable={true}
          arrows={false}
          autoPlay={false}
          centerMode={false}
          infinite={true}
          responsive={responsive}
          itemClass="item"
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
        >
          {destinationData.map((destination, index) => (
            <div
              key={index}
              className="m-1 cursor-pointer"
              onClick={() => handleNavigation(destination)}
            >
              <div className="relative w-20 h-20 lg:w-32 lg:h-32 mx-auto rounded-full overflow-hidden">
                <Image
                  src={destination.img}
                  alt={destination.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h1 className="destination-h1 text-black text-center mt-2 text-base lg:text-lg font-light tracking-wider">
                {destination.alt}
              </h1>
            </div>
          ))}
        </Carousel>
      )}
      {/* </div> */}
      {/* <div className="block sm:hidden mt-4">{renderMobileView()}</div> */}
    </>
  );
};

export default Destination;
