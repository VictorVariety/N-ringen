import { AddedIngredientData } from "@/lib/types";
import { db } from "@/server/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

type Props = {
  selectedIngredients: AddedIngredientData[];
  setSecondTab: (f: string) => void;
  removeIngredient: (index: number) => void;
  resetIngredientsForMealCreation: () => void;
};

const mealsCollection = collection(db, "meals");

export default function MealCreatorTab(props: Props) {
  const [mealName, setMealName] = useState("");

  async function createAndSaveMeal() {
    const newMeal = {
      ingredients: props.selectedIngredients,
      name: mealName,
    };
    try {
      await addDoc(mealsCollection, newMeal);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="flex flex-col bg-primary-background w-[500px] h-[600px] rounded-xl text-text">
        <div className="flex h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="p-4 w-96 h-12 rounded-xl bg-input text-primary/70 text-xl font-medium !outline-none placeholder:text-primary/70 border-[0.5px] border-border"
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
                <div className="">{ingredient.ingredientData.Matvare}</div>
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
          <button
            className="w-full hover:bg-white/5 rounded-bl-xl"
            onClick={() => createAndSaveMeal()}
          >
            Lagre
          </button>
          <button
            className="w-full hover:bg-white/5 rounded-br-xl"
            onClick={() => props.resetIngredientsForMealCreation()}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
