import {
  AddedIngredient,
  ThisDayContentType,
  NutrientsOnly,
  NutrientTotalForRecharts,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { isAddedIngredientType, isMealType } from "./ThisDayList";

type Props = {
  thisDayContent: ThisDayContentType[];
};

export default function ThisDayNutrition(props: Props) {
  const [nutrients, setNutrients] = useState<NutrientTotalForRecharts[]>([]);

  useEffect(() => {
    function CombineAndFormatIngredients(): NutrientTotalForRecharts[] {
      let allIngredients: AddedIngredient[] = [];
      props.thisDayContent.forEach((item: ThisDayContentType) => {
        if (isMealType(item)) {
          item.ingredients.forEach((ingredient) => {
            console.log("ingredient in MealType");
            console.log(ingredient);
            allIngredients.push(ingredient as AddedIngredient);
          });
        } else if (isAddedIngredientType(item)) {
          allIngredients.push(item as AddedIngredient);
          console.log("ingredient in AddedIngredient");
          console.log(item);
        }
      });
      console.log("allIngredients");
      console.log(allIngredients);
      console.log("-------------");

      let initialValues: { [key: string]: { value: number; unit: string } } = {
        Kcal: { value: 0, unit: "kcal" },
        Protein: { value: 0, unit: "g" },
        Fett: { value: 0, unit: "g" },
        Karbohydrat: { value: 0, unit: "g" },
        TilsattSukker: { value: 0, unit: "g" },
        Kostfiber: { value: 0, unit: "g" },
        Salt: { value: 0, unit: "g" },
        Omega3: { value: 0, unit: "g" },
        Omega6: { value: 0, unit: "g" },
        VitaminA: { value: 0, unit: "RAE" },
        Retinol: { value: 0, unit: "µg" },
        BetaKaroten: { value: 0, unit: "µg" },
        VitaminD: { value: 0, unit: "µg" },
        VitaminE: { value: 0, unit: "alfa-TE" },
        Tiamin: { value: 0, unit: "mg" },
        Riboflavin: { value: 0, unit: "mg" },
        Niacin: { value: 0, unit: "mg" },
        VitaminB6: { value: 0, unit: "mg" },
        Folat: { value: 0, unit: "µg" },
        VitaminB12: { value: 0, unit: "µg" },
        VitaminC: { value: 0, unit: "mg" },
        Kalsium: { value: 0, unit: "mg" },
        Jern: { value: 0, unit: "mg" },
        Natrium: { value: 0, unit: "mg" },
        Kalium: { value: 0, unit: "mg" },
        Magnesium: { value: 0, unit: "mg" },
        Sink: { value: 0, unit: "mg" },
        Selen: { value: 0, unit: "µg" },
        Kopper: { value: 0, unit: "mg" },
        Fosfor: { value: 0, unit: "mg" },
        Jod: { value: 0, unit: "µg" },
      };

      allIngredients.forEach((ingredient: AddedIngredient) => {
        // console.log("ingredient");
        // console.log(ingredient);
        // console.log("//////////////////////////////////////////");
        for (let key in ingredient.nutrients) {
          console.log("key");
          console.log(key);
          console.log("ingredient.nutrients[key as keyof NutrientsOnly]");
          console.log(ingredient.nutrients[key as keyof NutrientsOnly]);
          console.log("//////////////////////////////////////////");
          initialValues[key].value +=
            ((ingredient.nutrients[key as keyof NutrientsOnly] *
              ingredient.amount) /
              100) *
            (ingredient.consumablePercentage / 100);
        }
      });

      const formatForResharp: NutrientTotalForRecharts[] = Object.keys(
        initialValues
      ).map((key) => ({
        name: key,
        value: initialValues[key].value,
        unit: initialValues[key].unit,
      }));

      console.log("formatForResharp");
      console.log(formatForResharp);
      console.log("-------------");
      return formatForResharp;
    }
    setNutrients(CombineAndFormatIngredients());
  }, [props.thisDayContent]);

  return <div></div>;
}
