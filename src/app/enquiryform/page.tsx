"use client";
import { ChangeEvent, SyntheticEvent, useState } from "react";
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
import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";

const EnquiryForm = () => {
  const [nav, setNav] = useState(false);
  const openNavbar = () => setNav(true);
  const closeNavbar = () => setNav(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    name: "",
    number: "",
    email: "",
    place: "",
    people: "",
    message: "",
    type: "",
    month: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    if (
      inputs.name === "" ||
      inputs.email === "" ||
      inputs.place === "" ||
      inputs.message === "" ||
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
        place: "",
        message: "",
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
      <div className="max-container padding-container flex flex-col justify-center min-h-[100vh] py-[15vh]">
        <div className="bg-white rounded-lg border-2 border-secondary mt-10 p-4 lg:p-10 w-[100%] lg:w-[85%] mx-auto">
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
                <Label htmlFor="email">Place you want to visit</Label>
                <Input
                  name="place"
                  placeholder="...."
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={inputs.place}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Your message</Label>
                <textarea
                  placeholder="..."
                  value={inputs.message}
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      message: e.target.value,
                    })
                  }
                  className="px-2 py-1 border border-gray-300 rounded"
                  rows={4}
                />
              </div>

              <div className="grid gap-3 mt-2">
                <Label>Number of people interested for the trip?</Label>
                <RadioGroup
                  className="border-2 border-gray-100 rounded-lg p-3 space-y-3 text-start"
                  value={inputs.people}
                  onValueChange={(value) => handleRadioChange("people", value)}
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
                      id="r6"
                    />
                    <Label htmlFor="r6">Group Trips/Fixed Departures</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Customized/Private Trips" id="r7" />
                    <Label htmlFor="r7">Customized/Private Trips</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4 mt-2">
                <Label>Any tentative/finalised month for your trip?</Label>
                <Select
                  value={inputs.month}
                  onValueChange={(value) => handleSelectChange("month", value)}
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
      <Footer />
    </>
  );
};

export default EnquiryForm;
