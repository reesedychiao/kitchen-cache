import { useState } from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, formInfo: any) => void;
}

const AddRecipe: React.FC<FormProps> = ({ handleSubmit }) => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    servings: "",
    instructions: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e, recipeData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center py-16 px-8 bg-gray-500 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-customBlue py-16 px-16 rounded-3xl w-5/6">
        <h1 className="text-white font-sacramento text-2xl mb-8">
          Add Original Recipe
        </h1>
        <form className="bg-customBlue" onSubmit={onSubmit}>
          <div className="flex flex-col mb-8">
            <label
              htmlFor="title"
              className="text-white font-comfortaa text-lg mb-4"
            >
              Recipe Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={recipeData.title}
              onChange={(e) => {
                setRecipeData({ ...recipeData, title: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col mb-8">
            <label
              htmlFor="ingredients"
              className="text-white font-comfortaa text-lg mb-4"
            >
              Ingredients (separated by |)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={recipeData.ingredients}
              onChange={(e) => {
                setRecipeData({ ...recipeData, ingredients: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col mb-8">
            <label
              htmlFor="servings"
              className="text-white font-comfortaa text-lg mb-4"
            >
              Number of servings
            </label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={recipeData.servings}
              onChange={(e) => {
                setRecipeData({ ...recipeData, servings: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col mb-8">
            <label
              htmlFor="instructions"
              className="text-white font-comfortaa text-lg mb-4"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={recipeData.instructions}
              onChange={(e) => {
                setRecipeData({ ...recipeData, instructions: e.target.value });
              }}
            />
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className="text-black font-comfortaa text-lg bg-white rounded-xl px-8 transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-300 active:text-gray-800"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
