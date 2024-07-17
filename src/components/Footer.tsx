"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

function Footer() {
  const [showFullText, setShowFullText] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const router = useRouter();

  const text = `At Northeast Voyage, our vision is to promote unparalleled, authentic, and sustainable travel experiences in Northeast India. We aspire to champion eco-friendly practices and support local communities, ensuring that our operations benefit the environment and the people who call Northeast India home. We aim to set the standard for excellence in the travel industry through our constant commitment to quality, safety, and personalized service.`;

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const handleNavigation = (route: any) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col justify-end bg-secondary h-[38rem] mt-[10rem]">
      <div className="absolute left-[50%] translate-x-[-50%] w-[90%] pt-[2rem] lg:pt-[4rem] pb-[1rem] mb-[2rem] lg:mb-[4rem] bg-white rounded-2xl border-2 border-[#0DB295]">
        <div className="w-[85%] mx-auto items-center">
          <div className="space-y-3">
            <h1 className="text-xl font-bold tracking-wider">Our Vision</h1>
            <p className="tracking-wider">
              {isDesktop || showFullText
                ? text
                : `${text.substring(0, 205)}...`}
              {!isDesktop && (
                <span
                  onClick={toggleText}
                  className="text-blue-500 cursor-pointer"
                >
                  {showFullText ? " Show less" : " Show more"}
                </span>
              )}
            </p>
          </div>
          <div className="space-y-3 mt-7">
            <h1 className="text-xl font-bold tracking-wider">
              Connect with us
            </h1>
            <div className="flex items-center justify-start space-x-5 mb-14">
              <FaInstagram color="#696969" fontSize={30} />
              <FaWhatsapp color="#696969" fontSize={30} />
              <FaYoutube color="#696969" fontSize={30} />
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <a href="#" className="footer-link text-black tracking-wider">
              Quick Links
            </a>
            <div className="justify-between grid grid-cols-2 mb-10 lg:mb-[5rem]">
              <div className="flex flex-col gap-2 text-[#696969] lg:text-lg">
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/")}
                >
                  Home
                </div>
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/aboutus")}
                >
                  About Us
                </div>
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/")}
                >
                  Linktree
                </div>
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/cancellationpolicy")}
                >
                  Cancellation policy
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[#696969] lg:text-lg">
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/admin")}
                >
                  Admin
                </div>
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/contactus")}
                >
                  Contact Us
                </div>
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/privacypolicy")}
                >
                  Privacy Policy
                </div>
                <div
                  className="cursor-pointer self-start tracking-wider"
                  onClick={() => handleNavigation("/termsandconditions")}
                >
                  Terms & Conditions
                </div>
              </div>
            </div>
            <a
              href="#"
              className="footer-text text-center text-sm lg:text-lg text-black tracking-wider"
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
