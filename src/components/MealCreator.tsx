import { IngredientData } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
  setSecondTab: (f: string) => void;
  selectedIngredients: IngredientData[];
  removeIngredient: (index: number) => void;
};

export default function MealCreator(props: Props) {
  const [mealName, setMealName] = useState("");

  useEffect(() => {
    console.log(props.selectedIngredients);
  }, []);

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="flex flex-col bg-primary-background w-[500px] h-[600px] rounded-xl text-text">
        <div className="flex h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="
            p-4 w-96 h-12 rounded-xl bg-input text-primary/70 text-xl font-medium 
            !outline-none placeholder:text-primary/70
            border-[0.5px] border-border"
            placeholder="Gi måltidet et navn.."
            onChange={(e) => {
              setMealName(e.target.value);
            }}
          />
        </div>

        <div>
          <div className="h-[440px] mr-2 overflow-y-auto">
            {props.selectedIngredients.map((ingredient, index) => (
              <div
                className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
                key={index}
              >
                <div className="">{ingredient.Matvare}</div>
                <div className="flex-grow"></div>
                <div className="pr-2">
                  <input
                    className="h-7 w-14 rounded-xl text-center bg-input text-primary 
                    placeholder:text-primary placeholder:text-base !outline-none"
                    type="number"
                    placeholder="100g"
                  />
                </div>
                <div className="flex">
                  <button
                    className="
                  h-8 w-8 pb-1 flex justify-center 
                  items-center rounded-full bg-input 
                  text-primary text-2xl font-bold
                  hover:bg-text hover:transform duration-150"
                    onClick={() => props.removeIngredient(index)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-grow border-b mx-6"></div>
        <div className="w-full h-16 flex justify-around bg-primary text-xl font-medium rounded-b-xl">
          <button className="w-full hover:bg-white/5 rounded-bl-xl">
            Lagre
          </button>
          <button className="w-full hover:bg-white/5 rounded-br-xl">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
