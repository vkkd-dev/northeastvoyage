"use client";

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
import { v4 as uuidv4 } from "uuid";

const HeroPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement | null>(null); // Add type annotation

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
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    // Generate a unique identifier for the new image
    const uniqueImageId = uuidv4();
    // const newImageRef = ref(storage, `hero/${uniqueImageId}`);

    try {
      // Delete the previous image
      // const oldImageRef = ref(storage, "hero/currentImage");
      // await deleteObject(oldImageRef);

      // Upload the new image with the unique identifier
      // await uploadBytes(newImageRef, selectedFile);

      // Update the currentImage reference to point to the new image
      const currentImageRef = ref(storage, "hero/currentImage");
      await uploadBytes(currentImageRef, selectedFile);

      // Get the new image URL and update the state
      const newImageUrl = await getImageUrl("hero/currentImage");
      setImageUrl(newImageUrl);

      // Clean up the preview URL
      URL.revokeObjectURL(previewUrl!);
      setPreviewUrl(null);
      setSelectedFile(null);

      alert("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Error uploading image");
    }
  };

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Hero" />
        <div className="flex flex-col gap-10 items-center justify-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="max-w-4xl h-auto" />
          ) : imageUrl ? (
            <img src={imageUrl} alt="Hero" className="max-w-4xl h-auto" />
          ) : (
            <p>Loading image...</p>
          )}
          <Input
            type="file"
            className="hidden"
            ref={imgRef}
            onChange={(e) => handleFileChange(e)}
          />
          <Button
            className="text-white font-bold gap-2"
            onClick={() => imgRef.current?.click()}
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
  );
};

export default HeroPage;
