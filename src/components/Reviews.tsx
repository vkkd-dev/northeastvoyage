import ReviewSlider from "./ReviewSlider";

function Reviews() {
  return (
    <div className="py-[5rem] max-container review-container">
      <h1 className="heading text-center font-bold">REVIEWS</h1>
      <div className="mt-[2rem] w-[100%] mx-auto">
        <ReviewSlider />
      </div>
    </div>
  );
}

export default Reviews;
