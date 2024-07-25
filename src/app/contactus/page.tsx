"use client";

import { useState } from "react";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactUs = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  const handleAddress = () => {
    const address = "Dhing, Nagaon, Assam, 782123";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleEmail = () => {
    const email = "info@thenortheastvoyage.com";
    window.open(`mailto:${email}`, "_blank");
  };

  const handlePhone = () => {
    window.location.href = "tel:+918099451325";
  };

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="max-container padding-container flex flex-col justify-center min-h-[100vh] pt-[15vh]">
        <h1 className="page-heading">CONTACT US</h1>
        <div className="py-[1rem] lg:py-[3rem] w-[95%] lg:w-[90%] mx-auto tracking-wider text-justify leading-relaxed">
          <p>We&apos;d love to hear from you!</p>
          <br></br>
          <p>
            If you have any questions, suggestions, or need assistance, please
            don&apos;t hesitate to reach out to us. Our dedicated team is here
            to help you plan your perfect trip to Northeast India.
          </p>
          <br></br>
          <p onClick={handlePhone} className="cursor-pointer">
            <strong>Phone:</strong> 8099451325
          </p>
          <br></br>
          <p onClick={handleEmail} className="cursor-pointer">
            <strong>Email:</strong> info@thenortheastvoyage.com
          </p>
          <br></br>
          <p onClick={handleAddress} className="cursor-pointer">
            <strong>Address:</strong> Dhing, Nagaon, Assam, 782123
          </p>
          <br></br>
          <p>
            Alternatively, you can fill out the form on our website, and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
