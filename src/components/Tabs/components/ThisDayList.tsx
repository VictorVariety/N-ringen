import { useEffect } from "react";
import AmountInput from "./AmountInput";
import { FaX } from "react-icons/fa6";
import { AddedIngredientType, MealType, ThisDayContentType } from "@/lib/types";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/server/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
  formattedDate: string;
  thisDayContent: ThisDayContentType[];
  setThisDayContent: (array: ThisDayContentType[]) => void;
  removeIngredientForThisDay: (index: number) => void;
  removeMealForThisDay: (index: number) => void;
};

export function isMealType(
  item: MealType | AddedIngredientType
): item is MealType {
  return (item as MealType).name !== undefined;
}

export function isAddedIngredientType(item: any): item is AddedIngredientType {
  return (item as AddedIngredientType).amount !== undefined;
}

export default function ThisDayList(props: Props) {
  const [user] = useAuthState(auth);

  useEffect(() => {
    createOrUpdateHistory();
  }, [props.thisDayContent]);

  async function createOrUpdateHistory() {
    if (props.formattedDate == "") return;
    if (user) {
      const docRef = doc(db, "history", user.uid);
      const userData = (await getDoc(docRef)).data();

      if (userData) {
        const indexOfThisDate = userData.history.findIndex(
          (element: any) => element.date === props.formattedDate
        );

        // If it exists update it
        if (indexOfThisDate !== -1) {
          userData.history[indexOfThisDate] = {
            date: props.formattedDate,
            thisDayContent: props.thisDayContent,
          };
        }
        // If not create it
        else {
          userData.history.push({
            date: props.formattedDate,
            thisDayContent: props.thisDayContent,
          });
        }

        const newDataForUpdate = {
          history: userData.history.filter(
            (item: any) => item.thisDayContent.length > 0
          ),
        };

        await setDoc(docRef, newDataForUpdate);
      }
    }
  }

  function changeIngredientAmount(index: number, newAmount: number | "NaN") {
    if (index >= 0 && index < props.thisDayContent.length) {
      const updatedContent = [...props.thisDayContent];

      if (isAddedIngredientType(updatedContent[index])) {
        let ingredient = updatedContent[index] as AddedIngredientType;
        if (newAmount == "NaN") newAmount = 0;
        ingredient.amount = newAmount;
        updatedContent[index] = ingredient;
        props.setThisDayContent(updatedContent);
      }
    }
  }

  return (
    <>
      {props.thisDayContent.map((item, index) => (
        <div
          key={index}
          className="flex p-1 ml-6 mr-2 items-center text-text text-xl"
        >
          {isMealType(item) ? (
            // MealType
            <>
              <div>{item.name}</div>
              <div className="flex-grow"></div>
              <div className="pr-2">
                {/* In case I want the change current meal for this day function 
                      <button
                        className="
                        h-8 w-8 rounded-xl flex items-center justify-center text-button
                        hover:text-greenblue transition-color duration-200"
                      >
                        <FaCog />
                      </button> */}
              </div>
              <div className="flex">
                <button
                  className="
                        h-8 w-8 rounded-xl flex items-center justify-center text-button
                        hover:text-cardinal transition-color duration-200"
                  onClick={() => {
                    props.removeMealForThisDay(index);
                    createOrUpdateHistory();
                  }}
                >
                  <FaX />
                </button>
              </div>
            </>
          ) : (
            // IngredientType
            <>
              <div>{item.ingredientType.Matvare}</div>
              <div className="flex-grow"></div>
              <div className="pr-2">
                <AmountInput
                  amount={item.amount}
                  index={index}
                  changeIngredientAmount={changeIngredientAmount}
                />
              </div>
              <div className="flex">
                <button
                  className="
                        h-8 w-8 rounded-xl flex items-center justify-center text-button
                        hover:text-cardinal transition-color duration-200"
                  onClick={() => props.removeIngredientForThisDay(index)}
                >
                  <FaX />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}
