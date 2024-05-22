import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    items: 4,
    slideToSlide: 1,
  },
};

function DestinationsSlider() {
  return (
    <div className="flex flex-col space-y-10">
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={false}
        autoPlaySpeed={5000}
        centerMode={false}
        infinite={true}
        responsive={responsive}
        itemClass="item"

        //   swipeable={false}
        //   draggable={false}
        //   showDots={true}
        //   ssr={true} // means to render carousel on server-side.
        //   keyBoardControl={true}
        //   customTransition="all .5"
        //   transitionDuration={500}
        //   containerClass="carousel-container"
        //   removeArrowOnDeviceType={["tablet", "mobile"]}
        //   deviceType={this.props.deviceType}
        //   dotListClass="custom-dot-list-style"
      >
        <div className="m-1">
          <Image
            src="/d1.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Assam</h1>
        </div>
        <div className="m-1">
          <Image
            src="/d2.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Arunachal</h1>
        </div>
        <div className="m-1">
          <Image
            src="/d3.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Manipur</h1>
        </div>
        <div className="m-1">
          <Image
            src="/d4.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Meghalaya</h1>
        </div>
      </Carousel>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={false}
        autoPlaySpeed={5000}
        centerMode={false}
        infinite={true}
        responsive={responsive}
        itemClass="item"
      >
        <div className="m-1">
          <Image
            src="/d1.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Mizoram</h1>
        </div>
        <div className="m-1">
          <Image
            src="/d5.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Nagaland</h1>
        </div>
        <div className="m-1">
          <Image
            src="/d6.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Tripura</h1>
        </div>
        <div className="m-1">
          <Image
            src="/d1.png"
            alt="destination"
            height={200}
            width={200}
            className="rounded-full mx-auto"
          />
          <h1 className="destination-h1">Sikkim</h1>
        </div>
      </Carousel>
    </div>
  );
}

export default DestinationsSlider;
