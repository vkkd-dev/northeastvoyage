import Carousel from "react-multi-carousel";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import { Button } from "./ui/button";
import { FiChevronLeft } from "react-icons/fi";
import { BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 4,
    slideToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 2,
    slideToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slideToSlide: 1,
  },
};

const ButtonGroup = ({ next, previous, ...rest }: any) => {
  const {
    carouselState: { currentSlide, totalItems, slidesToShow },
  } = rest;

  return (
    <div
      className="carousel-button-group"
      style={{
        position: "absolute",
        top: "50%",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        transform: "translateY(-50%)",
      }}
    >
      <Button className="rounded-full" size={"icon"} onClick={() => previous()}>
        <FiChevronLeft color="#fff" size={30} />
      </Button>
      <Button className="rounded-full" size={"icon"} onClick={() => next()}>
        <BiChevronRight color="#fff" size={30} />
      </Button>
    </div>
  );
};

function WhyUsSlider() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value based on current window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      customButtonGroup={isMobile ? <ButtonGroup /> : <></>}
      autoPlay={isMobile}
      autoPlaySpeed={5000}
      centerMode={false}
      infinite={true}
      responsive={responsive}
      itemClass="item"
    >
      <div className="m-4 p-8 border-[#0DB295] sm:border-none lg:border-solid border-2 rounded-3xl">
        <Image
          width={150}
          height={150}
          alt="Why us image"
          src="/whyus.png"
          className="mx-auto"
        />
        <h1 className="mt-[1.5rem] mb-[0.5rem] font-bold text-center">
          Expertise in Northeastern Destinations:
        </h1>
        <p className="text-center">
          Experience: With so many years of exploring the Northeast, we bring
          insider knowledge to craft unforgettable journeys. Local Insights: Our
          team includes locals who understand the region, ensuring authentic
          experiences. Exclusive Access: Gain access to hidden gems and
          lesser-known spots that only locals frequent.
        </p>
      </div>
    </Carousel>
  );
}

export default WhyUsSlider;
