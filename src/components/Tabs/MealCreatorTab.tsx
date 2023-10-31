import { AddedIngredientType } from "@/lib/types";
import { auth, db } from "@/server/firebaseConfig";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AmountInput from "./components/AmountInput";

type Props = {
  selectedIngredients: AddedIngredientType[];
  editingMealIndex: number | null;
  setSelectedIngredients: (array: AddedIngredientType[]) => void;
  removeIngredient: (index: number) => void;
  cancelMealCreation: () => void;
};

export default function MealCreatorTab(props: Props) {
  const [mealName, setMealName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user] = useAuthState(auth);
  //

  async function SaveMeal() {
    if (mealName.length < 3) {
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
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const newMeal = {
          ingredients: props.selectedIngredients,
          name: mealName,
        };

        if (docSnap.exists()) {
          const mealsArray = docSnap.data().meals;

          if (props.editingMealIndex !== null) {
            //SAVE EDITED MEAL
          }

          mealsArray.push(newMeal);
          console.log(mealsArray);

          if (docSnap.data().history) {
            const historyArray = docSnap.data().history;
            await setDoc(docRef, {
              meals: mealsArray,
              history: historyArray,
            });
          } else if (!docSnap.data().history.exists())
            await setDoc(docRef, { meals: mealsArray, history: [] });
        } else {
          const newArray = { meals: [newMeal], history: [] };
          await setDoc(docRef, newArray);
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

  //

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="flex flex-col bg-primary-background w-[500px] h-[600px] rounded-xl text-text">
        <div className="flex flex-col h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="fixed p-4 w-96 h-12 rounded-xl bg-input text-primary/70 text-xl font-medium !outline-none placeholder:text-primary/70 border-[0.5px] border-border"
            placeholder="Gi måltidet et navn.."
            value={mealName}
            onChange={(e) => {
              setMealName(e.target.value);
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
            className="w-full hover:bg-white/5 rounded-bl-xl"
            onClick={() => SaveMeal()}
          >
            Lagre
          </button>
          <button
            className="w-full hover:bg-white/5 rounded-br-xl"
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
