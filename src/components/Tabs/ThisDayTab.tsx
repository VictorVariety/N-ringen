import { AddedIngredientType, MealType, ThisDayContentType } from "@/lib/types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCog } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import AmountInput from "./components/AmountInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/server/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

type Props = {
  setSecondTab: (tabname: string) => void;
  thisDayContent: ThisDayContentType[];
  setThisDayContent: (array: ThisDayContentType[]) => void;
  removeIngredientForThisDay: (index: number) => void;
  removeMealForThisDay: (index: number) => void;
};

export default function ThisDayTab(props: Props) {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (formattedDate == "") {
      const stringDate = `${date.getDate()} ${date.toLocaleString("en", {
        month: "short",
      })} ${date.getFullYear()}`;
      setFormattedDate(stringDate);
    }
  }, [date]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const userData = (await getDoc(docRef)).data();
          // Create user entry if undefined
          if (userData === undefined) {
            const firstTimeUser = { meals: [], history: [] };
            await setDoc(doc(db, "users", user.uid), firstTimeUser);
          }
          if (userData && userData.history) {
            const indexOfThisDate = userData.history.findIndex(
              (element: any) => element.date === formattedDate
            );
            if (
              userData.history[indexOfThisDate] &&
              userData.history[indexOfThisDate].thisDayContent
            ) {
              const filteredData = userData.history[indexOfThisDate]
                .thisDayContent as ThisDayContentType[];
              props.setThisDayContent(filteredData);
            } else {
              props.setThisDayContent([]);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [formattedDate]);

  useEffect(() => {
    createOrUpdateHistory();
  }, [props.thisDayContent]);

  // Is a function because it is called outside and inside a useEffect
  async function createOrUpdateHistory() {
    if (formattedDate == "") return;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const userData = (await getDoc(docRef)).data();

      if (userData && userData.history && userData.meals) {
        const indexOfThisDate = userData.history.findIndex(
          (element: any) => element.date === formattedDate
        );

        // If it exists update it
        if (indexOfThisDate !== -1) {
          userData.history[indexOfThisDate] = {
            date: formattedDate,
            thisDayContent: props.thisDayContent,
          };
        }
        // If not create it
        else {
          userData.history.push({
            date: formattedDate,
            thisDayContent: props.thisDayContent,
          });
        }

        const newDataForUpdate = {
          meals: userData.meals,
          history: userData.history.filter(
            (item: any) => item.thisDayContent.length > 0
          ),
        };

        await setDoc(docRef, newDataForUpdate);
      }
    }
  }

  function isMealType(item: MealType | AddedIngredientType): item is MealType {
    return (item as MealType).name !== undefined;
  }

  function isAddedIngredientType(item: any): item is AddedIngredientType {
    return (item as AddedIngredientType).amount !== undefined;
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
    <div className="p-6">
      <div className="w-[500px] h-[600px] rounded-[8px] flex flex-col bg-primary  text-text">
        <div className="h-24 px-6 rounded-t-xl flex justify-center items-center bg-primary ">
          <DatePicker
            selectsStart
            selected={date}
            onChange={(date: Date) => {
              setDate(date);
              const stringDate = `${date.getDate()} ${date.toLocaleString(
                "en",
                {
                  month: "short",
                }
              )} ${date.getFullYear()}`;
              setFormattedDate(stringDate);
            }}
            dateFormat="dd/MM/yyyy"
            className="rounded-[5px] w-32 h-8 bg-input !outline-none text-primary/70 text-xl font-medium text-center hover:cursor-pointer"
          />
        </div>
        <div>
          <div className="h-[440px] mr-2 overflow-y-auto">
            {props.thisDayContent.map((item, index) => (
              <div
                key={index}
                className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
              >
                {isMealType(item) ? (
                  // MealType
                  <>
                    <div>{item.name}</div>
                    <div className="flex-grow"></div>
                    <div className="pr-2">
                      <button
                        className="
                        h-8 w-8 rounded-xl flex items-center justify-center text-button
                        hover:text-greenblue transition-color duration-200"
                      >
                        <FaCog />
                      </button>
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
          </div>
        </div>
        <div className="flex-grow border-b mx-6"></div>
        <div className="w-full h-16 flex justify-around bg-primary text-xl font-medium rounded-b-xl">
          <button className="w-full hover:bg-white/5 rounded-bl-xl">
            Næringsinnhold
          </button>
          <button
            className="w-full hover:bg-white/5 rounded-br-xl"
            onClick={() => console.log(props.thisDayContent)}
          >
            ???
          </button>
        </div>
      </div>
    </div>
  );
}
