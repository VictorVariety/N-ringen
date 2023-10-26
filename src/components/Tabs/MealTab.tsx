import { MealType } from "@/lib/types";
import { auth, db } from "@/server/firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
  setMainTab: (tab: string) => void;
  setSecondTab: (tab: string) => void;
  addMealForThisDay: (meal: MealType) => void;
};

export default function MealTab(props: Props) {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [mealSearch, setMealSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    //Lager en funksjon her for å kunne bruke async
    async function fetchMeals() {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const userMeals = (await getDoc(docRef)).data();

          if (userMeals && userMeals.meals) {
            const mealsArray = userMeals.meals;

            const filteredData = userMeals.meals.map(
              (element: any, index: number) => ({
                ...element,
                id: index,
              })
            ) as MealType[];
            setMeals(filteredData);
          }
        }

        /*  */

        //
      } catch (err) {
        console.log(err);
      }
    }
    fetchMeals();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const filteredmeals = meals.filter((item: MealType) =>
      item.name.toLowerCase().includes(mealSearch.toLowerCase())
    );
    setMeals(filteredmeals);
  }, [mealSearch]);

  //

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
            {isLoading ? (
              <div className="flex items-center justify-center pt-44 text-xl">
                Laster...
              </div>
            ) : (
              <>
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
                        h-8 w-8 rounded-xl flex items-center justify-center bg-transparent
                        text-input hover:bg-input hover:text-primary transition-background-color duration-300"
                      >
                        <GiHamburgerMenu />
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        className="
                        h-8 w-8 rounded-xl flex items-center justify-center bg-transparent
                        text-input hover:bg-input hover:text-primary transition-background-color duration-300"
                        onClick={() => props.addMealForThisDay(meal)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
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
