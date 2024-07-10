"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosRemoveCircle } from "react-icons/io";
import { useToast } from "@/components/ui/use-toast";
import { SiTicktick } from "react-icons/si";
import { LuClock10 } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";
import { firestore, storage } from "@/app/firebase/firebase-cofig";

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  overview: string;
}

const TripsPage = () => {
  const [tripsData, setTripsData] = useState<Trip[]>([]);
  const [formData, setFormData] = useState({
    city: "",
    description: "",
    duration: "",
    name: "",
    price: "",
    overview: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTripId, setEditTripId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteTripId, setDeleteTripId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setIsFetching(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "trips"));
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Trip[];

      // Fetch download URLs for images from Firebase Storage
      const tripsWithImages = await Promise.all(
        trips.map(async (trip) => {
          const imageUrl = await getDownloadURL(ref(storage, trip.image));
          return { ...trip, image: imageUrl };
        })
      );

      setTripsData(tripsWithImages);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast({
        description: (
          <div className="flex items-center gap-2 font-bold">
            <SiTicktick size={20} />
            <p>Error fetching document</p>
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.city === "" ||
      formData.description === "" ||
      formData.duration === "" ||
      formData.name === "" ||
      formData.price === "" ||
      formData.overview === "" ||
      imageFile === null
    ) {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <MdErrorOutline size={20} />
            <p>Fill all the fields</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
      return;
    }
    try {
      setIsLoading(true);
      let imageUrl = formData.image;
      if (imageFile) {
        const storageRef = ref(storage, `trips/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(firestore, "trips"), {
        city: formData.city,
        description: formData.description,
        duration: formData.duration,
        name: formData.name,
        price: formData.price,
        overview: formData.overview,
        image: imageUrl,
      });

      setTripsData((prevData) => [
        ...prevData,
        { id: docRef.id, ...formData, image: imageUrl },
      ]);

      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>New Trip Added</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    } catch (error) {
      console.error("Error adding trip:", error);
      toast({
        description: (
          <div className="flex items-center gap-2 font-bold">
            <SiTicktick size={20} />
            <p>Error adding document</p>
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setFormData({
        city: "",
        description: "",
        duration: "",
        name: "",
        price: "",
        overview: "",
        image: "",
      });
      setImageFile(null);
      setPreviewImage(null);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTripId) return;
    try {
      await deleteDoc(doc(firestore, "trips", deleteTripId));
      setTripsData(tripsData.filter((trip) => trip.id !== deleteTripId));
      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Trip Removed</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast({
        description: (
          <div className="flex items-center gap-2 font-bold">
            <SiTicktick size={20} />
            <p>Error deleting trip</p>
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setShowConfirmDialog(false);
      setDeleteTripId(null);
    }
  };

  const openConfirmDialog = (id: string) => {
    setDeleteTripId(id);
    setShowConfirmDialog(true);
  };

  const openEditModal = (trip: Trip) => {
    setEditTripId(trip.id);
    setFormData({
      city: trip.city,
      description: trip.description,
      duration: trip.duration,
      name: trip.name,
      price: trip.price,
      overview: trip.overview,
      image: trip.image,
    });
    setPreviewImage(trip.image); // Set initial preview image
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditTripId(null);
    setFormData({
      city: "",
      description: "",
      duration: "",
      name: "",
      price: "",
      overview: "",
      image: "",
    });
    setPreviewImage(null);
    setEditModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        const storageRef = ref(storage, `trips/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(firestore, "trips", editTripId!), {
        city: formData.city,
        description: formData.description,
        duration: formData.duration,
        name: formData.name,
        price: formData.price,
        overview: formData.overview,
        image: imageUrl,
      });

      // Update local state with updated data
      setTripsData((prevData) =>
        prevData.map((item) =>
          item.id === editTripId
            ? {
                id: item.id,
                city: formData.city,
                description: formData.description,
                duration: formData.duration,
                name: formData.name,
                price: formData.price,
                overview: formData.overview,
                image: imageUrl,
              }
            : item
        )
      );
      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Trip Updated</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
      closeEditModal();
    } catch (error) {
      console.error("Error updating trip:", error);
      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Error updating document</p>
          </div>
        ),
        variant: "destructive",
      });
    }
  };

  const truncateText = (text: string) => {
    if (text.length <= 100) return text;
    return text.slice(0, 100) + "...";
  };

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Trips" />
        <div className="container mx-auto p-4">
          {/* Form to add new trip */}
          <form
            onSubmit={handleSubmit}
            className="mb-4 border px-10 pt-6 pb-3 rounded-lg"
            encType="multipart/form-data"
          >
            <div className="flex flex-col gap-4 mb-4">
              <h1 className="text-lg font-semibold">Add New Trip</h1>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
              />

              {/* Description Textarea */}
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
                rows={4}
              />

              {/* Duration Input */}
              <input
                type="text"
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
              />

              {/* City Input */}
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
              />

              {/* Price Input */}
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
              />

              {/* Overview Textarea */}
              <textarea
                placeholder="Overview"
                value={formData.overview}
                onChange={(e) =>
                  setFormData({ ...formData, overview: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
                rows={4}
              />

              {/* Image Input */}
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="py-1 rounded"
                />
                {imageFile && (
                  <span className="text-sm text-gray-500">
                    {imageFile.name}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 self-start rounded hover:bg-blue-600 transition duration-200"
              >
                Add Trip
              </Button>
            </div>
          </form>

          {isFetching && (
            <div className="flex justify-center items-center mt-4">
              <ImSpinner2
                height={24}
                width={24}
                className="animate-spin self-center text-center mt-4"
              />
            </div>
          )}

          {tripsData.length === 0 && !isFetching && (
            <h1 className="text-center">No trips found.</h1>
          )}

          {/* List of trips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!isFetching &&
              tripsData.map((trip) => (
                <div
                  key={trip.id}
                  className="border border-gray-300 rounded p-2"
                >
                  <div className="relative w-full h-40 mb-2 overflow-hidden">
                    <Image
                      src={trip.image}
                      alt={trip.name}
                      width={300}
                      height={200}
                      className="rounded"
                    />
                  </div>
                  <div className="flex flex-col mb-2 gap-2">
                    <h2 className="text-lg font-bold">{trip.name}</h2>
                    <h2 className="text-sm font-semibold">{trip.city}</h2>
                    <h2 className="text-sm font-semibold flex items-center gap-1">
                      <LuClock10 /> {trip.duration}
                    </h2>
                    <h2 className="text-sm font-semibold flex items-center gap-1">
                      <RiPriceTag3Line />₹{trip.price}
                    </h2>
                    <p>{truncateText(trip.description)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(trip)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200 flex items-center gap-1"
                    >
                      <BiSolidEditAlt />
                      Edit
                    </button>
                    <button
                      onClick={() => openConfirmDialog(trip.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200 flex items-center gap-1"
                    >
                      <IoIosRemoveCircle />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Edit Modal */}
          {editModalOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded w-full sm:w-96">
                <h2 className="text-xl font-bold mb-4">Edit Trip</h2>
                <div className="flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title" className="font-semibold">
                      Title
                    </Label>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="px-2 py-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="city" className="font-semibold">
                      City
                    </Label>
                    <Input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="px-2 py-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="description" className="font-semibold">
                      Description
                    </Label>
                    <textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="px-2 py-1 border border-gray-300 rounded"
                      rows={4}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="description" className="font-semibold">
                      Duration
                    </Label>
                    <Input
                      type="text"
                      placeholder="Duration"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="px-2 py-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="price" className="font-semibold">
                      Price
                    </Label>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="px-2 py-1 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="description" className="font-semibold">
                      Overview
                    </Label>
                    <textarea
                      placeholder="Description"
                      value={formData.overview}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          overview: e.target.value,
                        })
                      }
                      className="px-2 py-1 border border-gray-300 rounded"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2 items-center">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="rounded"
                    />
                    {previewImage && (
                      <div className="relative w-16 h-16">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          width={100}
                          height={50}
                          // objectFit="cover"
                          className="rounded"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={closeEditModal}
                      className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 transition duration-200 ml-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Dialog */}
          {showConfirmDialog && (
            <ConfirmDialog
              isOpen={showConfirmDialog}
              onConfirm={handleDelete}
              onCancel={() => setShowConfirmDialog(false)}
              message="Are you sure you want to delete this trip?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
