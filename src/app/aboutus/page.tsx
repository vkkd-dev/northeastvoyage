"use client";

import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import AboutUsCard from "@/components/AboutUsCard";

const AboutUsData = [
  {
    image: "/aboutus/nayajraj.jpg",
    name: "Nayaj Raj",
    designation: "Founder",
    url: "https://www.instagram.com/raw.saikia?igsh=cW4yYmNrdHI3M2Ro",
  },
  {
    image: "/aboutus/rimichetri.jpg",
    name: "Rimi Chetri",
    designation: "Co-founder",
    url: "https://www.instagram.com/chasingcorners_?igsh=MXRqdjN5bWk1cjdldw==",
  },
  {
    image: "/aboutus/rajakankan.jpg",
    name: "Raja Kankan",
    designation: "Manager",
    url: "https://www.instagram.com/storiesbyraja_?igsh=MXJnamprZ2Zla3B5YQ==",
  },
  {
    image: "/aboutus/kapilkumar.jpg",
    name: "Kapil Kumar",
    designation: "Trip operator",
    url: "https://www.instagram.com/moi_kapil_?igsh=MXFtbGYyeGd3ZXBhdQ==",
  },
];

const AboutUs = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="max-container page-container flex flex-col justify-center min-h-[100vh] pt-[15vh]">
        <h1 className="page-heading">ABOUT US</h1>
        <div className="pt-[2rem] lg:pt-[3rem] w-[90%] mx-auto tracking-wider text-justify">
          <p className="sub-heading">Welcome to Northeast Voyage!</p>
          <p className="content">
            We are your ultimate guide to exploring the breathtaking
            destinations of Northeast India. Our mission is to provide you with
            an unforgettable travel experience by offering curated trips that
            showcase the natural beauty, rich culture, and unique heritage of
            this enchanting region. Whether you&apos;re seeking adventure,
            relaxation, or cultural immersion, Northeast Voyage has something
            for every traveler.
          </p>
          <br></br>
          <h2 className="sub-heading">Our Story</h2>
          <p className="content">
            Northeast Voyage was founded by a group of passionate travelers and
            explorers who fell in love with the beauty and diversity of
            Northeast India. We realized that this unique part of the world
            deserved to be shared with others, and thus, Northeast Voyage was
            born. Our team is composed of travel enthusiasts, local experts, and
            dedicated professionals who are committed to making your journey
            memorable.
          </p>
          <br></br>
          <h2 className="sub-heading">Our Mission</h2>
          <p className="content">
            Our mission is to provide exceptional travel experiences that go
            beyond the ordinary. We aim to connect travelers with the hidden
            gems of Northeast India, offering authentic and immersive
            experiences that highlight the region&apos;s rich culture, stunning
            landscapes, and warm hospitality. We believe in sustainable tourism
            that benefits local communities and preserves the natural
            environment for future generations.
          </p>
          <div className="mt-[8rem]">
            <h2 className="font-extrabold text-2xl text-center">
              Meet Our Team: An Exceptional Group of Extraordinary People
            </h2>
            <div className="flex flex-col gap-10 lg:flex-row justify-between items-center mt-[4rem]">
              {AboutUsData.map((data, index) => (
                <AboutUsCard data={data} key={index} />
              ))}
            </div>
          </div>
          {/* <br></br>
          <h2>Why Choose Us:</h2>
          <p>
            At Northeast Voyage, we pride ourselves on our deep knowledge of the
            region and our commitment to personalized service. Here are a few
            reasons why you should choose us for your next adventure:
          </p>
          <br></br>
          <ul>
            <li>
              <strong>Local Expertise:</strong> Our team includes local guides
              and experts who have an intimate understanding of the destinations
              we offer.
            </li>
            <br></br>
            <li>
              <strong>Curated Itineraries:</strong> Our trips are carefully
              crafted to ensure you experience the best of Northeast India, from
              popular attractions to hidden treasures.
            </li>
            <br></br>
            <li>
              <strong>Sustainable Travel:</strong> We promote responsible
              tourism practices that support local communities and minimize
              environmental impact.
            </li>
            <br></br>
            <li>
              <strong>Personalized Service:</strong> We tailor our services to
              meet your individual needs and preferences, ensuring a unique and
              memorable travel experience.
            </li>
            <br></br>
            <li>
              <strong>Customer Satisfaction:</strong> Our travelers&apos;
              happiness is our top priority. We are dedicated to providing
              exceptional customer service and support throughout your journey.
            </li>
          </ul>
          <br></br>
          <h2>Our Services:</h2>
          <p>
            Northeast Voyage offers a range of services to cater to different
            travel styles and preferences:
          </p>
          <br></br>
          <ul>
            <li>
              <strong>Customized Tours:</strong> Personalized itineraries
              designed to match your interests, budget, and schedule.
            </li>
            <br></br>
            <li>
              <strong>Group Tours:</strong> Join like-minded travelers on our
              expertly guided group tours, perfect for making new friends and
              sharing experiences.
            </li>
            <br></br>
            <li>
              <strong>Adventure Travel:</strong> Explore the adventurous side of
              Northeast India with activities such as trekking, rafting, and
              wildlife safaris.
            </li>
            <br></br>
            <li>
              <strong>Cultural Experiences:</strong> Immerse yourself in the
              local culture with visits to traditional villages, festivals, and
              cultural landmarks.
            </li>
            <br></br>
            <li>
              <strong>Eco-Tourism:</strong> Discover the natural beauty of
              Northeast India while supporting conservation efforts and
              sustainable practices.
            </li>
          </ul>
          <br></br>
          <h2>Meet Our Team:</h2>
          <p>
            Our dedicated team of travel professionals is here to ensure your
            journey is smooth and enjoyable. From our knowledgeable guides to
            our friendly customer service representatives, every member of
            Northeast Voyage is committed to providing you with the best
            possible travel experience.
          </p>
          <p>
            <br></br>
            Join us on a journey to discover the hidden gems of Northeast India.
            Let Northeast Voyage be your trusted partner in creating
            unforgettable travel memories.
          </p> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
