"use client";

import { useState } from "react";
import MobileNavbar from "@/components/MobileNavbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-cofig";

const ContactUs = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);

  const [inputs, setInputs] = useState({
    name: "",
    number: "",
    email: "",
    people: "",
    type: "",
    month: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const getISTTimestamp = () => {
    const currentTime = new Date();
    const utcOffset = currentTime.getTimezoneOffset();
    const istOffset = 330; // IST is UTC+5:30, which is 330 minutes ahead of UTC
    const istTime = new Date(
      currentTime.getTime() + (istOffset - utcOffset) * 60000
    );
    return istTime.toISOString(); // or istTime.toLocaleString() if you prefer
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (
      inputs.name === "" ||
      inputs.email === "" ||
      inputs.number === "" ||
      inputs.people === "" ||
      inputs.type === "" ||
      inputs.month === ""
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
      await setDoc(doc(firestore, "contact_form", timestamp), {
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
        people: "",
        type: "",
        month: "",
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
          <div className="bg-white rounded-lg border-2 border-secondary mt-10 p-4 lg:p-10 w-[100%] lg:w-[85%] mx-auto">
            <h2 className="text-xl font-bold text-secondary mb-5">
              Get In Touch
            </h2>
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

                <div className="grid gap-3 mt-2">
                  <Label>Number of people interested for the trip?</Label>
                  <RadioGroup
                    className="border-2 border-gray-100 rounded-lg p-3 space-y-3 text-start"
                    value={inputs.people}
                    onValueChange={(value) =>
                      handleRadioChange("people", value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="I am planning Solo" id="r1" />
                      <Label htmlFor="r1">I am planning Solo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Looking for a Honeymoon/Couple Trip"
                        id="r2"
                      />
                      <Label htmlFor="r2">
                        Looking for a Honeymoon/Couple Trip
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2-4 Pax" id="r3" />
                      <Label htmlFor="r3">2-4 Pax</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5-7 Pax" id="r4" />
                      <Label htmlFor="r4">5-7 Pax</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="7+ Pax" id="r5" />
                      <Label htmlFor="r5">7+ Pax</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-4 mt-2">
                  <Label>Type of trip you want to take?</Label>
                  <RadioGroup
                    className="border-2 border-gray-100 rounded-lg p-3 space-y-3"
                    value={inputs.type}
                    onValueChange={(value) => handleRadioChange("type", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Group Trips/Fixed Departures"
                        id="r1"
                      />
                      <Label htmlFor="r1">Group Trips/Fixed Departures</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Customized/Private Trips"
                        id="r2"
                      />
                      <Label htmlFor="r2">Customized/Private Trips</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-4 mt-2">
                  <Label>Any tentative/finalised month for your trip?</Label>
                  <Select
                    value={inputs.month}
                    onValueChange={(value) =>
                      handleSelectChange("month", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Month of travel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="February">February</SelectItem>
                      <SelectItem value="March">March</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="May">May</SelectItem>
                      <SelectItem value="June">June</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="August">August</SelectItem>
                      <SelectItem value="September">September</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                      <SelectItem value="November">November</SelectItem>
                      <SelectItem value="December">December</SelectItem>
                    </SelectContent>
                  </Select>
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
