"use client";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

function Footer() {
  const [showFullText, setShowFullText] = useState(false);

  const text = `At Northeast Voyage, our vision is to promote unparalleled, authentic, and sustainable travel experiences in Northeast India. We aspire to champion eco-friendly practices and support local communities, ensuring that our operations benefit the environment and the people who call Northeast India home. We aim to set the standard for excellence in the travel industry through our constant commitment to quality, safety, and personalized service.`;
  const text2 = `At Northeast Voyage, our vision is to promote unparalleled, authentic, and sustainable travel experiences in Northeast India.`;
  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleNavigate = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col justify-end bg-secondary h-[30rem] lg:h-[38rem] mt-[10rem] lg:mt-[15rem]">
      <div className="absolute left-[50%] translate-x-[-50%] w-[90%] pt-[2rem] lg:pt-[4rem] pb-[1rem] mb-[2rem] lg:mb-[4rem] bg-white rounded-2xl border-2 border-[#0DB295]">
        <div className="w-[85%] mx-auto items-center">
          <div className="space-y-3">
            <h1 className="text-lg lg:text-xl font-bold tracking-wider">
              Our Vision
            </h1>
            <p className="tracking-wider hidden lg:flex text-text text-sm lg:text-base">
              <span onClick={toggleText}>{text}</span>
            </p>
            <p className="tracking-wider lg:hidden text-text text-sm lg:text-base">
              <span onClick={toggleText}>{text2}</span>
            </p>
            {/* {isDesktop || showFullText
                ? text
                : `${text.substring(0, 205)}...`}
              {!isDesktop && (
                <span
                  onClick={toggleText}
                  className="text-blue-500 cursor-pointer"
                >
                  {showFullText ? " Show less" : " Show more"}
                </span>
              )} */}
          </div>
          <div className="space-y-3 mt-7">
            <h1 className="text-lg lg:text-xl font-bold tracking-wider">
              Connect with us
            </h1>
            <div className="flex items-center justify-start space-x-5 mb-14">
              <FaInstagram
                color="#696969"
                fontSize={30}
                className="cursor-pointer"
                onClick={() =>
                  handleNavigate(
                    "https://www.instagram.com/northeastvoyage?igsh=ZGVzM2Y3dDd4ZGdu"
                  )
                }
              />
              <FaWhatsapp
                color="#696969"
                fontSize={30}
                className="cursor-pointer"
                onClick={() => handleNavigate("https://wa.link/fmnp8k")}
              />
              <FaFacebook
                color="#696969"
                fontSize={30}
                className="cursor-pointer"
                onClick={() =>
                  handleNavigate(
                    "https://www.facebook.com/profile.php?id=100088960516989&mibextid=LQQJ4d"
                  )
                }
              />
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <a href="#" className="footer-link">
              Quick Links
            </a>
            <div className="justify-between grid grid-cols-2 mb-10 lg:mb-[5rem]">
              <div className="flex flex-col gap-2 text-[#696969] text-sm lg:text-lg">
                <Link
                  href={"/"}
                  className="cursor-pointer self-start tracking-wider"
                >
                  {/* <div
                    className="cursor-pointer self-start tracking-wider"
                    onClick={() => handleNavigation("/")}
                  > */}
                  Home
                  {/* </div> */}
                </Link>
                <Link
                  href={"/aboutus"}
                  className="cursor-pointer self-start tracking-wider"
                >
                  {/* <div
                    className="cursor-pointer self-start tracking-wider"
                    onClick={() => handleNavigation("/aboutus")}
                  > */}
                  About Us
                  {/* </div> */}
                </Link>
                {/* <Link
                  href={"/"}
                  className="cursor-pointer self-start tracking-wider"
                >
                  Linktree
                </Link> */}
                <Link
                  href={"/cancellationpolicy"}
                  className="cursor-pointer self-start tracking-wider"
                >
                  Cancellation policy
                </Link>
              </div>
              <div className="flex flex-col gap-2 text-[#696969] text-sm lg:text-lg">
                {/* <Link href={"/admin"}>Admin</Link> */}
                <Link
                  href={"/contactus"}
                  className="cursor-pointer self-start tracking-wider"
                >
                  Contact Us
                </Link>
                <Link
                  href={"/privacypolicy"}
                  className="cursor-pointer self-start tracking-wider"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={"/termsandconditions"}
                  className="cursor-pointer self-start tracking-wider"
                >
                  Terms & Conditions
                </Link>
              </div>
            </div>
            <a
              href="#"
              className="footer-text text-center text-xs lg:text-sm text-black tracking-wider"
            >
              @northeastvoyage, All right reserved
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
