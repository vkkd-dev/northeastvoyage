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
import { useToast } from "@/components/ui/use-toast";
import { SiTicktick } from "react-icons/si";
import { LuClock10 } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { IoMdAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImSpinner2 } from "react-icons/im";
import { firestore, storage } from "@/app/firebase/firebase-cofig";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ConfirmDialog from "@/components/ConfirmDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  format,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  getMonth,
} from "date-fns";

interface Trip {
  id: string;
  name: string;
  city: string;
  price: string;
  duration: string;
  image: string;
  description: string;
  overview: string;
  // inclusion: string[];
  itinerary: any;
  inclusions: string[];
  exclusions: string[];
  faqs: any;
  priceList: any;
  selectedDates: any;
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
    // inclusion: [""],
    itinerary: [{ title: "", items: [""] }],
    inclusions: [""],
    exclusions: [""],
    faqs: [{ question: "", answer: "" }],
    priceList: [
      { people: "2 people", standard: "", deluxe: "" },
      { people: "3 people", standard: "", deluxe: "" },
      { people: "4 people(dzire)", standard: "", deluxe: "" },
      { people: "4 people(innova)", standard: "", deluxe: "" },
      { people: "5 people", standard: "", deluxe: "" },
      { people: "6 people", standard: "", deluxe: "" },
    ],
    selectedDates: [] as Date[],
  });
  const [selectedType, setSelectedType] = useState<string | null>(null);
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

    fetchTrips();
  }, [toast]);

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

  // const handleInclusionChange = (index: number, value: string) => {
  //   const newInclusion = [...formData.inclusion];
  //   newInclusion[index] = value;
  //   setFormData({ ...formData, inclusion: newInclusion });
  // };

  const handleInclusionsChange = (index: number, value: string) => {
    const newInclusions = [...formData.inclusions];
    newInclusions[index] = value;
    setFormData({ ...formData, inclusions: newInclusions });
  };

  const handleExclusionsChange = (index: number, value: string) => {
    const newExclusions = [...formData.exclusions];
    newExclusions[index] = value;
    setFormData({ ...formData, exclusions: newExclusions });
  };

  const handleFAQsChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const newFAQs = [...formData.faqs];
    newFAQs[index][field] = value;
    setFormData({ ...formData, faqs: newFAQs });
  };

  const handlePriceChange = (
    index: number,
    type: "standard" | "deluxe",
    value: string
  ) => {
    const newPriceList = [...formData.priceList];
    newPriceList[index][type] = value;
    setFormData({ ...formData, priceList: newPriceList });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData((prevFormData) => {
        const isDateSelected = prevFormData.selectedDates.some(
          (d) => d.getTime() === date.getTime()
        );
        // Add date if not already selected, otherwise remove it
        const newDates = isDateSelected
          ? prevFormData.selectedDates.filter(
              (d) => d.getTime() !== date.getTime()
            )
          : [...prevFormData.selectedDates, date];

        return { ...prevFormData, selectedDates: newDates };
      });
    }
  };

  const addItineraryItem = (index: number) => {
    const lastItem =
      formData.itinerary[index].items[
        formData.itinerary[index].items.length - 1
      ];
    if (lastItem.trim() !== "") {
      const newItinerary = [...formData.itinerary];
      newItinerary[index].items.push("");
      setFormData({ ...formData, itinerary: newItinerary });
    } else {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <MdErrorOutline size={20} />
            <p>Please fill the current item before adding a new one.</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    }
  };

  const addItinerarySection = () => {
    const lastSection = formData.itinerary[formData.itinerary.length - 1];
    if (
      lastSection.title.trim() !== "" &&
      lastSection.items.every((item) => item.trim() !== "")
    ) {
      setFormData({
        ...formData,
        itinerary: [...formData.itinerary, { title: "", items: [""] }],
      });
    } else {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <MdErrorOutline size={20} />
            <p>Please fill the current section before adding a new one.</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    }
  };

  // const addInclusion = () => {
  //   const lastInclusion = formData.inclusion[formData.inclusion.length - 1];
  //   if (lastInclusion.trim() !== "") {
  //     setFormData({ ...formData, inclusion: [...formData.inclusion, ""] });
  //   } else {
  //     toast({
  //       description: (
  //         <div className="flex items-center gap-2">
  //           <MdErrorOutline size={20} />
  //           <p>Please fill the current inclusion before adding a new one.</p>
  //         </div>
  //       ),
  //       className: "bg-primary text-white font-bold",
  //     });
  //   }
  // };

  const addInclusions = () => {
    const lastInclusions = formData.inclusions[formData.inclusions.length - 1];
    if (lastInclusions.trim() !== "") {
      setFormData({ ...formData, inclusions: [...formData.inclusions, ""] });
    } else {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <MdErrorOutline size={20} />
            <p>Please fill the current inclusion before adding a new one.</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    }
  };

  const addExclusions = () => {
    const lastExclusions = formData.exclusions[formData.exclusions.length - 1];
    if (lastExclusions.trim() !== "") {
      setFormData({ ...formData, exclusions: [...formData.exclusions, ""] });
    } else {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <MdErrorOutline size={20} />
            <p>Please fill the current exclusions before adding a new one.</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
    }
  };

  const addFAQs = () => {
    const lastFAQ = formData.faqs[formData.faqs.length - 1];
    if (lastFAQ.question.trim() !== "" && lastFAQ.answer.trim() !== "") {
      setFormData({
        ...formData,
        faqs: [...formData.faqs, { question: "", answer: "" }],
      });
    } else {
      toast({
        description: (
          <div className="flex items-center gap-2">
            <MdErrorOutline size={20} />
            <p>Please fill the current FAQ before adding a new one.</p>
          </div>
        ),
        className: "bg-primary text-white font-bold",
      });
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
      imageFile === null ||
      selectedType === null ||
      formData.inclusions.some((inclusion) => inclusion.trim() === "")
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

      const tripData: any = {
        city: formData.city,
        description: formData.description,
        duration: formData.duration,
        name: formData.name,
        price: formData.price,
        overview: formData.overview,
        // inclusion: formData.inclusion,
        itinerary: formData.itinerary,
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        faqs: formData.faqs,
        image: imageUrl,
        tripType: selectedType,
      };

      if (selectedType === "public") {
        tripData.selectedDates = formData.selectedDates;
      } else if (selectedType === "customize") {
        tripData.priceList = formData.priceList;
      }

      const docRef = await addDoc(collection(firestore, "trips"), tripData);

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
        // inclusion: [],
        itinerary: [{ title: "", items: [""] }],
        inclusions: [""],
        exclusions: [""],
        faqs: [{ question: "", answer: "" }],
        priceList: [
          { people: "2 people", standard: "", deluxe: "" },
          { people: "3 people", standard: "", deluxe: "" },
          { people: "4 people(dzire)", standard: "", deluxe: "" },
          { people: "4 people(innova)", standard: "", deluxe: "" },
          { people: "5 people", standard: "", deluxe: "" },
          { people: "6 people", standard: "", deluxe: "" },
        ],
        selectedDates: [],
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

  const handleItineraryChange = (
    index: number,
    field: "title" | "item",
    value: string,
    itemIndex?: number
  ) => {
    const newItinerary = [...formData.itinerary];
    if (field === "title") {
      newItinerary[index].title = value;
    } else if (field === "item" && itemIndex !== undefined) {
      newItinerary[index].items[itemIndex] = value;
    }
    setFormData({ ...formData, itinerary: newItinerary });
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
      // inclusion: [],
      itinerary: [{ title: "", items: [""] }],
      inclusions: [],
      exclusions: [],
      faqs: [{ question: "", answer: "" }],
      priceList: [
        { people: "2 people", standard: "", deluxe: "" },
        { people: "3 people", standard: "", deluxe: "" },
        { people: "4 people(dzire)", standard: "", deluxe: "" },
        { people: "4 people(innova)", standard: "", deluxe: "" },
        { people: "5 people", standard: "", deluxe: "" },
        { people: "6 people", standard: "", deluxe: "" },
      ],
      selectedDates: [],
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
      // inclusion: [],
      itinerary: [{ title: "", items: [""] }],
      inclusions: [],
      exclusions: [],
      faqs: [{ question: "", answer: "" }],
      priceList: [
        { people: "2 people", standard: "", deluxe: "" },
        { people: "3 people", standard: "", deluxe: "" },
        { people: "4 people(dzire)", standard: "", deluxe: "" },
        { people: "4 people(innova)", standard: "", deluxe: "" },
        { people: "5 people", standard: "", deluxe: "" },
        { people: "6 people", standard: "", deluxe: "" },
      ],
      selectedDates: [],
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
        inclusions: formData.inclusions,
        exclusions: formData.exclusions,
        faqs: formData.faqs,
        priceList: formData.priceList,
        selectedDates: formData.selectedDates,
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
                // inclusion: formData.inclusion,
                itinerary: formData.itinerary,
                inclusions: formData.inclusions,
                exclusions: formData.exclusions,
                faqs: formData.faqs,
                priceList: formData.priceList,
                selectedDates: formData.selectedDates,
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

  const groupDatesByMonth = (dates: Date[]) => {
    const months = new Map<number, Date[]>();
    dates.forEach((date) => {
      const month = getMonth(date);
      if (!months.has(month)) {
        months.set(month, []);
      }
      months.get(month)?.push(date);
    });
    return months;
  };

  const renderDates = () => {
    const datesByMonth = groupDatesByMonth(formData.selectedDates);
    const monthNames = Array.from(datesByMonth.keys()).sort((a, b) => a - b);

    return (
      <div className="flex flex-col mt-4 gap-3">
        {monthNames.map((monthIndex) => (
          <div key={monthIndex} className="flex flex-col gap-1">
            <div className="font-bold">
              {format(new Date(today.getFullYear(), monthIndex), "MMM")}
            </div>
            {datesByMonth.get(monthIndex)?.map((date) => (
              <div key={date.getTime()}>{format(date, "d")}</div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Current date and constraints
  const today = new Date();
  const startOfCurrentYear = startOfYear(today);
  const endOfCurrentYear = endOfYear(today);
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Trips - Main" />
        <div className="container mx-auto p-4">
          {/* Form to add new trip */}
          <form
            onSubmit={handleSubmit}
            className="mb-4 border px-5 lg:px-10 py-3 rounded-lg"
            encType="multipart/form-data"
          >
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold text-lg">
                  Add New Trip
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 mb-4 p-2">
                    {/* <h1 className="text-lg font-semibold">Add New Trip</h1> */}

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
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
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
                    <div className="items-center space-x-2">
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

                    {/* <div className="mt-6">
                      <h2 className="font-bold text-lg">Inclusion</h2>
                      {formData.inclusion.map((inclusion, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mt-2"
                        >
                          <Input
                            type="text"
                            placeholder={`Item ${index + 1}`}
                            value={inclusion}
                            onChange={(e) =>
                              handleInclusionChange(index, e.target.value)
                            }
                          />
                        </div>
                      ))}
                      <IoMdAddCircle
                        size={30}
                        onClick={addInclusion}
                        className="cursor-pointer m-2"
                      />
                    </div> */}

                    <div className="mt-6">
                      <h2 className="font-bold text-lg">Itinerary</h2>
                      {formData.itinerary.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="flex flex-col gap-1 mt-5"
                        >
                          <Input
                            type="text"
                            placeholder={`Title ${sectionIndex + 1}`}
                            value={section.title}
                            onChange={(e) =>
                              handleItineraryChange(
                                sectionIndex,
                                "title",
                                e.target.value
                              )
                            }
                          />
                          <div className="mx-10">
                            {section.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center gap-2 mt-2"
                              >
                                <Input
                                  type="text"
                                  placeholder={`Item ${itemIndex + 1}`}
                                  value={item}
                                  onChange={(e) =>
                                    handleItineraryChange(
                                      sectionIndex,
                                      "item",
                                      e.target.value,
                                      itemIndex
                                    )
                                  }
                                />
                              </div>
                            ))}
                            <IoMdAddCircle
                              size={30}
                              onClick={() => addItineraryItem(sectionIndex)}
                              className="cursor-pointer m-2"
                            />
                          </div>
                        </div>
                      ))}
                      <IoMdAddCircle
                        size={30}
                        onClick={addItinerarySection}
                        className="cursor-pointer m-2"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">Inclusions</h2>
                      {formData.inclusions.map((inclusion, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mt-2"
                        >
                          <Input
                            type="text"
                            placeholder={`Item ${index + 1}`}
                            value={inclusion}
                            onChange={(e) =>
                              handleInclusionsChange(index, e.target.value)
                            }
                          />
                        </div>
                      ))}
                      <IoMdAddCircle
                        size={30}
                        onClick={addInclusions}
                        className="cursor-pointer m-2"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">Exclusions</h2>
                      {formData.exclusions.map((exclusion, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mt-2"
                        >
                          <Input
                            type="text"
                            placeholder={`Item ${index + 1}`}
                            value={exclusion}
                            onChange={(e) =>
                              handleExclusionsChange(index, e.target.value)
                            }
                          />
                        </div>
                      ))}
                      <IoMdAddCircle
                        size={30}
                        onClick={addExclusions}
                        className="cursor-pointer m-2"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">FAQs</h2>
                      {formData.faqs.map((faq, index) => (
                        <div key={index} className="flex flex-col gap-1 mt-5">
                          <Input
                            type="text"
                            placeholder={`Question ${index + 1}`}
                            value={faq.question}
                            onChange={(e) =>
                              handleFAQsChange(
                                index,
                                "question",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            type="text"
                            placeholder={`Answer ${index + 1}`}
                            value={faq.answer}
                            onChange={(e) =>
                              handleFAQsChange(index, "answer", e.target.value)
                            }
                          />
                        </div>
                      ))}
                      <IoMdAddCircle
                        size={30}
                        onClick={addFAQs}
                        className="cursor-pointer m-2"
                      />
                    </div>

                    <Select onValueChange={setSelectedType}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Trip Types</SelectLabel>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="customize">Customize</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {selectedType === "public" && (
                      <div>
                        <h2 className="font-bold text-lg my-2">
                          Upcoming Dates
                        </h2>
                        <div className="mt-6">
                          <h2 className="font-bold text-lg">Select Dates</h2>
                          <DatePicker
                            selected={null} // No single date selected
                            onChange={handleDateChange}
                            inline
                            dateFormat="yyyy-MM-dd"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            highlightDates={formData.selectedDates.map(
                              (date) => new Date(date)
                            )}
                            filterDate={(date: Date) =>
                              // Disable dates before today and outside the current year
                              isAfter(date, today) ||
                              (isAfter(date, startOfCurrentYear) &&
                                isBefore(date, endOfCurrentYear))
                            }
                            minDate={today}
                            maxDate={endOfCurrentYear}
                            excludeDates={[
                              // Disable previous months and dates
                              ...Array.from(
                                { length: startOfCurrentMonth.getDate() - 1 },
                                (_, i) =>
                                  new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    i + 1
                                  )
                              ),
                            ]}
                          />
                          <div className="mt-4">
                            <h3 className="font-bold text-md">
                              Selected Dates
                            </h3>
                            {renderDates()}
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedType === "customize" && (
                      <div>
                        {/* <h2 className="font-bold text-lg">Price List</h2> */}
                        <table className="min-w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border p-2">No. of people</th>
                              <th className="border p-2">
                                Standard Hotel/Homestay
                              </th>
                              <th className="border p-2">Deluxe Hotel</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formData.priceList.map((priceItem, index) => (
                              <tr key={index}>
                                <td className="border p-2">
                                  {priceItem.people}
                                </td>
                                <td className="border p-2">
                                  <Input
                                    type="number"
                                    placeholder="Standard Price"
                                    value={priceItem.standard}
                                    onChange={(e) =>
                                      handlePriceChange(
                                        index,
                                        "standard",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="border p-2">
                                  <Input
                                    type="number"
                                    placeholder="Deluxe Price"
                                    value={priceItem.deluxe}
                                    onChange={(e) =>
                                      handlePriceChange(
                                        index,
                                        "deluxe",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-1 self-start rounded hover:bg-blue-600 transition duration-200"
                    >
                      Add Trip
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
