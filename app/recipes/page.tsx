"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ViewRecipeDetails from "../components/ViewRecipeDetails";
import RecipeDisplay from "../components/RecipeDisplay";
import { supabase } from "../lib/supabaseClient";

interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

export default function Recipes() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [viewRecipe, setViewRecipe] = useState(-1);

  const handleSearch = async (search: string) => {
    try {
      const res = await fetch(
        `https://api.api-ninjas.com/v1/recipe?query=${search}`,
        {
          method: "GET",
          headers: {
            "X-API-KEY": "+nomOEnA92jeUwx3Lp+T4g==FkIWpgabnjWRUErc",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setRecipes(data);
      } else {
        console.log("something went wrong...");
      }
    } catch (error) {
      console.log("Request failed:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.code === "Enter") {
      handleSearch(search);
    }
  };

  const handleAdd = async (info: Recipe) => {
    const { data, error } = await supabase
      .from("Recipes")
      .insert([
        {
          title: info.title,
          ingredients: info.ingredients,
          servings: info.servings,
          instructions: info.instructions,
        },
      ])
      .select();
    if (error) {
      console.log("Error adding recipe to favorites:", error.message);
    }
  };

  return (
    <div>
      <div className="flex rounded-full mt-16 mx-16 bg-gray-200 py-4 px-8">
        <Image
          src="/search.png"
          alt="Search Logo"
          width={30}
          height={20}
        ></Image>
        <input
          type="text"
          placeholder="Search recipe..."
          className="bg-gray-200 focus:outline-none text-lg ml-4 pr-100"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <RecipeDisplay recipes={recipes} setViewRecipe={setViewRecipe} />
      {viewRecipe > -1 ? (
        <div>
          <ViewRecipeDetails info={recipes[viewRecipe]} />
          <button
            className="text-white bg-customOrange rounded-full absolute top-0 right-0 mr-8 mt-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orang-300 active:bg-orange-300"
            onClick={() => handleAdd(recipes[viewRecipe])}
          >
            +
          </button>
          <button
            className="text-white bg-customOrange rounded-full absolute top-0 left-0 ml-8 mt-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orang-300 active:bg-orange-300"
            onClick={() => setViewRecipe(-1)}
          >
            x
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
