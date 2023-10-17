import { useEffect, useState } from "react";

type Props = {
  setMainTab: (tab: string) => void;
};

export default function IngredientTab(props: Props) {
  const ingredient = [
    "Fruits",
    "Vegetables",
    "Meats",
    "Pasta",
    "Rice",
    "Beans",
    "Fish",
    "Cheese",
    "Bread",
    "Eggs",
    "Tomatoes",
    "Onions",
    "Mushrooms",
    "Garlic",
    "Herbs",
  ];
  const [ingredients, setIngredients] = useState(ingredient);
  const [ingredientSearch, setIngredientSearch] = useState("");

  useEffect(() => {
    const filteredIngredients = ingredient.filter((item: string) =>
      item.toLowerCase().startsWith(ingredientSearch.toLowerCase())
    );
    setIngredients(filteredIngredients);
  }, [ingredientSearch]);

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="flex flex-col bg-primary-background w-[400px] h-[600px] rounded-xl text-text">
        <div className="flex h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="
            p-4 w-96 h-12 rounded-xl bg-input text-primary/70 text-xl font-medium 
            !outline-none placeholder:text-primary/70
            border-[0.5px] border-border"
            placeholder="Search for ingredients.."
            onChange={(e) => setIngredientSearch(e.target.value)}
          />
        </div>
        <div>
          <div className="h-[440px] mr-2 overflow-y-auto">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className={`flex p-1 ml-6 mr-2 items-center text-text text-xl border-border
            ${
              index % 2 === 0
                ? "bg-card-even border-b-[0.5px]"
                : "bg-card-odd border-b-[0.5px] "
            } 
            `}
              >
                <div className="">{ingredient}</div>
                <div className="flex-grow"></div>
                <div className="pr-2">
                  <input
                    className="h-7 w-14 rounded-xl text-center bg-input text-primary 
                  placeholder:text-primary placeholder:text-base !outline-none"
                    type="number"
                    placeholder="gram"
                  />
                </div>
                <div className="flex">
                  <button
                    className="
                h-8 w-8 pb-1 flex justify-center 
                items-center rounded-full bg-input 
                text-primary text-2xl font-extrabold
                hover:bg-text hover:transform duration-150"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow border-b mx-6"></div>
        <div className="w-full h-16 flex justify-around bg-primary text-xl font-medium rounded-b-xl">
          <button className="w-full hover:bg-white/5 rounded-bl-xl">
            New ingredient
          </button>
          <button
            className="w-full hover:bg-white/5 rounded-br-xl"
            onClick={() => props.setMainTab("Meal")}
          >
            Meal picker
          </button>
        </div>
      </div>
    </div>
  );
}
