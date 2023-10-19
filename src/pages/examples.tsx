import ThisDay from "@/components/ThisDay";
import IngredientTab from "@/components/IngredientTab";
import MealCreator from "@/components/MealCreator";
import MealTab from "@/components/MealTab";
import { IngredientData, MealData, ThisDayContentData } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Examples() {
  const [mainTab, setMainTab] = useState("Ingredient");
  const [secondTab, setSecondTab] = useState("ChosenMeals");
  const [isCreatingMeal, setIsCreatingMeal] = useState(false);

  const [ingredientsForMealCreation, setIngredientsForMealCreation] = useState<
    IngredientData[]
  >([]);
  const [contentForThisDay, setContentForThisDay] = useState<
    ThisDayContentData[]
  >([]);

  useEffect(() => {
    if (secondTab != "ChosenMeals") setIsCreatingMeal(true);
    else setIsCreatingMeal(false);
  });

  function addIngredientForMealCreation(ingredient: IngredientData) {
    setIngredientsForMealCreation((prevIngredients: IngredientData[]) => [
      ...prevIngredients,
      ingredient,
    ]);
  }
  function removeIngredientForMealCreation(index: number) {
    setIngredientsForMealCreation((prevIngredients: IngredientData[]) => {
      const updatedIngredients = [
        ...prevIngredients.slice(0, index),
        ...prevIngredients.slice(index + 1),
      ];
      return updatedIngredients;
    });
    console.log(ingredientsForMealCreation);
  }

  function addIngredientForThisDay(ingredient: IngredientData) {
    setContentForThisDay((prevIngredients: ThisDayContentData[]) => [
      ...prevIngredients,
      ingredient,
    ]);
  }
  function removeContentForThisDay(index: number) {
    setContentForThisDay((prevIngredients: ThisDayContentData[]) => {
      const updatedIngredients = [
        ...prevIngredients.slice(0, index),
        ...prevIngredients.slice(index + 1),
      ];
      return updatedIngredients;
    });
  }
  function addMealForThisDay(meal: MealData) {
    setContentForThisDay((prevMeal: ThisDayContentData[]) => [
      ...prevMeal,
      meal,
    ]);
  }

  return (
    <div className="w-screen min-h-[calc(100vh-64px)] relative top-12 bg-background flex justify-center items-center">
      <div className="flex">
        {mainTab === "Ingredient" ? (
          <IngredientTab
            setMainTab={setMainTab}
            isCreatingMeal={isCreatingMeal}
            addIngredientForThisDay={addIngredientForThisDay}
            addIngredientForMealCreation={addIngredientForMealCreation}
          />
        ) : (
          <MealTab
            setMainTab={setMainTab}
            setSecondTab={setSecondTab}
            addMealForThisDay={addMealForThisDay}
          />
        )}
        {secondTab === "ChosenMeals" ? (
          <ThisDay
            setSecondTab={setSecondTab}
            thisDayContent={contentForThisDay}
            removeIngredientForThisDay={removeContentForThisDay}
            removeMealForThisDay={removeContentForThisDay}
          />
        ) : (
          <MealCreator
            setSecondTab={setSecondTab}
            selectedIngredients={ingredientsForMealCreation}
            removeIngredient={removeIngredientForMealCreation}
          />
        )}
      </div>
    </div>
  );
}
