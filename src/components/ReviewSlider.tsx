import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
import { FiChevronLeft } from "react-icons/fi";
import { BiChevronRight } from "react-icons/bi";
import { Button } from "./ui/button";

interface Review {
  id: string;
  image: string;
  name: string;
  review: string;
}

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

function ReviewSlider() {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
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

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(firestore, "reviews");
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewsList = reviewsSnapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];
      setReviewsData(reviewsList);
    };

    fetchReviews();
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
      {reviewsData.map((review, index) => (
        <div
          key={index}
          className="m-4 p-4 border-[#0DB295] sm:border-none lg:border-solid border-2 rounded-3xl"
        >
          <div>
            <Image
              width={100}
              height={100}
              alt={review.name}
              src={review.image}
              className="rounded-full mx-auto"
            />
          </div>
          <h1 className="mt-[1.5rem] mb-[0.5rem] font-bold text-center text-[18px] text-black">
            {review.name}
          </h1>
          <p className="text-center px-10">{review.review}</p>
        </div>
      ))}
    </Carousel>
  );
}

export default ReviewSlider;
