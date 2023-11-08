import { useEffect, useState } from "react";

import {
  AddedIngredient,
  Ingredient,
  Meal,
  ThisDayContentType,
} from "@/lib/types";

import ThisDayTab from "@/components/Tabs/ThisDayTab";
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
    AddedIngredient[]
  >([]);
  const [contentForThisDay, setContentForThisDay] = useState<
    ThisDayContentType[]
  >([]);

  useEffect(() => {
    if (secondTab != "ThisDay") setIsCreatingMeal(true);
    else setIsCreatingMeal(false);
  }, [secondTab]);

  // function removeMatvareAndSpiseligDelFromIngredient(
  //   ingredient: Ingredient
  // ): Omit<Ingredient, "Matvare" | "SpiseligDel"> {
  //   const { Matvare, SpiseligDel, ...rest } = ingredient;
  //   return rest;
  // }

  function formatToAddedIngredient(ingredient: Ingredient): AddedIngredient {
    const { Matvare, SpiseligDel, ...rest } = ingredient;
    console.log("format ingredient");
    console.log(ingredient.SpiseligDel);
    console.log("//////////////////////////////");
    const addedIngredient = {
      name: ingredient.Matvare,
      amount: 100,
      consumablePercentage: ingredient.SpiseligDel,
      nutrients: rest,
    };
    console.log("addedIngredient format");
    console.log(addedIngredient);
    return addedIngredient;
  }

  function addIngredientForMealCreation(ingredient: Ingredient) {
    const addedIngredient = formatToAddedIngredient(ingredient);
    console.log("add ingredient post conversion");
    console.log(addedIngredient);
    console.log("//////////////////////////////////////////");
    setIngredientsForMealCreation((prevIngredients: AddedIngredient[]) => [
      ...prevIngredients,
      addedIngredient,
    ]);
  }

  function removeIngredientForMealCreation(index: number) {
    setIngredientsForMealCreation((prevIngredients: AddedIngredient[]) => {
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

  function addIngredientForThisDay(ingredient: Ingredient) {
    const addedIngredient = formatToAddedIngredient(ingredient);

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

  function addMealForThisDay(meal: Meal) {
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
          <ThisDayTab
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
