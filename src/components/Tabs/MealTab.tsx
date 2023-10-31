import { MealType } from "@/lib/types";
import { auth, db } from "@/server/firebaseConfig";
import { DocumentData, DocumentReference, setDoc } from "firebase/firestore";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import MealDropdown from "./components/MealDropdown";

type Props = {
  setMainTab: (tab: string) => void;
  setSecondTab: (tab: string) => void;
  addMealForThisDay: (meal: MealType) => void;
  setEditingMealIndex: (index: number | null) => void;
};

export default function MealTab(props: Props) {
  const [userDocRef, setUserDocRef] = useState<
    DocumentReference<DocumentData> | undefined
  >();
  const [userData, setUserData] = useState<DocumentData | undefined>();
  const [meals, setMeals] = useState<MealType[]>([]);
  const [mealsResult, setResultMeals] = useState<MealType[]>([]);
  const [mealSearch, setMealSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);

  async function fetchMeals() {
    try {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userData = (await getDoc(docRef)).data() as
          | DocumentData
          | undefined;
        setUserDocRef(docRef);
        setUserData(userData);

        if (userData && userData.meals) {
          console.log(userData.meals);
          const filteredData = userData.meals.map(
            (element: any, index: number) => ({
              ...element,
              id: index,
            })
          ) as MealType[];
          setMeals(filteredData);
          setResultMeals(filteredData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function RemoveMeal(index: number) {
    let newMeals = meals.filter((_, i) => i !== index);
    console.log(newMeals);
    if (userData && userData.meals && userData.history && userDocRef) {
      const updatedUserData = { meals: newMeals, history: userData.history };
      await setDoc(userDocRef, updatedUserData);
    }
    fetchMeals();
  }
  async function CloneMeal(index: number) {
    const meal = meals[index];
    console.log(meal);
    if (userData && userData.meals && userData.history && userDocRef) {
      const updatedMeals = [...userData.meals, meal];
      console.log(updatedMeals);
      const updatedUserData = {
        meals: updatedMeals,
        history: userData.history,
      };
      console.log(updatedUserData);
      await setDoc(userDocRef, updatedUserData);
    }
    fetchMeals();
  }
  function EditMeal(index: number) {
    props.setMainTab("Ingredient");
    props.setSecondTab("MealCreator");
    props.setEditingMealIndex(index);
  }

  useEffect(() => {
    fetchMeals();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const filteredmeals = meals.filter((item: MealType) =>
      item.name.toLowerCase().includes(mealSearch.toLowerCase())
    );
    setResultMeals(filteredmeals);
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
                {mealsResult.map((meal, index) => (
                  <div
                    key={index}
                    className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
                  >
                    <div className="">{meal.name}</div>
                    <div className="flex-grow"></div>
                    <div className="pr-2">
                      <MealDropdown
                        index={index}
                        RemoveMeal={RemoveMeal}
                        CloneMeal={CloneMeal}
                      />
                    </div>
                    {/* <div className="pr-2">
                      <button
                        className="
                        h-8 w-8 rounded-xl flex items-center justify-center bg-transparent
                        text-input hover:bg-input hover:text-primary transition-background-color duration-300"
                      >
                        <GiHamburgerMenu />
                      </button>
                    </div> */}
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
