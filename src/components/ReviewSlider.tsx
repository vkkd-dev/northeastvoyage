import Carousel from "react-multi-carousel";
import ClientReview from "./ClientReview";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";
import Image from "next/image";

interface Review {
  id: string;
  image: string;
  name: string;
  review: string;
}

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
  const [reviewsData, setReviewsData] = useState<Review[]>([]);

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
      arrows={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      infinite={true}
      responsive={responsive}
      itemClass="item"
    >
      {reviewsData.map((review, index) => (
        <div key={index} className="p-4">
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
