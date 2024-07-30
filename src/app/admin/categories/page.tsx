"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { firestore } from "@/app/firebase/firebase-cofig";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

interface Category {
  id: string;
  title: string;
}

const CategoriesPage = () => {
  const [formData, setFormData] = useState<{ title: string }>({ title: "" });
  const [categories, setCategories] = useState<Category[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(firestore, "categories");
      const querySnapshot = await getDocs(categoriesCollection);
      const fetchedCategories: Category[] = [];
      querySnapshot.forEach((doc) => {
        fetchedCategories.push({ id: doc.id, title: doc.data().title });
      });
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title.trim() === "") return;

    try {
      await addDoc(collection(firestore, "categories"), {
        title: formData.title,
      });
      setFormData({ title: "" });
      // Refresh categories
      const categoriesCollection = collection(firestore, "categories");
      const querySnapshot = await getDocs(categoriesCollection);
      const fetchedCategories: Category[] = [];
      querySnapshot.forEach((doc) => {
        fetchedCategories.push({ id: doc.id, title: doc.data().title });
      });
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditChange = (id: string, title: string) => {
    setEditId(id);
    setEditTitle(title);
  };

  const handleEditSubmit = async (id: string) => {
    if (editTitle.trim() === "") return;
    try {
      await updateDoc(doc(firestore, "categories", id), { title: editTitle });
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, title: editTitle } : cat))
      );
      setEditId(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, "categories", id));
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const reorderedCategories = Array.from(categories);
    const [movedCategory] = reorderedCategories.splice(result.source.index, 1);
    reorderedCategories.splice(result.destination.index, 0, movedCategory);

    try {
      await Promise.all(
        reorderedCategories.map((cat, index) =>
          updateDoc(doc(firestore, "categories", cat.id), { order: index })
        )
      );
      setCategories(reorderedCategories);
    } catch (error) {
      console.error("Error reordering categories:", error);
    }
  };

  return (
    <div className={"min-h-screen w-full bg-white text-black flex "}>
      <SideNavbar />
      <div className="flex flex-col gap-5 w-full p-8">
        <PageTitle title="Categories" />

        <div className="container mx-auto p-4">
          {/* Form to add new destination */}
          <form
            onSubmit={handleSubmit}
            className="mb-4 border px-10 pt-6 pb-3 rounded-lg"
          >
            <div className="flex flex-col gap-4 mb-4">
              <h1 className="text-lg font-semibold">Add New Category</h1>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ title: e.target.value })}
                className="px-2 py-1 border border-gray-300 rounded"
              />
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition duration-200 self-start"
              >
                Add Category
              </Button>
            </div>
          </form>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {categories.map((category, index) => (
                    <Draggable
                      key={category.id}
                      draggableId={category.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border border-gray-300 rounded p-4"
                        >
                          {editId === category.id ? (
                            <div>
                              <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded mb-2"
                              />
                              <Button
                                onClick={() => handleEditSubmit(category.id)}
                                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-200"
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <h2 className="text-lg font-bold">
                                {category.title}
                              </h2>
                              <div className="flex gap-2 mt-2">
                                <Button
                                  onClick={() =>
                                    handleEditChange(
                                      category.id,
                                      category.title
                                    )
                                  }
                                  className="bg-yellow-500 text-white w-20 rounded hover:bg-yellow-600 transition duration-200"
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() => handleDelete(category.id)}
                                  className="bg-red-500 text-white w-20 rounded hover:bg-red-600 transition duration-200"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
