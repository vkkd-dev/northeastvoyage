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
      <div className="max-container padding-container flex flex-col justify-center min-h-[100vh] pt-[15vh] lg:pt-[10vh]">
        <h1 className="page-heading">
          CANCELLATION POLICY
        </h1>
        <div className="py-[1rem] lg:py-[3rem] w-[90%] mx-auto tracking-wider leading-relaxed">
          <h2 className="font-bold text-lg">
            NO REFUND SHALL BE MADE WITH RESPECT TO THE INITIAL BOOKING AMOUNT
            FOR ANY OF THE CANCELLATIONS. HOWEVER,
          </h2>
          <ul className="m-5 space-y-2">
            <li>
              ● Cancel your trip before 30 days, 75% refund of total amount.
            </li>
            <li>
              ● Cancel your trip before 15-30 days, 50% refund of total amount.
            </li>
            <li>
              ● Cancel your trip before 10-15 days, 25% refund of total amount.
            </li>
            <li>
              ● Cancel your trip before 7-10 days, 10% refund of total amount.
            </li>
            <li>● No refund within 7 days.</li>
            <li>● The process of refund will take around 7-10 days</li>
          </ul>
          <p className="font-bold text-lg">
            In the case of unforeseen weather conditions or government
            restrictions, certain activities may be cancelled and in such cases,
            the operator will try his best to provide an alternate feasible
            activity. However, no refund will be provided for the same
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CancellationPolicy;
