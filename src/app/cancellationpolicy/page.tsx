"use client";

import { useState } from "react";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CancellationPolicy = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="max-container padding-container flex flex-col justify-center min-h-[100vh] py-[1rem] lg:py-[4rem]">
        <h1 className="heading text-center font-bold">Cancellation Policy</h1>
        <div className="py-[1rem] lg:py-[3rem] px-[1rem] lg:px-[13rem] tracking-wider text-justify leading-relaxed">
          <p>At Northeast Voyage, we understand that plans can change.</p>
          <p>
            Our cancellation policy is designed to be fair and transparent,
            ensuring clarity for both our travelers and our team.
          </p>
          <br></br>
          <h2>Cancellation by Traveler:</h2>
          <p>
            If you need to cancel your trip, please notify us as soon as
            possible. Cancellations made:
          </p>
          <ul>
            <li>
              <strong>More than 30 days</strong> before the trip start date will
              receive a full refund.
            </li>
            <li>
              <strong>15-30 days</strong> before the trip start date will
              receive a 50% refund.
            </li>
            <li>
              <strong>Less than 15 days</strong> before the trip start date will
              not be eligible for a refund.
            </li>
          </ul>
          <br></br>
          <h2>Cancellation by Northeast Voyage:</h2>
          <p>
            In the unlikely event that we need to cancel a trip, we will offer
            you a full refund or an alternative trip of equal value.
          </p>
          <br></br>
          <h2>Refund Process:</h2>
          <p>
            Refunds will be processed within 10-15 business days to the original
            payment method used at the time of booking.
          </p>
          <p>
            We strive to ensure your satisfaction and will work with you to
            address any concerns related to cancellations and refunds.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CancellationPolicy;
