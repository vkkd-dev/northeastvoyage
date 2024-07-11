"use client";

import { useState } from "react";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="max-container padding-container flex flex-col justify-center min-h-[100vh] py-[1rem] lg:py-[4rem]">
        <h1 className="heading text-center font-bold">Terms and Conditions</h1>
        <div className="py-[1rem] lg:py-[3rem] px-[1rem] lg:px-[6rem] tracking-wider text-justify leading-relaxed">
          <p>Welcome to Northeast Voyage!</p>
          <p>
            By accessing or using our website, you agree to comply with and be
            bound by the following terms and conditions. Please read them
            carefully.
          </p>
          <br></br>
          <h2>Use of Website:</h2>
          <p>
            You may use our website for lawful purposes only and in accordance
            with these Terms and Conditions.
          </p>
          <br></br>
          <h2>Intellectual Property:</h2>
          <p>
            All content on this website, including text, graphics, logos, and
            images, is the property of Northeast Voyage and is protected by
            applicable intellectual property laws.
          </p>
          <br></br>
          <h2>User Accounts:</h2>
          <p>
            If you create an account on our website, you are responsible for
            maintaining the confidentiality of your account information and for
            all activities that occur under your account.
          </p>
          <br></br>
          <h2>Bookings and Payments:</h2>
          <p>
            All bookings made through our website are subject to availability
            and confirmation. Payments must be made in accordance with the
            payment terms provided.
          </p>
          <br></br>
          <h2>Cancellations and Refunds:</h2>
          <p>
            Our Cancellation Policy outlines the terms for cancellations and
            refunds.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
