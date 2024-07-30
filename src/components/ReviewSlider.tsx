import Image from "next/image";
import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
import { FiChevronLeft } from "react-icons/fi";
import { BiChevronRight } from "react-icons/bi";
import { Button } from "./ui/button";
import "react-multi-carousel/lib/styles.css";
import { Skeleton } from "./ui/skeleton";

interface Review {
  id: string;
  image: string;
  name: string;
  review: string;
  star: number;
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
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true);
      try {
        const reviewsCollection = collection(firestore, "reviews");
        const reviewsSnapshot = await getDocs(reviewsCollection);
        const reviewsList = reviewsSnapshot.docs.map((doc: DocumentData) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];
        setReviewsData(reviewsList);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-evenly p-5">
          {[1, 2, 3, 4].slice(0, isMobile ? 1 : 4).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-5">
              <Skeleton className="h-40 w-40 lg:h-32 lg:w-32 rounded-full" />
              <Skeleton className="h-3 w-[150px] lg:w-[150px]" />
              <Skeleton className="h-3 w-[150px] lg:w-[150px]" />
              <Skeleton className="h-3 w-[300px] lg:w-[200px]" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && reviewsData.length === 0 && (
        <h1 className="text-center py-5">No Available Destinations</h1>
      )}

      {!isLoading && reviewsData.length > 0 && (
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
              className="w-[90%] lg:w-[300px] h-[270px] p-3 mx-auto border-[#0DB295] sm:border-none lg:border-solid border-2 rounded-3xl"
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
              <h1 className="mt-[0.5rem] font-bold text-center text-[16px] text-black">
                {review.name}
              </h1>
              <div className="flex items-center justify-center my-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 ${
                        star <= review.star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21 12 17.27z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-center text-sm w-[90%] mx-auto">
                {review.review.length > 85
                  ? review.review.slice(0, 85) + "..."
                  : review.review}
              </p>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default ReviewSlider;
