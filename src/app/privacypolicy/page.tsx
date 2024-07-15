"use client";

import { useState } from "react";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const PrivacyPolicy = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);
  const router = useRouter();

  const handleWebsite = () => {
    window.open("/", "_blank");
  };

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
        <h1 className="page-heading">PRIVACY POLICY</h1>
        <div className="py-[1rem] lg:py-[3rem] w-[90%] mx-auto tracking-wider text-justify leading-relaxed">
          <h2 className="font-bold text-lg">
            Privacy Policy for Northeast Voyage
          </h2>
          <p className="text-lg mt-3">
            Thank you for visiting Northeast Voyage. We are committed to
            protecting your privacy and ensuring the security of your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website
            or use our services.
          </p>
          <ul>
            <li className="text-lg font-bold mt-6 mb-2">
              1. Information We Collect
            </li>
            We may collect various types of information from you, including:
            <ul className="mt-2">
              <li>
                <span className="font-bold">● Personal Information:</span> Name,
                email address, phone number, postal address, and other similar
                data when you make a booking or inquiry.
              </li>
            </ul>
            <li className="text-lg font-bold mt-6 mb-2">
              2. How We Use Your Information
            </li>
            We use the information we collect for various purposes, including
            to:
            <ul className="mt-2">
              <li>● Process your bookings and payments.</li>
              <li>
                ● Communicate with you regarding your bookings, inquiries, or
                promotional offers.
              </li>
              <li>● Improve our website and services.</li>
              <li>
                ● Analyze trends and user interactions to enhance user
                experience.
              </li>
              <li>● Comply with legal obligations.</li>
            </ul>
            <li className="text-lg font-bold mt-6 mb-2">
              3. Information Sharing
            </li>
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties unless we provide you with advance
            notice, except as described below:
            <ul className="mt-2 space-y-2">
              <li>
                <span className="font-bold">● Service Providers:</span>
                We may share your information with trusted third-party service
                providers who assist us in operating our website, conducting our
                business, or servicing you.
              </li>
              <li>
                <span className="font-bold">● Legal Compliance:</span>
                We may disclose your information when we believe release is
                appropriate to comply with the law, enforce our site policies,
                or protect ours or others&apos; rights, property, or safety.
              </li>
            </ul>
            <li className="text-lg font-bold mt-6 mb-2">
              4. Security of Your Information
            </li>
            We implement a variety of security measures to maintain the safety
            of your personal information when you make a booking or enter,
            submit, or access your personal information.
            <li className="text-lg font-bold mt-6 mb-2">
              5. Third-Party Links
            </li>
            Occasionally, at our discretion, we may include or offer third-party
            products or services on our website. These third-party sites have
            separate and independent privacy policies. We have no responsibility
            or liability for the content and activities of these linked sites.
            <li className="text-lg font-bold mt-6 mb-2">6. Your Consent</li>
            By using our website and providing us with your personal
            information, you consent to our Privacy Policy.
            <li className="text-lg font-bold mt-6 mb-2">
              7. Changes to Our Privacy Policy
            </li>
            We reserve the right to modify this Privacy Policy at any time. If
            we make material changes to this policy, we will notify you here, by
            email, or by means of a notice on our home page.
            <li className="text-lg font-bold mt-6 mb-2">8. Contact Us</li>
            If you have any questions regarding this Privacy Policy, you may
            contact us using the information below:
          </ul>
          <div className="flex flex-col gap-3 mt-6 font-bold">
            <div className="cursor-pointer self-start" onClick={handleWebsite}>
              Northeast Voyage
            </div>
            <div className="cursor-pointer self-start" onClick={handleAddress}>
              Dhing, Nagaon, Assam, 782123
            </div>
            <div className="cursor-pointer self-start" onClick={handleEmail}>
              info@thenortheastvoyage.com
            </div>
            <div className="cursor-pointer self-start" onClick={handlePhone}>
              8099451325
            </div>
          </div>
          <h2 className="text-lg font-bold mt-4 mb-2">Conclusion</h2>
          <p>
            Your privacy is important to us. By using our website and services,
            you acknowledge that you have read and understood this Privacy
            Policy and agree to the collection, use, and disclosure of your
            information as described herein.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
