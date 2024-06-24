"use client";

import Link from "next/link";
import LogPantryItem from "../components/LogPantryItem";
import { useEffect, useState } from "react";
import "../globals.css";
import { supabase } from "../lib/supabaseClient";

interface PantryItem {
  id: number;
  item: string;
  category: string;
  expiry: string;
}

export default function Pantry() {
  const [isLoggingPantryItem, setIsLoggingPantryItem] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState("");
  const [allPantryItems, setAllPantryItems] = useState<PantryItem[]>([]);
  const today = new Date();

  const fetchPantryItems = async () => {
    const { data, error } = await supabase.from("Pantry Items").select("*");
    if (error) {
      console.error("Error fetching pantry items:", error.message);
    } else {
      setAllPantryItems(data);
    }
  };

  useEffect(() => {
    fetchPantryItems();
  }, [allPantryItems, isDeletingItem, isLoggingPantryItem]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    formInfo: any
  ) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Pantry Items")
      .insert([
        {
          item: formInfo["item"],
          category: formInfo["category"],
          expiry: formInfo["expiry"],
        },
      ])
      .select();
    if (error) {
      console.log("Error adding pantry item:", error.message);
    }
    setIsLoggingPantryItem(false);
  };

  const displayItems = () => {
    return allPantryItems.map((item, index) => (
      <div
        key={index}
        className={`${
          new Date(item.expiry) < today ? "text-red-500" : ""
        } flex -mx-2 mt-16 gap-16`}
      >
        <h1 className="font-comfortaa-bold text-xl w-1/3 py-2 px-16 ml-16 text-center">
          {item.item}
        </h1>
        <div className="w-1/3 flex justify-center py-2 text-center">
          <span
            className={`px-4 py-2 rounded-full font-comfortaa-bold ${item.category}`}
          >
            {item.category}
          </span>
        </div>
        <h1 className="font-comfortaa-bold text-xl w-1/3 py-2 px-16 mr-32 text-center">
          {item.expiry}
        </h1>
        <button
          className="absolute text-red-500 text-xl right-16"
          onClick={() => {
            setIsDeletingItem(item.item);
          }}
        >
          ...
        </button>
      </div>
    ));
  };

  const handleDelete = async (item: string) => {
    const { error } = await supabase
      .from("Pantry Items")
      .delete()
      .eq("item", item);
    if (error) {
      console.log("Error deleting pantry item:", error.message);
    } else {
      setIsDeletingItem("");
    }
    if (error) {
      console.log("Error deleting pantry item:", error.message);
    }
  };

  return (
    <div>
      <h1 className="text-customOrange text-7xl text-center font-sacramento mt-16">
        Pantry Items
      </h1>
      <div className="flex -mx-2 mt-16 gap-16">
        <h1 className="text-white font-comfortaa-semibold text-l bg-customOrange rounded-full w-1/3 py-2 px-16 ml-16 text-center">
          ITEM
        </h1>
        <h1 className="text-white font-comfortaa-semibold text-l bg-customOrange rounded-full w-1/3 py-2 px-16 text-center">
          CATEGORY
        </h1>
        <h1 className="text-white font-comfortaa-semibold text-l bg-customOrange rounded-full w-1/3 py-2 px-16 mr-32 text-center">
          EXPIRY DATE
        </h1>
      </div>
      {displayItems()}
      <div>
        <button
          className="text-white bg-customOrange rounded-full absolute bottom-0 right-0 mr-8 mb-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 active:bg-orange-300"
          onClick={() => {
            setIsLoggingPantryItem(true);
          }}
        >
          +
        </button>
      </div>
      {isLoggingPantryItem && (
        <div>
          <LogPantryItem handleSubmit={handleSubmit} />
          <p
            className="text-white bg-customOrange rounded-full absolute top-0 right-0 mr-8 mt-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orang-300 active:bg-orange-300"
            onClick={() => setIsLoggingPantryItem(false)}
          >
            x
          </p>
        </div>
      )}
      {isDeletingItem != "" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-16">
            <h2 className="text-xl text-center mb-8">
              Do you want to delete this item?
            </h2>
            <div className="flex justify-around">
              <button
                className="border border-zinc-500 rounded-2xl text-xl py-2 px-4 active:scale-105"
                onClick={() => setIsDeletingItem("")}
              >
                No
              </button>
              <button
                className="text-white bg-red-500 rounded-2xl text-xl py-2 px-4 active:scale-105"
                onClick={() => {
                  handleDelete(isDeletingItem);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
