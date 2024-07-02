import Carousel from "react-multi-carousel";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 1,
    slideToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 1,
    slideToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slideToSlide: 1,
  },
};

function WhyUsSlider() {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      infinite={true}
      responsive={responsive}
      itemClass="item"
    >
      <div className="flex flex-col items-center py-20  gap-4">
        <Image
          width={150}
          height={150}
          alt="Why us image"
          src="/whyus.png"
          className="mx-auto"
        />
        <h1 className="font-bold">Trusted Reviews</h1>
        <p className="text-center px-10">
          Read honest reviews from fellow travelers to ensure you make the best
          choices for your journey.
        </p>
      </div>
    </Carousel>
  );
}

export default WhyUsSlider;
