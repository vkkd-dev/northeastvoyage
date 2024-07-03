import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "./ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "./ui/icons";
import { SiTicktick } from "react-icons/si";
import { MdErrorOutline } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase-cofig";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  // e.preventDefault();
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
      // console.log(inputs.name);
      // console.log(inputs.email);
      // console.log(inputs.phone);

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
      onClose();
      setInputs({
        name: "",
        email: "",
        phone: "",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl z-50">
        <SheetClose onClick={onClose} />
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
            alt="shhet image"
            src="/sheet.png"
            className="mx-auto"
          />
          <div className="w-full bg-[#65A78E66] px-5 py-8 rounded-2xl flex flex-col gap-5">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-5">
                <Input
                  name="name"
                  placeholder="Enter you name"
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
                  placeholder="Enter you email"
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
                  placeholder="Enter you phone number"
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
  );
};

export default BottomSheet;
