import Carousel from "react-multi-carousel";
import { Button } from "./ui/button";
import { FiChevronLeft } from "react-icons/fi";
import { BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import WhyUsCard from "./WhyUsCard";

const WhyUsData = [
  {
    title: "Local Expertise",
    subtitle: `Being locals from the region, our team has a deep knowledge of Northeast India's hidden gems.`,
  },
  {
    title: "Sustainable Travel",
    subtitle:
      "Commited to responsible tourism, ensuring minimal impact on the environment.",
  },
  {
    title: "Personalized Service",
    subtitle:
      "Dedicated team to provide exceptional service, catering to your needs and making your trip memorable.",
  },
  {
    title: "Safety First",
    subtitle:
      "Proper safety measures and experienced professionals to ensure a secure travel experience.",
  },
];

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
      {WhyUsData.map((data, index) => (
        <WhyUsCard data={data} key={index} />
      ))}
    </Carousel>
  );
}

export default WhyUsSlider;
