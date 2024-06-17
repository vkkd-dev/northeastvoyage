import ReviewSlider from "./ReviewSlider";

function Reviews() {
  return (
    <div className="pt-[2rem] pb-[4rem] padding-container">
      <h1 className="heading">Reviews</h1>
      <div className="mt-[4rem] w-[80%] mx-auto">
        <ReviewSlider />
      </div>
    </div>
  );
}

export default Reviews;
