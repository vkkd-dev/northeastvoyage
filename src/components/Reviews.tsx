import Image from "next/image";
import ReviewSlider from "./ReviewSlider";

function Reviews() {
  return (
    <div className="py-[6rem] max-container review-container">
      <h1 className="heading text-center font-bold">REVIEWS</h1>
      <Image
        width={120}
        height={120}
        src="./line.svg"
        alt="star"
        className="hidden lg:flex mx-auto"
      />
      <div className="mt-[1rem] w-[100%] mx-auto">
        <ReviewSlider />
      </div>
    </div>
  );
}

export default Reviews;
