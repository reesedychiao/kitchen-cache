interface Recipe {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
}

interface RecipeDisplayProps {
  recipes: Recipe[];
  setViewRecipe: (index: number) => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({
  recipes,
  setViewRecipe,
}) => {
  const listIngredients = (allIngredients: string) => {
    const ingredients = allIngredients.split("|");
    return (
      <ul className="list-disc list-inside font-comfortaa text-md my-4">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="my-1">
            {ingredient}
          </li>
        ))}
      </ul>
    );
  };

  const displayRecipes = () => {
    return recipes.map((recipe, index) => (
      <div
        key={index}
        className="bg-gray-300 rounded-xl mx-4 mb-8 p-4 w-full sm:w-1/2 lg:w-1/4"
      >
        <h1 className="font-comfortaa text-xl text-center my-4">
          {recipe.title}
        </h1>
        <div>{listIngredients(recipe.ingredients)}</div>
        <p className="font-comfortaa text-lg my-4">
          Servngs: {recipe.servings}
        </p>
        <div className="text-center">
          <button
            className="bg-customOrange font-comfortaa text-white text-xl rounded-full py-2 px-4 mt-4 active:scale-105 justify-end mb-4"
            onClick={() => {
              setViewRecipe(index);
            }}
          >
            Make!
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-wrap mt-16 justify-around">
      {displayRecipes()}
    </div>
  );
};

export default RecipeDisplay;
