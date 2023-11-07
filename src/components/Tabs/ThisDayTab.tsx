import { ThisDayContentType } from "@/lib/types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/server/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ThisDayList from "./components/ThisDayList";
import ThisDayNutrition from "./components/ThisDayNutrition";

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
  const [showNutrition, setShowNutrition] = useState(false);

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
          const docRef = doc(db, "history", user.uid);
          const userData = (await getDoc(docRef)).data();
          // Create user entry if undefined
          if (userData === undefined) {
            const firstTimeMeals = { meals: [] };
            const firstTimeHistory = { history: [] };
            await setDoc(doc(db, "meals", user.uid), firstTimeMeals);
            await setDoc(doc(db, "history", user.uid), firstTimeHistory);
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
            {showNutrition ? (
              <ThisDayNutrition thisDayContent={props.thisDayContent} />
            ) : (
              <ThisDayList
                formattedDate={formattedDate}
                thisDayContent={props.thisDayContent}
                setThisDayContent={props.setThisDayContent}
                removeIngredientForThisDay={props.removeIngredientForThisDay}
                removeMealForThisDay={props.removeMealForThisDay}
              />
            )}
          </div>
        </div>
        <div className="flex-grow border-b mx-6"></div>
        <div className="w-full h-16 flex justify-around bg-primary text-xl font-medium rounded-b-xl">
          <button
            className="w-full hover:bg-white/5 rounded-bl-xl"
            onClick={
              showNutrition
                ? () => setShowNutrition(false)
                : () => setShowNutrition(true)
            }
          >
            {showNutrition ? "Matartikkler" : "Næringsinnhold"}
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
