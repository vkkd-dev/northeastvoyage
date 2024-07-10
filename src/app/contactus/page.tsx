"use client";

import { useState } from "react";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";

const ContactUs = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="max-container padding-container h-[100vh] py-[1rem] lg:py-[4rem]">
        <h1 className="heading text-center font-bold">Contact Us</h1>
        <div className="py-[1rem] lg:py-[3rem] px-[1rem] lg:px-[18rem] tracking-wider text-justify leading-relaxed">
          <p>We&apos;d love to hear from you!</p>
          <br></br>
          <p>
            If you have any questions, suggestions, or need assistance, please
            don&apos;t hesitate to reach out to us. Our dedicated team is here
            to help you plan your perfect trip to Northeast India.
          </p>
          <br></br>
          <p>
            <strong>Phone:</strong> [Your Contact Number]
          </p>
          <br></br>
          <p>
            <strong>Email:</strong> [Your Contact Email]
          </p>
          <br></br>
          <p>
            <strong>Address:</strong> [Your Address]
          </p>
          <br></br>
          <p>
            Alternatively, you can fill out the form on our website, and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </div>
      <PageFooter />
    </>
  );
};

export default ContactUs;
