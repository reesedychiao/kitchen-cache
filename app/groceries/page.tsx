"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Item {
  id: number;
  name: string;
  isStruckThrough?: boolean;
}

const Groceries = () => {
  const [list, setList] = useState<Item[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState("");

  const fetchGroceryItems = async () => {
    const { data, error } = await supabase.from("Groceries").select("*");
    if (error) {
      console.log("Error fetching grocery items:", error.message);
    } else {
      setList(data);
      setNewItem("");
    }
  };

  useEffect(() => {
    fetchGroceryItems();
  }, [isAddingItem]);

  const listIngredients = () => {
    return (
      <ul className="text-center list-disc list-inside my-4">
        {list.map((item) => (
          <li
            key={item.id}
            className={`my-1 font-comfortaa-bold text-xl ${
              item.isStruckThrough ? "line-through" : ""
            }`}
            onClick={() => {
              handleItemClick(item.id);
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  const handleItemClick = async (id: number) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, isStruckThrough: true } : item
    );
    setList(updatedList);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const filteredList = updatedList.filter((item) => item.id !== id);
    setList(filteredList);
    const { error } = await supabase.from("Groceries").delete().match({ id });
    if (error) {
      console.log("Error crossing item out:", error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Groceries")
      .insert([{ name: newItem }])
      .select();
    if (error) {
      console.error("Error adding item to grocery list:", error.message);
    } else {
      setIsAddingItem(false);
      setNewItem("");
    }
  };

  return (
    <div>
      <h1 className="font-sacramento text-7xl text-customBlue my-16 text-center">
        Grocery List
      </h1>
      {listIngredients()}
      <button
        className="bg-customOrange text-white rounded-full absolute bottom-0 right-0 mr-8 mb-8 px-4 py-2 active:scale-125"
        onClick={() => {
          setIsAddingItem(true);
        }}
      >
        +
      </button>
      {isAddingItem && (
        <div className="fixed inset-0 flex items-center justify-center py-16 px-8 bg-gray-500 bg-opacity-60 backdrop-blur-sm">
          <div className="bg-customBlue py-16 px-16 rounded-3xl">
            <h1 className="text-white font-sacramento text-4xl mb-8 text-center">
              Grocery Item
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-white font-comfortaa text-lg mb-4"
                >
                  Item Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="mb-8"
                  onChange={(e) => {
                    setNewItem(e.target.value);
                  }}
                  required
                />
                <input
                  type="submit"
                  className="text-black font-comfortaa text-lg bg-white rounded-xl px-4 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-300 active:text-gray-800"
                />
              </div>
            </form>
          </div>
          <button
            className="bg-customOrange text-white rounded-full absolute top-0 right-0 mr-8 mt-8 px-4 py-2 active:scale-125"
            onClick={() => {
              setIsAddingItem(false);
            }}
          >
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default Groceries;
