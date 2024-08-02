"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/app/firebase/firebase-cofig";

const Cover = () => {
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHeroImage = async () => {
    setIsLoading(true);
    try {
      const heroImageRef = ref(storage, "cover/currentImage");
      const url = await getDownloadURL(heroImageRef);
      setCoverImageUrl(url);
    } catch (error) {
      console.error("Error fetching hero image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImage();
  }, []);
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/enquiryform");
  };

  return (
    <div className="relative w-full h-[25vh] lg:h-[55vh] top-margin">
      <div className="absolute top-0 left-0 w-full h-full opacity-50"></div>
      <div
        id="hero"
        className="bg-cover bg-center bg-no-repeat h-full w-full z-10"
        style={{ backgroundImage: `url(${coverImageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-gray-800" />

        <div className="absolute z-20 w-full h-full top-5 lg:top-16 left-5 lg:left-36 lg:space-y-4">
          <h1 className="font-extrabold text-white text-xl lg:text-5xl">
            Dreaming of your next Adventure
          </h1>
          <p className="text-white lg:text-4xl font-light"> Hits us up!</p>
        </div>
        <Button
          onClick={handleNavigate}
          className="absolute bottom-5 lg:bottom-14 left-5 lg:left-36 bg-[#0DB295] rounded-full text-xs lg:text-sm text-white lg:px-8 lg:py-7 tracking-widest z-40"
        >
          Enquiry Now
        </Button>
        {/* {isDesktop ? (
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
        )} */}
      </div>
    </div>
  );
};

export default Cover;
