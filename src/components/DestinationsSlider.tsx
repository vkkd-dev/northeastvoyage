import { destinationData } from "@/data/destinationData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Destination {
  src: string;
  alt: string;
  description: string;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 8,
    slideToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 2,
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
        arrows={false}
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
            <Image
              src={destination.src}
              alt={destination.alt}
              height={100}
              width={100}
              className="rounded-full mx-auto"
            />
            <h1 className="destination-h1">{destination.alt}</h1>
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
              <Image
                src={destination.src}
                alt={destination.alt}
                height={200}
                width={200}
                className="rounded-full mx-auto"
              />
              <h1 className="destination-h1">{destination.alt}</h1>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default DestinationsSlider;
