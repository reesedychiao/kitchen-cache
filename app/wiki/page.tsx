import Link from "next/link";

export default function Wiki() {
  return (
    <div>
      <div className="flex mt-32 text-white">
        <div className="flex-1 bg-customOrange p-4 px-6 rounded-xl mx-16 h-80">
          <div className="text-center">
            <h1 className="text-4xl my-8 font-sacramento">
              Record Pantry Items
            </h1>
            <p className="text-xl mt-8 mb-4 font-comfortaa-regular leading-loose">
              Keep track of items in your pantry and their expiration date.
            </p>
          </div>
        </div>
        <div className="flex-1 bg-customOrange p-4 px-6 rounded-xl mx-16 h-80">
          <div className="text-center">
            <h1 className="text-4xl my-8 font-sacramento">
              Search For Recipes
            </h1>
            <p className="text-xl mt-8 mb-4 font-comfortaa-regular leading-loose">
              Save new recipes and add ingredients to your grocery list. You can
              also star your favorite recipes!
            </p>
          </div>
        </div>
        <div className="flex-1 bg-customOrange p-4 px-6 rounded-xl mx-16 h-80">
          <div className="text-center">
            <h1 className="text-4xl my-8 font-sacramento">Track Groceries</h1>
            <p className="text-xl mt-8 mb-4 font-comfortaa-regular leading-loose">
              Add or remove items on your grocery list. You can also cross items
              off which automatically updates your pantry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
