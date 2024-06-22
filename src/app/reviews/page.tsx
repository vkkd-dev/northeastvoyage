"use client";

import PageTitle from "@/components/PageTitle";
import SideNavbar from "@/components/SideNavbar";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { firestore, storage } from "../firebase/firebase-cofig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoIosRemoveCircle } from "react-icons/io";
import { SiTicktick } from "react-icons/si";
import { MdErrorOutline } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ConfirmDialog from "@/components/ConfirmDialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";

interface Review {
  id: string;
  image: string;
  name: string;
  review: string;
}

const truncateText = (text: string): string => {
  if (text.length <= 50) return text;
  return text.slice(0, 50) + "...";
};

const ReviewPage = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    review: string;
    image: File | null;
  }>({
    name: "",
    review: "",
    image: null,
  });
  const [editData, setEditData] = useState<Review | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const fetchReviews = async () => {
    setIsFetching(true);
    try {
      const reviewsCollection = collection(firestore, "reviews");
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewsList = reviewsSnapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        ...doc.data(),
      })) as Review[];
      setReviewsData(reviewsList);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.image) return;

    if (formData.name === "" || formData.review === "" || !formData.image) {
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
      const storageRef = ref(storage, `reviews/${formData.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newReview = {
            name: formData.name,
            review: formData.review,
            image: downloadURL,
          };
          const docRef = await addDoc(
            collection(firestore, "reviews"),
            newReview
          );
          setReviewsData([...reviewsData, { id: docRef.id, ...newReview }]);
          toast({
            description: (
              <div className="flex items-center gap-2">
                <SiTicktick size={20} />
                <p>Review Added</p>
              </div>
            ),
            className: "bg-primary text-white font-bold",
          });
        }
      );
    } catch (error) {
      console.error("Error adding review:", error);
      toast({
        description: (
          <div className="flex items-center gap-2 font-bold">
            <SiTicktick size={20} />
            <p>Error adding review</p>
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setFormData({ name: "", review: "", image: null });
    }
  };

  const handleDelete = async () => {
    if (!deleteReviewId) return;
    try {
      await deleteDoc(doc(firestore, "reviews", deleteReviewId));
      setReviewsData(
        reviewsData.filter((review) => review.id !== deleteReviewId)
      );
      toast({
        description: (
          <div className="flex items-center gap-2">
            <SiTicktick size={20} />
            <p>Review Removed</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({
        description: (
          <div className="flex items-center gap-2 font-bold">
            <SiTicktick size={20} />
            <p>Error deleting review</p>
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setShowConfirmDialog(false);
      setDeleteReviewId(null);
    }
  };

  const openConfirmDialog = (id: string) => {
    setDeleteReviewId(id);
    setShowConfirmDialog(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const openEditModal = (review: Review) => {
    setEditData(review);
    setShowModal(true);
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editData) return;

    let imageUrl = editData.image;

    if (formData.image) {
      const storageRef = ref(storage, `reviews/${formData.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Error uploading image:", error);
        },
        async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(firestore, "reviews", editData.id), {
            name: editData.name,
            review: editData.review,
            image: imageUrl,
          });
          setReviewsData(
            reviewsData.map((review) =>
              review.id === editData.id
                ? { ...editData, image: imageUrl }
                : review
            )
          );
          setShowModal(false);
          setEditData(null);
          setFormData({ name: "", review: "", image: null });
        }
      );
    } else {
      await updateDoc(doc(firestore, "reviews", editData.id), {
        name: editData.name,
        review: editData.review,
        image: imageUrl,
      });
      setReviewsData(
        reviewsData.map((review) =>
          review.id === editData.id ? editData : review
        )
      );
      setShowModal(false);
      setEditData(null);
    }
  };

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Reviews" />
        <div className="padding-container">
          {/* Form to add new review */}
          <form
            onSubmit={handleSubmit}
            className="mb-4 border px-10 pt-6 pb-3 rounded-lg"
          >
            <div className="flex flex-col gap-5 mb-4">
              <h1 className="text-lg font-semibold">Add New Review</h1>

              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
              />
              <textarea
                name="review"
                placeholder="Review"
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
                className="px-2 py-1 border border-gray-300 rounded"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="rounded"
              />
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 self-start rounded hover:bg-blue-600 transition duration-200"
              >
                Add Review
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

          {reviewsData.length === 0 && !isFetching && (
            <h1 className="text-center">No Reviews found.</h1>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {!isFetching &&
              reviewsData.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-300 rounded p-2"
                >
                  <div className="relative w-full flex items-center justify-center h-50 mb-2">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={200}
                      height={200}
                      className="rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <h2 className="text-lg font-bold text-center">
                      {review.name}
                    </h2>
                    <p className="min-h-20">{truncateText(review.review)}</p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => openEditModal(review)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200 flex items-center gap-1"
                    >
                      <BiSolidEditAlt />
                      Edit
                    </button>
                    <button
                      onClick={() => openConfirmDialog(review.id)}
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
          {showModal && editData && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <h2 className="text-lg font-bold mb-4">Edit Review</h2>
                <form onSubmit={handleEditSubmit} className="mb-4">
                  <div className="flex flex-col gap-4 mb-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="px-2 py-1 border border-gray-300 rounded"
                    />
                    <textarea
                      name="review"
                      placeholder="Review"
                      value={editData.review}
                      onChange={handleEditChange}
                      className="max-w-3xl px-2 py-1 border border-gray-300 rounded"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="py-1 rounded"
                    />
                    <div className="relative flex items-center justify-center w-full h-20 mb-2">
                      <Image
                        src={editData.image}
                        alt={editData.name}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Confirm Delete Dialog */}
          {showConfirmDialog && (
            <ConfirmDialog
              isOpen={showConfirmDialog}
              onConfirm={handleDelete}
              onCancel={() => setShowConfirmDialog(false)}
              message="Are you sure you want to delete this review?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
