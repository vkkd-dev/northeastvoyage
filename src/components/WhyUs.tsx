import Image from "next/image";
import WhyUsSlider from "./WhyUsSlider";

function WhyUs() {
  return (
    <div className="py-[7rem] padding-container">
      <h1 className="heading text-center">WHY US</h1>
      <Image
        width={120}
        height={120}
        src="./line.svg"
        alt="star"
        className="hidden lg:flex mx-auto"
      />
      <div className="mt-[1rem] w-[95%] mx-auto">
        <WhyUsSlider />
      </div>
    </div>
  );
}

export default WhyUs;
