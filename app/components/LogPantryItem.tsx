import { useState } from "react";

interface FormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, formInfo: any) => void;
}

const LogPantryItem: React.FC<FormProps> = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    item: "",
    category: "",
    expiry: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    handleSubmit(e, formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center py-16 px-8 bg-gray-500 bg-opacity-60 backdrop-blur-sm">
      <div className="bg-customBlue py-16 px-16 rounded-3xl">
        <h1 className="text-white font-sacramento text-4xl mb-8">
          Pantry Item Details
        </h1>
        <form className="bg-customBlue" onSubmit={onSubmit}>
          <div className="flex flex-col mb-8">
            <label
              htmlFor="item"
              className="text-white font-comfortaa text-lg mb-4"
            >
              Item Name:
            </label>
            <input
              type="text"
              id="item"
              name="item"
              value={formData.item}
              onChange={(e) =>
                setFormData({ ...formData, item: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-8">
            <label
              htmlFor="category"
              className="text-white font-comfortaa text-lg mb-4"
            >
              Category:
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="meat">Meat</option>
              <option value="dairy">Dairy</option>
              <option value="bread">Bread</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="frozen">Frozen</option>
              <option value="beverage">Beverage</option>
              <option value="snack">Snack</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="flex flex-col mb-8">
            <label
              htmlFor="expiryDate"
              className="text-white font-comfortaa text-lg mb-4"
            >
              Expiry Date:
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiry}
              onChange={(e) =>
                setFormData({ ...formData, expiry: e.target.value })
              }
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

export default LogPantryItem;
