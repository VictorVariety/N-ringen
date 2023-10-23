import { useEffect, useState } from "react";

import {
  AddedIngredientData,
  IngredientData,
  MealData,
  ThisDayContentData,
} from "@/lib/types";

import ThisDay from "@/components/Tabs/ThisDayTab";
import IngredientTab from "@/components/Tabs/IngredientTab";
import MealCreator from "@/components/Tabs/MealCreatorTab";
import MealTab from "@/components/Tabs/MealTab";

export default function Home() {
  const [mainTab, setMainTab] = useState("Ingredient");
  const [secondTab, setSecondTab] = useState("ChosenMeals");
  const [isCreatingMeal, setIsCreatingMeal] = useState(false);

  const [ingredientsForMealCreation, setIngredientsForMealCreation] = useState<
    AddedIngredientData[]
  >([]);
  const [contentForThisDay, setContentForThisDay] = useState<
    ThisDayContentData[]
  >([]);

  useEffect(() => {
    if (secondTab != "ChosenMeals") setIsCreatingMeal(true);
    else setIsCreatingMeal(false);
  });

  function addIngredientForMealCreation(
    ingredient: IngredientData,
    amount: number
  ) {
    const addedIngredient = {
      amount: amount,
      ingredientData: ingredient,
    };
    setIngredientsForMealCreation((prevIngredients: AddedIngredientData[]) => [
      ...prevIngredients,
      addedIngredient,
    ]);
  }

  function removeIngredientForMealCreation(index: number) {
    setIngredientsForMealCreation((prevIngredients: AddedIngredientData[]) => {
      const updatedIngredients = [
        ...prevIngredients.slice(0, index),
        ...prevIngredients.slice(index + 1),
      ];
      return updatedIngredients;
    });
  }

  function resetIngredientsForMealCreation() {
    setIngredientsForMealCreation([]);
  }

  function addIngredientForThisDay(ingredient: IngredientData, amount: number) {
    const addedIngredient = {
      amount: amount,
      ingredientData: ingredient,
    };
    setContentForThisDay((prevIngredients: ThisDayContentData[]) => [
      ...prevIngredients,
      addedIngredient,
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
            resetIngredientsForMealCreation={resetIngredientsForMealCreation}
          />
        )}
      </div>
    </div>
  );
}
