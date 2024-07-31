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
      <div className="max-container page-container flex flex-col justify-center min-h-[100vh] pt-[15vh]">
        <h1 className="page-heading">TERMS & CONDITIONS</h1>
        <ul className="py-[1rem] lg:py-[3rem] w-[90%] mx-auto tracking-wider text-justify content list-disc list-inside space-y-2">
          <li>For bookings, 50% of the total amount is due in advance.</li>
          <li>
            Full Payment of the trip cost must be completed before the trip
            begins. Pending Payments may eventually lead to the cancellation of
            the trip.
          </li>
          <li>
            We are not responsible in case of any lost or misplaced or damage of
            your luggages/belongings.
          </li>
          <li>
            There would be no refund for the roadblocks and due to natural
            disasters. The alternate accommodation cost due to the same should
            be bear by the person directly.
          </li>
          <li>No changes in the date of travel once booked.</li>
          <li>
            All tourists are advised to take comprehensive Insurance on their
            own.
          </li>
          <li>The IDs shall all be verified before boarding.</li>
          <li>
            No refunds shall be made towards any inclusion(s) not availed by the
            Client.
          </li>
          <li>
            Drinking & Smoking are strictly prohibited along the tour due to
            health & safety concerns.
          </li>
          <li>
            Northeast Voyage shall not be responsible for any delays or
            alterations in the program or indirectly incurred expenses in cases
            such as Natural Hazards, accidents, breakdown of machinery, weather
            conditions, landslides, political closure, or any untoward
            incidents.
          </li>
          <li>
            The organizers reserve the rights to evict any camper anytime
            without any refund if his/her actions violates any camp rules or
            incase of any misbehavior with other co-travelers.
          </li>
          <li>
            Northeast Voyage is not responsible for your whereabouts or safety
            if you are outside the camping premises. Any Loss to the camping
            materials such as tents, pillows, mattress or any property belonging
            to the campsite will is subject to full payment of Product MRP.
          </li>
          <li>
            Northeast Voyage is not responsible for any delay in reaching the
            destination due to traffic, sightseeing/activities of the day may
            get cancelled if we don&apos;t reach the destination on time.
          </li>
          <li>
            Trip organizer/coordinator has complete right to change the
            itinerary as per on the spot condition. Please cooperate with us in
            keeping the environment clean and safe
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
