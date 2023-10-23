import { IngredientData } from "@/lib/types";
import { getIngredients } from "@/server/localbase";
import { useEffect, useState } from "react";

type Props = {
  setMainTab: (f: string) => void;
  addIngredientForMealCreation: (
    ingredient: IngredientData,
    amount: number
  ) => void;
  addIngredientForThisDay: (ingredient: IngredientData, amount: number) => void;
  isCreatingMeal: boolean;
};

export default function IngredientTab(props: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ingredients, setIngredients] = useState<IngredientData[]>([]);
  const [ingredientResult, setIngredientResult] = useState<IngredientData[]>(
    []
  );
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [amount, setAmount] = useState(100);

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

    const filteredIngredients = ingredients.filter((item: IngredientData) =>
      item.Matvare.toLowerCase().includes(ingredientSearch.toLowerCase())
    );
    setIngredientResult(filteredIngredients);
  }, [isLoading, ingredientSearch]);

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="flex flex-col bg-primary-background w-[500px] h-[600px] rounded-xl text-text">
        <div className="flex h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="
            p-4 w-96 h-12 rounded-xl bg-input text-primary/70 text-xl font-medium 
            !outline-none placeholder:text-primary/70
            border-[0.5px] border-border"
            placeholder="Søk etter matvarer.."
            onChange={(e) => setIngredientSearch(e.target.value)}
          />
        </div>
        {!isLoading ? (
          <div>
            <div className="h-[440px] mr-2 overflow-y-auto">
              {ingredientResult.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
                >
                  <div className="">{ingredient.Matvare}</div>
                  <div className="flex-grow"></div>
                  <div className="pr-2">
                    <input
                      className="h-7 w-14 rounded-xl text-center bg-input text-primary placeholder:text-primary placeholder:text-base !outline-none"
                      type="number"
                      placeholder="100"
                      onChange={(e) => {
                        const amount = parseFloat(e.target.value);
                        setAmount(amount);
                      }}
                    />
                  </div>
                  <div className="flex">
                    <button
                      className="h-8 w-8 pb-1 flex justify-center items-center rounded-full bg-input text-primary text-2xl font-extrabold hover:bg-text hover:transform duration-150"
                      onClick={
                        props.isCreatingMeal
                          ? () =>
                              props.addIngredientForMealCreation(
                                ingredient,
                                amount
                              )
                          : () =>
                              props.addIngredientForThisDay(ingredient, amount)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center pt-44 text-xl">
            Laster...
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
