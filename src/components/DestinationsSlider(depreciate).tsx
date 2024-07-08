// import { destinationData } from "@/data/destinationData";
import { firestore } from "@/app/firebase/firebase-cofig";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Destination {
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

function DestinationsSlider() {
  const router = useRouter();
  const [destinationData, setDestinationData] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "destinations")
        );
        const destinations = querySnapshot.docs.map(
          (doc) => doc.data() as Destination
        );
        console.log("destinations", destinations);
        setDestinationData(destinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleNavigation = (destination: Destination) => {
    const query = new URLSearchParams({
      trip: JSON.stringify(destination),
    }).toString();
    router.push(`/about?${query}`);
  };

  return (
    <div className="flex flex-col space-y-10">
      <Carousel
        additionalTransfrom={0}
        arrows={true}
        autoPlay={false}
        autoPlaySpeed={5000}
        centerMode={false}
        infinite={true}
        responsive={responsive}
        itemClass="item"
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
      <div className="block sm:hidden">
        <Carousel
          additionalTransfrom={0}
          arrows={false}
          autoPlay={false}
          autoPlaySpeed={5000}
          centerMode={false}
          infinite={true}
          responsive={responsive}
          itemClass="item"
        >
          {destinationData.reverse().map((destination, index) => (
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
    </div>
  );
}

export default DestinationsSlider;
