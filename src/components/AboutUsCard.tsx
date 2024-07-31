"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

const AboutUsCard = ({ data }: any) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check
    handleResize();

    // Event listener for resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addLineBreaks = (text: string): JSX.Element[] => {
    return text.split(" ").map((word, index) => (
      <Fragment key={index}>
        {word}
        {index < text.split(" ").length - 1 && <br />}
      </Fragment>
    ));
  };

  const handleNavigate = () => {
    window.open(data.url, "_blank");
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        width={175}
        height={175}
        src={data.image}
        alt="profile_picture"
        className="rounded-full w-[75px] h-[75px] lg:w-[175px] lg:h-[175px]"
      />
      <h2 className="mt-5 font-extrabold text-sm lg:text-lg">
        {isMobile ? addLineBreaks(data.name) : data.name}
      </h2>
      <p className="mt-1 text-xs lg:text-sm font-medium">{data.designation}</p>
      <Image
        width={30}
        height={30}
        src={"/instagram.png"}
        alt="logo"
        className="mt-5 cursor-pointer"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default AboutUsCard;
