import { IngredientType } from "@/lib/types";
import { getIngredients } from "@/server/localbase";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  setMainTab: (f: string) => void;
  addIngredientForMealCreation: (ingredient: IngredientType) => void;
  addIngredientForThisDay: (ingredient: IngredientType) => void;
  isCreatingMeal: boolean;
};

export default function IngredientTab(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [ingredientResult, setIngredientResult] = useState<IngredientType[]>(
    []
  );
  const [ingredientSearch, setIngredientSearch] = useState("");

  useEffect(() => {
    //Lager en funksjon her for å kunne bruke async
    async function fetchIngredients() {
      try {
        const data = getIngredients();
        setIngredients(await data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    fetchIngredients();
  });

  useEffect(() => {
    if (isLoading) return;

    const filteredIngredients = ingredients.filter((item: IngredientType) =>
      item.Matvare.toLowerCase().includes(ingredientSearch.toLowerCase())
    );
    setIngredientResult(filteredIngredients);
  }, [isLoading, ingredientSearch]);

  return (
    <div className="p-6">
      <div className="flex flex-col bg-primary w-[500px] h-[600px] rounded-[8px] text-text">
        <div className="flex h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="
            p-4 w-52 h-8 rounded-[5px] bg-input text-primary/70 text-xl font-medium 
            !outline-none placeholder:text-primary/70"
            placeholder="Søk etter matvarer"
            onChange={(e) => setIngredientSearch(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center pt-44 text-xl">
            Laster...
          </div>
        ) : (
          <div>
            <div className="h-[440px] mr-2 overflow-y-auto">
              {ingredientResult.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
                >
                  <div className="">{ingredient.Matvare}</div>
                  <div className="flex-grow"></div>

                  <div className="flex">
                    <button
                      className="
                        h-8 w-8 rounded-xl flex items-center justify-center text-button
                        hover:text-greenblue transition-color duration-200"
                      onClick={
                        props.isCreatingMeal
                          ? () => props.addIngredientForMealCreation(ingredient)
                          : () => props.addIngredientForThisDay(ingredient)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-grow border-b mx-6"></div>
        <div className="w-full h-16 flex justify-around bg-primary text-xl font-medium rounded-b-xl">
          <button className="w-full hover:bg-white/5 hover:transition-colors duration-300 rounded-bl-xl">
            Ny matvare
          </button>
          <button
            className="w-full hover:bg-white/5 hover:transition-colors duration-300 rounded-br-xl"
            onClick={() => props.setMainTab("Meal")}
          >
            Måltider
          </button>
        </div>
      </div>
    </div>
  );
}
