"use client"; // Ensure code runs only in client-side environment

import { storage } from "@/app/firebase/firebase-cofig";
import { ref, getDownloadURL } from "firebase/storage";

const getImageUrl = async (path: string): Promise<string | null> => {
  const storageRef = ref(storage, path);
  try {
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image URL: ", error);
    return null;
  }
};

export default getImageUrl;
