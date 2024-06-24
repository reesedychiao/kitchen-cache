interface RecipeDetailsProps {
  info: {
    title: string;
    ingredients: string;
    servings: string;
    instructions: string;
  };
}

const ViewRecipeDetails: React.FC<RecipeDetailsProps> = ({ info }) => {
  const listIngredients = (allIngredients: string) => {
    const ingredients = allIngredients.split("|");
    return (
      <ul className="list-disc list-inside font-comfortaa text-white text-md my-4">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="my-1">
            {ingredient}
          </li>
        ))}
      </ul>
    );
  };

  const listInstructions = (allInstructions: string) => {
    const instructions = allInstructions
      .split(/\.\s*/)
      .filter((step) => step.trim() !== "");

    return (
      <ul className="list-disc list-inside font-comfortaa text-white text-md my-4">
        {instructions.map((step, index) => (
          <li key={index} className="my-1">
            {step}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center py-16 px-8 bg-gray-500 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-customBlue py-16 px-16 rounded-3xl overflow-y-scroll h-5/6 w-1/2">
        <h1 className="text-white font-sacramento text-4xl mb-8">
          {info.title}
        </h1>
        <h3 className="text-white">Ingredients:</h3>
        {listIngredients(info.ingredients)}
        <h3 className="text-white">Makes {info.servings}</h3>
        <br />
        <h3 className="text-white">Instructions:</h3>
        {listInstructions(info.instructions)}
      </div>
    </div>
  );
};

export default ViewRecipeDetails;
