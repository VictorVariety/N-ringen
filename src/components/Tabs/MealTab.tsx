import { MealData } from "@/lib/types";
import { db } from "@/server/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

type Props = {
  setMainTab: (tab: string) => void;
  setSecondTab: (tab: string) => void;
  addMealForThisDay: (meal: MealData) => void;
};

export default function MealTab(props: Props) {
  const [meals, setMeals] = useState<MealData[]>([]);
  const [mealSearch, setMealSearch] = useState("");

  const mealsCollection = collection(db, "meals");

  useEffect(() => {
    //Lager en funksjon her for å kunne bruke async
    async function fetchMeals() {
      try {
        const data = await getDocs(mealsCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as MealData[];
        console.log(filteredData);
        setMeals(filteredData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMeals();
  }, []);

  useEffect(() => {
    const filteredmeals = meals.filter((item: MealData) =>
      item.name.toLowerCase().includes(mealSearch.toLowerCase())
    );
    setMeals(filteredmeals);
  }, [mealSearch]);

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="flex flex-col bg-primary-background w-[500px] h-[600px] rounded-xl text-text">
        <div className="flex h-24 px-6 justify-center items-center bg-primary rounded-t-xl">
          <input
            className="
            p-4 w-96 h-12 rounded-xl bg-input text-primary text-xl font-medium 
            !outline-none placeholder:text-primary/70
            border-[0.5px] border-border"
            placeholder="Søk etter måltider.."
            onChange={(e) => setMealSearch(e.target.value)}
          />
        </div>
        <div>
          <div className="h-[440px] mr-2 overflow-y-auto">
            {meals.map((meal, index) => (
              <div
                key={index}
                className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
              >
                <div className="">{meal.name}</div>
                <div className="flex-grow"></div>
                <div className="pr-2">
                  <button
                    className="
                          h-7 w-14 rounded-xl text-center bg-input text-base text-primary 
                          hover:bg-input/70 transition-background-color duration-300"
                    placeholder="gram"
                  >
                    Tilpass
                  </button>
                </div>
                <div className="flex">
                  <button
                    className="
                    h-8 w-8 pb-1 flex justify-center items-center rounded-full bg-input 
                    text-primary text-2xl font-extrabold
                    hover:bg-text hover:transform duration-150"
                    onClick={() => props.addMealForThisDay(meal)}
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
          <button
            className="w-full hover:bg-white/5 rounded-bl-xl"
            onClick={() => {
              props.setSecondTab("MealCreator");
              props.setMainTab("Ingredient");
            }}
          >
            Nytt måltid
          </button>
          <button
            className="w-full hover:bg-white/5 rounded-br-xl"
            onClick={() => {
              props.setMainTab("Ingredient");
            }}
          >
            Ingredienser
          </button>
        </div>
      </div>
    </div>
  );
}
