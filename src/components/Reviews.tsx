import ReviewSlider from "./ReviewSlider";

function Reviews() {
  return (
    <div className="py-[5rem] padding-container">
      <h1 className="heading text-center font-bold">REVIEWS</h1>
      <div className="mt-[2rem] w-[90%] mx-auto border-[#0DB295] border-solid border-2 rounded-3xl">
        <ReviewSlider />
      </div>
    </div>
  );
}

export default Reviews;
