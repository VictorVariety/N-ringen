import ChosenMeals from "@/components/ChosenMeals";
import IngredientTab from "@/components/IngredientTab";
import MealTab from "@/components/MealTab";
import { useState } from "react";

export default function Examples() {
  const [mainTab, setMainTab] = useState("Ingredient");

  return (
    <div className="w-screen min-h-[calc(100vh-64px)] relative top-12 bg-background flex justify-center items-center">
      <div className="flex">
        {mainTab === "Ingredient" ? (
          <IngredientTab setMainTab={setMainTab} />
        ) : (
          <MealTab setMainTab={setMainTab} />
        )}
        <ChosenMeals />
      </div>
    </div>
  );
}
