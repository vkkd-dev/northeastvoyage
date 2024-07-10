"use client";

import { useState } from "react";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import PageFooter from "@/components/PageFooter";

const PrivacyPolicy = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="max-container padding-container h-[100vh] py-[1rem] lg:py-[4rem]">
        <h1 className="heading text-center font-bold">Privacy Policy</h1>
        <div className="py-[1rem] lg:py-[3rem] px-[1rem] lg:px-[6rem] tracking-wider text-justify leading-relaxed">
          <p>Your privacy is important to us at Northeast Voyage.</p>
          <p>
            We are committed to protecting your personal information and
            ensuring that your experience with us is safe and enjoyable. This
            Privacy Policy outlines how we collect, use, and safeguard your
            data.
          </p>
          <br></br>
          <h2>Information Collection:</h2>
          <p>
            We collect personal information when you use our website, such as
            your name, email, and phone number, primarily through forms and
            cookies.
          </p>
          <br></br>
          <h2>Use of Information:</h2>
          <p>
            The information we collect is used to improve our services, respond
            to inquiries, and personalize your experience on our website.
          </p>
          <br></br>
          <h2>Data Protection:</h2>
          <p>
            We implement a variety of security measures to maintain the safety
            of your personal information.
          </p>
          <br></br>
          <h2>Third-Party Disclosure:</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally
            identifiable information to outside parties without your consent.
          </p>
          <br></br>
          <h2>Cookies:</h2>
          <p>
            Our website uses cookies to enhance user experience and gather
            information about site traffic.
          </p>
          <br></br>
          <p>By using our website, you consent to our Privacy Policy.</p>
        </div>
      </div>
      <PageFooter />
    </>
  );
};

export default PrivacyPolicy;
