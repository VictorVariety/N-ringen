import {
  AddedIngredientType,
  ThisDayContentType,
  NutrientTotal,
  IngredientType,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { isAddedIngredientType, isMealType } from "./ThisDayList";

type Props = {
  thisDayContent: ThisDayContentType[],
};

export default function ThisDayNutrition(props: Props) {
  const [nutrients, setNutrients] = useState<NutrientTotal[]>([])

  useEffect(() => {

    function combineIngredientObjects(): { name: string, value: number, unit: string }[] {
        const combinedIngredients: { name: string, value: number, unit: string }[] = [];
        let allIngredients:AddedIngredientType[] = []
        props.thisDayContent.forEach(item => {
          if (isMealType(item)){
            item.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient)
            });
          } else if (isAddedIngredientType(item)){
            allIngredients.push(item)
          }
        });
      
        const initialValues: { [key: string]: number } = {
          Kilokalorier: 0,
          Protein: 0,
          Fett: 0,
          Karbohydrat: 0,
          TilsattSukker: 0,
          Kostfiber: 0,
          Salt: 0,
          Omega3: 0,
          Omega6: 0,
          VitaminA: 0,
          Retinol: 0,
          BetaKaroten: 0,
          VitaminD: 0,
          VitaminE: 0,
          Tiamin: 0,
          Riboflavin: 0,
          Niacin: 0,
          VitaminB6: 0,
          Folat: 0,
          VitaminB12: 0,
          VitaminC: 0,
          Kalsium: 0,
          Jern: 0,
          Natrium: 0,
          Kalium: 0,
          Magnesium: 0,
          Sink: 0,
          Selen: 0,
          Kopper: 0,
          Fosfor: 0,
          Jod: 0,
        };
      
        const combinedValues: { [key: string]: number } = { ...initialValues };
      
        allIngredients.forEach((ingredient:AddedIngredientType) => {
          for (const nutrient in initialValues) {
            const nutrientKey = nutrient as keyof IngredientType;
            if(nutrientKey === "Matvare") continue
            else{
              combinedValues[nutrient] += ((ingredient.ingredientType[nutrientKey].value * ingredient.amount / 100) * (ingredient.ingredientType["SpiseligDel"].value / 100));
            }
          }
        });
      
        for (const nutrient in combinedValues) {
          const nutrientKey = nutrient as keyof IngredientType;
          combinedIngredients.push({
            name: nutrient,
            value: combinedValues[nutrient],
            unit: allIngredients.length > 0
            ? nutrientKey === "Matvare"
              ? "" // Skip this iteration for Matvare
              : 'unit' in allIngredients[0].ingredientType[nutrientKey]
                ? (allIngredients[0].ingredientType[nutrientKey] as { unit: string }).unit
                : ""
            : ""
          
          
          
          });
        }
        combineIngredientObjects()
        console.log(combinedIngredients)
        //TTTTTTTTTTEEEEEEEEEEEEEEEESSSSSSSSSSSTTTTTTTTTTTT
        return combinedIngredients;
      }
      

  }, [props.thisDayContent])

  return <div></div>
}
