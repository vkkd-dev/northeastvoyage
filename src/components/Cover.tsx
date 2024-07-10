import { memo, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useToast } from "./ui/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { SiTicktick } from "react-icons/si";
import { MdErrorOutline } from "react-icons/md";
import { firestore } from "@/app/firebase/firebase-cofig";

const Cover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({ name: "", email: "", phone: "" });
  const { toast } = useToast();

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const openSheet = useCallback(() => setIsOpen(true), []);
  const closeSheet = useCallback(() => {
    setIsOpen(false);
    setInputs({
      name: "",
      email: "",
      phone: "",
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
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

  const onSubmit = async () => {
    if (inputs.name === "" || inputs.email === "" || inputs.phone === "") {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <MdErrorOutline size={20} />
            <p>All fields must be fielded</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
      return;
    }
    try {
      const timestamp = getISTTimestamp();
      await setDoc(doc(firestore, "queries", timestamp), {
        name: inputs.name,
        email: inputs.email,
        phone: inputs.phone,
        timestamp,
      });

      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Response Submitted</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    } catch (error) {
      console.log(error);
    } finally {
      closeSheet();
    }
  };

  return (
    <div className="relative w-full h-[20vh] lg:h-[55vh]">
      <div className="absolute top-0 left-0 w-full h-full opacity-50"></div>
      <div
        id="hero"
        className="bg-cover bg-center bg-no-repeat h-full w-full z-10"
        style={{ backgroundImage: `url(/cover.jpeg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-gray-800" />

        <div className="absolute z-20 w-full h-full top-5 lg:top-16 left-5 lg:left-36 lg:space-y-4">
          <h1 className="font-extrabold text-white text-xl lg:text-5xl">
            Dreaming of your next Adventure
          </h1>
          <p className="text-white lg:text-4xl font-light"> Hits us up!</p>
        </div>
        <Button
          onClick={openSheet}
          className="absolute z-50 bottom-5 lg:bottom-14 left-5 lg:left-36 bg-[#0DB295] rounded-full text-xs lg:text-sm text-white px-8 py-7 tracking-widest cursor-pointer"
        >
          Connect Now
        </Button>
        {isDesktop ? (
          <Dialog open={isOpen} onOpenChange={closeSheet}>
            <DialogContent className="rounded-t-3xl z-50">
              <DialogClose onClick={closeSheet} />
              <DialogHeader>
                <DialogTitle className="font-bold">
                  Where do you want to go next?
                </DialogTitle>
                <DialogDescription>
                  Make your move, fill out your details now
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-5">
                <Image
                  width={150}
                  height={200}
                  alt="sheet image"
                  src="/sheet.png"
                  className="mx-auto"
                />
                <div className="w-full bg-[#65A78E66] px-5 py-8 rounded-2xl flex flex-col gap-5">
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-5">
                      <Input
                        name="name"
                        placeholder="Enter your name"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={inputs.name}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Input
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={inputs.email}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Input
                        name="phone"
                        placeholder="Enter your phone number"
                        type="number"
                        autoCapitalize="none"
                        autoComplete="tel"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={inputs.phone}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                    </div>
                  </form>
                  <Button
                    onClick={onSubmit}
                    type="submit"
                    className="bg-[#FFD600] rounded-full w-full"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Sheet open={isOpen} onOpenChange={closeSheet}>
            <SheetContent side="bottom" className="rounded-t-3xl z-50">
              <SheetClose onClick={closeSheet} />
              <SheetHeader>
                <SheetTitle className="font-bold">
                  Where do you want to go next?
                </SheetTitle>
                <SheetDescription>
                  Make your move, fill out your details now
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col items-center gap-5">
                <Image
                  width={150}
                  height={200}
                  alt="sheet image"
                  src="/sheet.png"
                  className="mx-auto"
                />
                <div className="w-full bg-[#65A78E66] px-5 py-8 rounded-2xl flex flex-col gap-5">
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-5">
                      <Input
                        name="name"
                        placeholder="Enter your name"
                        type="text"
                        autoCapitalize="none"
                        autoComplete="name"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={inputs.name}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Input
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={inputs.email}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                      <Input
                        name="phone"
                        placeholder="Enter your phone number"
                        type="number"
                        autoCapitalize="none"
                        autoComplete="tel"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={inputs.phone}
                        onChange={handleChange}
                        className="rounded-full"
                      />
                    </div>
                  </form>
                  <Button
                    onClick={onSubmit}
                    type="submit"
                    className="bg-[#FFD600] rounded-full w-full"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
};

export default Cover;
