import { AddedIngredientType } from "@/lib/types";
import { auth, db } from "@/server/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AmountInput from "./components/AmountInput";

type Props = {
  selectedIngredients: AddedIngredientType[];
  editingMealIndex: number | null;
  setSelectedIngredients: (array: AddedIngredientType[]) => void;
  removeIngredient: (index: number) => void;
  cancelMealCreation: () => void;
  mealName: string;
  setMealName: (name: string) => void;
  setMainTab: (tab: string) => void;
  setSecondTab: (tab: string) => void;
};

export default function MealCreatorTab(props: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [user] = useAuthState(auth);

  async function SaveMeal() {
    if (props.mealName.length < 3) {
      setErrorMessage("Minst 3 tegn");
      return;
    }
    if (props.selectedIngredients.length < 1) {
      setErrorMessage("Ingen ingredienser");
      return;
    }
    setErrorMessage("");
    try {
      if (user) {
        const docRef = doc(db, "meals", user.uid);
        const docSnap = await getDoc(docRef);
        const newMeal = {
          ingredients: props.selectedIngredients,
          name: props.mealName,
        };
        props.setMealName("");
        props.setMainTab("Meals");
        props.setSecondTab("ThisDay");
        if (docSnap.exists()) {
          const allMeals = docSnap.data().meals;

          if (props.editingMealIndex !== null) {
            allMeals[props.editingMealIndex] = newMeal;
          } else {
            allMeals.push(newMeal);
          }
          await setDoc(docRef, {
            meals: allMeals,
          });
        }
      }
    } catch (error) {
      setErrorMessage("Noe gikk galt");
      console.error(error);
    }
  }

  function changeIngredientAmount(index: number, newAmount: number | "NaN") {
    if (index >= 0 && index < props.selectedIngredients.length) {
      if (newAmount == "NaN") newAmount = 0;

      const updatedIngredients = [...props.selectedIngredients];

      updatedIngredients[index].amount = newAmount;

      props.setSelectedIngredients(updatedIngredients);
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col bg-primary w-[500px] h-[600px] rounded-[8px] text-text">
        <div className="flex flex-col h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="fixed p-4 w-52 h-8 rounded-[5px] bg-input text-primary/70 text-xl font-medium !outline-none placeholder:text-primary/70"
            placeholder="Gi måltidet et navn"
            value={props.mealName}
            onChange={(e) => {
              props.setMealName(e.target.value);
            }}
          />
          <div className="relative top-10 pl-[52px] h-8 w-full">
            {errorMessage}
          </div>
        </div>

        <div>
          <div className="h-[440px] mr-2 overflow-y-auto">
            {props.selectedIngredients.map((ingredient, index) => (
              <div
                className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
                key={index}
              >
                <div className="">{ingredient.ingredientType.Matvare}</div>
                <div className="flex-grow"></div>
                <div className="pr-2">
                  <AmountInput
                    amount={ingredient.amount}
                    index={index}
                    changeIngredientAmount={changeIngredientAmount}
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
            className="w-full hover:bg-greenblue transition-colors duration-200 rounded-bl-xl"
            onClick={() => SaveMeal()}
          >
            Lagre
          </button>
          <button
            className="w-full rounded-br-xl hover:bg-cardinal transition-colors duration-200"
            onClick={() => {
              props.cancelMealCreation();
            }}
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
}
