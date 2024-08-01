"use client";

import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-cofig";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (
      inputs.name === "" ||
      inputs.email === "" ||
      inputs.number === "" ||
      inputs.message === ""
    ) {
      toast({
        title: "Failed to submit",
        description: "Can't submit empty fields",
        variant: "default",
      });
      return;
    }

    try {
      const timestamp = getISTTimestamp();
      await setDoc(doc(firestore, "contact_us", timestamp), {
        ...inputs,
        timestamp: serverTimestamp(),
      });

      toast({
        title: "Success",
        description: "Form submitted successfully",
        variant: "default",
      });

      setInputs({
        name: "",
        number: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log("error:", error);
      toast({
        title: "Failed to submit",
        description: "Something went wrong",
        variant: "default",
      });
    }

    console.log("inputs:", inputs);
  }

  const getISTTimestamp = () => {
    const currentTime = new Date();
    const utcOffset = currentTime.getTimezoneOffset();
    const istOffset = 330; // IST is UTC+5:30, which is 330 minutes ahead of UTC
    const istTime = new Date(
      currentTime.getTime() + (istOffset - utcOffset) * 60000
    );
    return istTime.toISOString(); // or istTime.toLocaleString() if you prefer
  };

  return (
    <>
      <Navbar nav={nav} openNav={openNavbar} />
      <MobileNavbar nav={nav} closeNav={closeNavbar} />
      <div className="max-container page-container flex flex-col justify-center min-h-[100vh] pt-[15vh] lg:pt-[20vh]">
        <h1 className="page-heading">CONTACT US</h1>
        <div className="py-[1rem] lg:py-[3rem] w-[95%] lg:w-[90%] mx-auto tracking-wider text-justify content">
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

          <div className="bg-white rounded-lg border-2 border-secondary mt-10 lg:mt-20 p-10 w-[100%] lg:w-[85%] mx-auto">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    name="name"
                    placeholder="Josh Smith"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="name"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={inputs.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>WhatsApp Number</Label>
                  <Input
                    name="number"
                    placeholder="+91"
                    type="tel"
                    autoCapitalize="none"
                    autoComplete="tel"
                    autoCorrect="off"
                    max={10}
                    min={10}
                    maxLength={10}
                    minLength={10}
                    disabled={isLoading}
                    value={inputs.number}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    name="email"
                    placeholder="john@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={inputs.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Message</Label>
                  <Input
                    name="message"
                    placeholder="type here..."
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={inputs.message}
                    onChange={handleChange}
                  />
                </div>

                <Button className="w-full text-white font-semibold rounded-lg mt-3">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
