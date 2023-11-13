import {
  AddedIngredient,
  ThisDayContentType,
  NutrientsOnly,
  NutrientTotalForRecharts,
} from "@/lib/types";
import { useEffect, useState } from "react";
import { isAddedIngredientType, isMealType } from "./ThisDayList";
import NutrientProgressBar from "./NutrientProgressBar";

type Props = {
  thisDayContent: ThisDayContentType[];
};

export default function ThisDayNutrition(props: Props) {
  const [nutrients, setNutrients] = useState<NutrientTotalForRecharts[]>([]);

  useEffect(() => {});

  useEffect(() => {
    function CombineAndFormatIngredients(): NutrientTotalForRecharts[] {
      let allIngredients: AddedIngredient[] = [];
      props.thisDayContent.forEach((item: ThisDayContentType) => {
        if (isMealType(item)) {
          item.ingredients.forEach((ingredient) => {
            allIngredients.push(ingredient as AddedIngredient);
          });
        } else if (isAddedIngredientType(item)) {
          allIngredients.push(item as AddedIngredient);
        }
      });

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
        Tiamin: { value: 0, unit: "mg" },
        Riboflavin: { value: 0, unit: "mg" },
        Niacin: { value: 0, unit: "mg" },
        VitaminB6: { value: 0, unit: "mg" },
        Folat: { value: 0, unit: "µg" },
        VitaminB12: { value: 0, unit: "µg" },
        VitaminC: { value: 0, unit: "mg" },
        VitaminD: { value: 0, unit: "µg" },
        VitaminE: { value: 0, unit: "alfa-TE" },
        Jern: { value: 0, unit: "mg" },
        Kalsium: { value: 0, unit: "mg" },
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
        console.log("ingredient");
        console.log(ingredient);
        console.log("//////////////////////////////////////////");
        for (let key in ingredient.nutrients) {
          console.log(key);
          console.log("ingredient.nutrients[key as keyof NutrientsOnly]");
          console.log(ingredient.nutrients[key as keyof NutrientsOnly]);
          console.log("//////////////////////////////////////////");
          initialValues[key].value += Math.round(
            ((ingredient.nutrients[key as keyof NutrientsOnly] *
              ingredient.amount) /
              100) *
              (ingredient.consumablePercentage / 100)
          );
        }
      });

      const formatForRechart: NutrientTotalForRecharts[] = Object.keys(
        initialValues
      ).map((key) => ({
        name: key,
        value: initialValues[key].value,
        unit: initialValues[key].unit,
      }));

      console.log("formatForRechart");
      console.log(formatForRechart);
      console.log("-------------");
      return formatForRechart;
    }
    console.log(CombineAndFormatIngredients());
    setNutrients(CombineAndFormatIngredients());
  }, [props.thisDayContent]);

  console.log(nutrients[0]);

  return (
    <>
      <NutrientProgressBar nutrient={nutrients[0]} />
    </>
  );
}
