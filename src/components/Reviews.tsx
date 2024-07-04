import ReviewSlider from "./ReviewSlider";

function Reviews() {
  return (
    <div className="py-[5rem] padding-container">
      <h1 className="heading text-center font-bold">REVIEWS</h1>
      <div className="mt-[2rem] w-[100%] mx-auto">
        {/* <div className="border-[#0DB295] sm:border-solid lg:border-none border-2 rounded-3xl"> */}
        <ReviewSlider />
        {/* </div> */}
      </div>
    </div>
  );
}

export default Reviews;
