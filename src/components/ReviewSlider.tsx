import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ClientReview from "./ClientReview";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 3,
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

function ReviewSlider() {
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
      <ClientReview name="Test" image="/user1.jpg" />
      <ClientReview name="Test" image="/user2.jpg" />
      <ClientReview name="Test" image="/user3.jpg" />
    </Carousel>
  );
}

export default ReviewSlider;
