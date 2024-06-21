"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   updateDoc,
// } from "firebase/firestore";
// import { firestore, storage } from "../firebase/firebase-cofig";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";
import { SiTicktick } from "react-icons/si";
import { MdErrorOutline } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosRemoveCircle } from "react-icons/io";
import Image from "next/image";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "@/components/ui/input";

interface Destination {
  id: string;
  alt: string;
  description: string;
  img: string;
}

const ContentPage = () => {
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  const [formData, setFormData] = useState({
    alt: "",
    description: "",
    img: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editDestinationId, setEditDestinationId] = useState<string | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteDestinationId, setDeleteDestinationId] = useState<string | null>(
    null
  );
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  // useEffect(() => {
  //   fetchDestinations();
  // }, []);

  // const fetchDestinations = async () => {
  //   setIsFetching(true);
  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(firestore, "destinations")
  //     );
  //     const destinations = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as Destination[];
  //     setDestinationData(destinations);
  //   } catch (error) {
  //     console.error("Error fetching destinations:", error);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // };

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

  const openEditModal = (destination: Destination) => {
    setEditDestinationId(destination.id);
    setFormData({
      alt: destination.alt,
      description: destination.description,
      img: destination.img,
    });
    setPreviewImage(destination.img); // Set initial preview image
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditDestinationId(null);
    setFormData({ alt: "", description: "", img: "" });
    setPreviewImage(null);
    setEditModalOpen(false);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (
  //     formData.alt === "" ||
  //     formData.description === "" ||
  //     imageFile === null
  //   ) {
  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <MdErrorOutline size={20} />
  //           <p>Fill all the fields</p>
  //         </div>
  //       ),
  //       variant: "destructive",
  //       className: "bg-black text-white",
  //     });
  //     return;
  //   }
  //   try {
  //     let imageUrl = formData.img;
  //     if (imageFile) {
  //       const storageRef = ref(storage, `destinations/${imageFile.name}`);
  //       await uploadBytes(storageRef, imageFile);
  //       imageUrl = await getDownloadURL(storageRef);
  //     }

  //     const docRef = await addDoc(collection(firestore, "destinations"), {
  //       alt: formData.alt,
  //       description: formData.description,
  //       img: imageUrl,
  //     });

  //     setDestinationData((prevData) => [
  //       ...prevData,
  //       { id: docRef.id, ...formData, img: imageUrl },
  //     ]);
  //     setFormData({ alt: "", description: "", img: "" });
  //     setImageFile(null);
  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <SiTicktick size={20} />
  //           <p>New Destination Added</p>
  //         </div>
  //       ),
  //       variant: "destructive",
  //       className: "bg-black text-white",
  //     });
  //   } catch (error) {
  //     console.error("Error adding document:", error);
  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <SiTicktick size={20} />
  //           <p>Error adding document</p>
  //         </div>
  //       ),
  //     });
  //   }
  // };

  // const handleDelete = async () => {
  //   if (!deleteDestinationId) return;
  //   try {
  //     await deleteDoc(doc(firestore, "destinations", deleteDestinationId));
  //     setDestinationData(
  //       destinationData.filter(
  //         (destination) => destination.id !== deleteDestinationId
  //       )
  //     );
  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <SiTicktick size={20} />
  //           <p>Destination Removed</p>
  //         </div>
  //       ),
  //       variant: "destructive",
  //       className: "bg-black text-white",
  //     });
  //   } catch (error) {
  //     console.error("Error deleting destination:", error);
  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <SiTicktick size={20} />
  //           <p>Error deleting destination</p>
  //         </div>
  //       ),
  //     });
  //   } finally {
  //     setShowConfirmDialog(false);
  //     setDeleteDestinationId(null);
  //   }
  // };

  const openConfirmDialog = (id: string) => {
    setDeleteDestinationId(id);
    setShowConfirmDialog(true);
  };

  // const handleUpdate = async () => {
  //   try {
  //     let imageUrl = formData.img;
  //     if (imageFile) {
  //       const storageRef = ref(storage, `destinations/${imageFile.name}`);
  //       await uploadBytes(storageRef, imageFile);
  //       imageUrl = await getDownloadURL(storageRef);
  //     }

  //     await updateDoc(doc(firestore, "destinations", editDestinationId!), {
  //       alt: formData.alt,
  //       description: formData.description,
  //       img: imageUrl,
  //     });

  //     // Update local state with updated data
  //     setDestinationData((prevData) =>
  //       prevData.map((item) =>
  //         item.id === editDestinationId
  //           ? {
  //               id: item.id,
  //               alt: formData.alt,
  //               description: formData.description,
  //               img: imageUrl,
  //             }
  //           : item
  //       )
  //     );

  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <SiTicktick size={20} />
  //           <p>Destination Updated</p>
  //         </div>
  //       ),
  //       variant: "destructive",
  //       className: "bg-black text-white",
  //     });
  //     closeEditModal();
  //   } catch (error) {
  //     console.error("Error updating document:", error);
  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <SiTicktick size={20} />
  //           <p>Error updating document</p>
  //         </div>
  //       ),
  //     });
  //   }
  // };

  const truncateText = (text: string) => {
    if (text.length <= 120) return text;
    return text.slice(0, 120) + "...";
  };

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Destinations" />

        <div className="container mx-auto p-4">
          {/* Form to add new destination */}
          <form
            // onSubmit={handleSubmit}
            className="mb-4 border px-10 pt-6 pb-3 rounded-lg"
            encType="multipart/form-data"
          >
            <div className="flex flex-col gap-4 mb-4">
              <h1 className="text-lg font-semibold">Add New Destinations</h1>
              {/* Alt Input */}
              <input
                type="text"
                placeholder="Title"
                value={formData.alt}
                onChange={(e) =>
                  setFormData({ ...formData, alt: e.target.value })
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

              {/* Image Input */}
              <div className="flex gap-2 items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="rounded"
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
                className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition duration-200 self-start"
              >
                Add Destination
              </Button>
            </div>
          </form>

          {/* Loading Spinner */}
          {isFetching && (
            <div className="flex justify-center items-center mt-4">
              <ImSpinner2
                height={24}
                width={24}
                className="animate-spin self-center text-center"
              />
            </div>
          )}

          {destinationData.length === 0 && !isFetching && (
            <h1 className="text-center">No destinations found.</h1>
          )}

          {/* List of destinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!isFetching &&
              destinationData.map((destination) => (
                <div
                  key={destination.id}
                  className="border border-gray-300 rounded p-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-40 mb-2 overflow-hidden">
                      <Image
                        src={destination.img}
                        alt={destination.alt}
                        width={300}
                        height={200}
                        className="rounded"
                      />
                    </div>
                    <div className="mb-2">
                      <h2 className="text-lg font-bold">{destination.alt}</h2>
                      <p>{truncateText(destination.description)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(destination)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200 flex items-center gap-1"
                    >
                      <BiSolidEditAlt />
                      Edit
                    </button>
                    <button
                      onClick={() => openConfirmDialog(destination.id)}
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
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Destination</h2>
                <form encType="multipart/form-data">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Alt"
                      value={formData.alt}
                      onChange={(e) =>
                        setFormData({ ...formData, alt: e.target.value })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      rows={4}
                    />
                  </div>
                  <div className="mb-4">
                    {/* Image preview */}
                    {previewImage && (
                      <div className="mb-2">
                        <h3 className="text-lg font-bold mb-2">
                          Current Image Preview
                        </h3>
                        <div className="relative w-full h-40 mb-2">
                          <Image
                            src={previewImage}
                            alt="Image Preview"
                            width={100}
                            height={50}
                            className="rounded"
                          />
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="py-1 rounded"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                      // onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Confirm Dialog */}
          {showConfirmDialog && (
            <ConfirmDialog
              isOpen={showConfirmDialog}
              // onConfirm={handleDelete}
              onConfirm={() => {}}
              onCancel={() => setShowConfirmDialog(false)}
              message="Are you sure you want to delete this destination?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
