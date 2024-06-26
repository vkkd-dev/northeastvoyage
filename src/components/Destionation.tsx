import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";

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
    slideToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 6,
    slideToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 4,
    slideToSlide: 1,
  },
};

const Destination: React.FC = () => {
  const router = useRouter();
  const [destinationData, setDestinationData] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
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
      }
    };

    fetchDestinations();
  }, []);

  const handleNavigation = (destination: Destination) => {
    // const query = new URLSearchParams({
    //   trip: JSON.stringify(destination),
    // }).toString();
    // router.push(`/about?${query}`);
    router.push(`/about/${destination.id}`);
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
      <div className="hidden sm:block">
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlay={false}
          autoPlaySpeed={5000}
          centerMode={false}
          infinite={true}
          responsive={responsive}
          itemClass="item"
          customTransition="all 0.5s"
          transitionDuration={500}
          containerClass="carousel-container"
        >
          {destinationData.map((destination, index) => (
            <div
              key={index}
              className="m-1 cursor-pointer"
              onClick={() => handleNavigation(destination)}
            >
              <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden">
                <Image
                  src={destination.img}
                  alt={destination.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <h1 className="destination-h1 text-center mt-2">
                {destination.alt}
              </h1>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="block sm:hidden mt-4">{renderMobileView()}</div>
    </>
  );
};

export default Destination;
