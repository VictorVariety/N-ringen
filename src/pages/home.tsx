import { useEffect, useState } from "react";

import {
  AddedIngredientType,
  IngredientType,
  MealType,
  ThisDayContentType,
} from "@/lib/types";

import ThisDay from "@/components/Tabs/ThisDayTab";
import IngredientTab from "@/components/Tabs/IngredientTab";
import MealCreator from "@/components/Tabs/MealCreatorTab";
import MealTab from "@/components/Tabs/MealTab";

export default function Home() {
  const [mainTab, setMainTab] = useState("Ingredient");
  const [secondTab, setSecondTab] = useState("ThisDay");
  const [isCreatingMeal, setIsCreatingMeal] = useState(false);
  const [editingMealIndex, setEditingMealIndex] = useState<number | null>(null);
  const [mealName, setMealName] = useState("");

  const [ingredientsForMealCreation, setIngredientsForMealCreation] = useState<
    AddedIngredientType[]
  >([]);
  const [contentForThisDay, setContentForThisDay] = useState<
    ThisDayContentType[]
  >([]);

  useEffect(() => {
    if (secondTab != "ThisDay") setIsCreatingMeal(true);
    else setIsCreatingMeal(false);
  }, [secondTab]);

  function addIngredientForMealCreation(ingredient: IngredientType) {
    const addedIngredient = {
      amount: 100,
      ingredientType: ingredient,
    };
    setIngredientsForMealCreation((prevIngredients: AddedIngredientType[]) => [
      ...prevIngredients,
      addedIngredient,
    ]);
  }

  function removeIngredientForMealCreation(index: number) {
    setIngredientsForMealCreation((prevIngredients: AddedIngredientType[]) => {
      const updatedIngredients = [
        ...prevIngredients.slice(0, index),
        ...prevIngredients.slice(index + 1),
      ];
      return updatedIngredients;
    });
  }

  function cancelMealCreation() {
    setSecondTab("ThisDay");
    setIngredientsForMealCreation([]);
  }

  function addIngredientForThisDay(ingredient: IngredientType) {
    const addedIngredient = {
      amount: 100,
      ingredientType: ingredient,
    };
    setContentForThisDay((prevIngredients: ThisDayContentType[]) => [
      ...prevIngredients,
      addedIngredient,
    ]);
  }

  function removeContentForThisDay(index: number) {
    setContentForThisDay((prevIngredients: ThisDayContentType[]) => {
      const updatedIngredients = [
        ...prevIngredients.slice(0, index),
        ...prevIngredients.slice(index + 1),
      ];
      return updatedIngredients;
    });
  }

  function addMealForThisDay(meal: MealType) {
    setContentForThisDay((prevMeal: ThisDayContentType[]) => [
      ...prevMeal,
      meal,
    ]);
  }

  return (
    <div className="w-screen h-[calc(100vh-18px)] bg-secondary flex justify-center items-center">
      <div className="flex">
        {mainTab === "Ingredient" ? (
          <IngredientTab
            isCreatingMeal={isCreatingMeal}
            setMainTab={setMainTab}
            addIngredientForThisDay={addIngredientForThisDay}
            addIngredientForMealCreation={addIngredientForMealCreation}
          />
        ) : (
          <MealTab
            setMainTab={setMainTab}
            setSecondTab={setSecondTab}
            addMealForThisDay={addMealForThisDay}
            setEditingMealIndex={setEditingMealIndex}
            setMealName={setMealName}
            setIngredientsForMealCreation={setIngredientsForMealCreation}
          />
        )}
        {secondTab === "ThisDay" ? (
          <ThisDay
            thisDayContent={contentForThisDay}
            setSecondTab={setSecondTab}
            setThisDayContent={setContentForThisDay}
            removeIngredientForThisDay={removeContentForThisDay}
            removeMealForThisDay={removeContentForThisDay}
          />
        ) : (
          <MealCreator
            selectedIngredients={ingredientsForMealCreation}
            editingMealIndex={editingMealIndex}
            mealName={mealName}
            setMealName={setMealName}
            setSelectedIngredients={setIngredientsForMealCreation}
            removeIngredient={removeIngredientForMealCreation}
            cancelMealCreation={cancelMealCreation}
            setMainTab={setMainTab}
            setSecondTab={setSecondTab}
          />
        )}
      </div>
    </div>
  );
}
