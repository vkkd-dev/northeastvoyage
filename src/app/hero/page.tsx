"use client"; // Ensure code runs only in client-side environment

import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getImageUrl from "@/hooks/getImageUrl";
import { useEffect, useRef, useState } from "react";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase-cofig";
import { SiTicktick } from "react-icons/si";
import { MdErrorOutline } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import { ImSpinner2 } from "react-icons/im";

const HeroPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchImageUrl = async () => {
      const url = await getImageUrl("hero/currentImage"); // Use a constant path for the current image
      setImageUrl(url);
    };

    fetchImageUrl();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setPreviewUrl(URL.createObjectURL(event.target.files[0])); // Browser API used here
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      toast({
        description: (
          <div className="flex items-center gap-2 ">
            <MdErrorOutline size={20} />
            <p>Image not found!</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
      return;
    }

    const currentImageRef = ref(storage, "hero/currentImage");

    try {
      await uploadBytes(currentImageRef, selectedFile);

      const newImageUrl = await getImageUrl("hero/currentImage");
      setImageUrl(newImageUrl);

      URL.revokeObjectURL(previewUrl!);
      setPreviewUrl(null);
      setSelectedFile(null);

      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Hero Image Updated</p>
          </div>
        ),
        className: "bg-black text-white font-bold",
      });
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast({
        description: (
          <div className="flex items-center gap-2 font-bold">
            <SiTicktick size={20} />
            <p>Error updating image</p>
          </div>
        ),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black flex">
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Hero" />
        <div className="flex flex-col gap-10 items-center justify-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-svw lg:max-w-4xl max-h-svh rounded-lg"
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Hero"
              className="w-svw lg:max-w-4xl max-h-svh rounded-lg"
            />
          ) : (
            <ImSpinner2
              height={30}
              width={30}
              className="animate-spin self-center text-center mt-4"
            />
          )}
          <Input
            type="file"
            className="hidden"
            ref={imgRef}
            onChange={(e) => handleFileChange(e)}
          />
          <div className="flex items-center gap-5">
            <Button
              className="text-white font-bold gap-2"
              onClick={() => imgRef.current?.click()} // Optional chaining used here
            >
              <MdOutlinePhotoSizeSelectActual size={20} />
              Change Image
            </Button>
            {previewUrl && (
              <Button
                className="text-white font-bold gap-2"
                onClick={handleUpload}
              >
                <GiConfirmed size={20} />
                Confirm
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
