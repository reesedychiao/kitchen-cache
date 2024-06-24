"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddRecipe from "../components/AddRecipe";
import RecipeDisplay from "../components/RecipeDisplay";
import ViewRecipeDetails from "../components/ViewRecipeDetails";
import { supabase } from "../lib/supabaseClient";

interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

export default function Saved() {
  const [saved, setSaved] = useState<Recipe[]>([]);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [viewRecipe, setViewRecipe] = useState(-1);
  const [isDeletingRecipe, setIsDeletingRecipe] = useState("");

  const fetchSavedRecipes = async () => {
    const { data, error } = await supabase.from("Recipes").select("*");
    if (error) {
      console.log("Error fetching saved recipes:", error.message);
    } else {
      setSaved(data);
    }
  };

  useEffect(() => {
    fetchSavedRecipes();
  }, [saved, isAddingRecipe]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    recipeInfo: Recipe
  ) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Recipes")
      .insert([
        {
          title: recipeInfo.title,
          ingredients: recipeInfo.ingredients,
          servings: recipeInfo.servings,
          instructions: recipeInfo.instructions,
        },
      ])
      .select();
    if (error) {
      console.log("Error adding recipe:", error.message);
    }
    setIsAddingRecipe(false);
  };

  const handleDelete = async (recipe: string) => {
    const { error } = await supabase
      .from("Recipes")
      .delete()
      .eq("title", recipe);
    if (error) {
      console.log("Error removing recipe from saved:", error.message);
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <RecipeDisplay recipes={saved} setViewRecipe={setViewRecipe} />
      <div>
        <button
          className="text-white bg-customOrange rounded-full absolute bottom-0 right-0 mr-8 mb-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 active:bg-orange-300"
          onClick={() => {
            setIsAddingRecipe(true);
          }}
        >
          +
        </button>
      </div>
      {isAddingRecipe && (
        <div>
          <AddRecipe handleSubmit={handleSubmit} />
          <p
            className="text-white bg-customOrange rounded-full absolute top-0 right-0 mr-8 mt-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orang-300 active:bg-orange-300"
            onClick={() => setIsAddingRecipe(false)}
          >
            x
          </p>
        </div>
      )}
      {viewRecipe > -1 ? (
        <div>
          <ViewRecipeDetails info={saved[viewRecipe]} />
          <button
            className="text-white bg-customOrange rounded-full absolute top-0 left-0 ml-8 mt-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orang-300 active:bg-orange-300"
            onClick={() => {
              setIsDeletingRecipe(saved[viewRecipe].title);
            }}
          >
            -
          </button>
          <button
            className="text-white bg-customOrange rounded-full absolute top-0 right-0 mr-8 mt-8 px-4 py-2 hover:scale-125 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orang-300 active:bg-orange-300"
            onClick={() => setViewRecipe(-1)}
          >
            x
          </button>
        </div>
      ) : (
        <></>
      )}
      {isDeletingRecipe != "" ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-16">
            <h2 className="text-xl text-center mb-8">
              Do you want to unsave this recipe?
            </h2>
            <div className="flex justify-around">
              <button
                className="border border-zinc-500 rounded-2xl text-xl py-2 px-4 active:scale-105"
                onClick={() => setIsDeletingRecipe("")}
              >
                No
              </button>
              <button
                className="text-white bg-red-500 rounded-2xl text-xl py-2 px-4 active:scale-105"
                onClick={() => {
                  handleDelete(isDeletingRecipe);
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
