export type ThisDayContentType = Meal | AddedIngredient;

export type Meal = {
  id: string;
  name: string;
  ingredients: AddedIngredient[];
};

export type AddedIngredient = {
  name: string;
  amount: number;
  consumablePercentage: number;
  nutrients: NutrientsOnly;
};

export type NutrientsOnly = {
  Kilokalorier: number;
  Protein: number;
  Fett: number;
  Karbohydrat: number;
  TilsattSukker: number;
  Kostfiber: number;
  Salt: number;
  Omega3: number;
  Omega6: number;
  VitaminA: number;
  Retinol: number;
  BetaKaroten: number;
  VitaminD: number;
  VitaminE: number;
  Tiamin: number;
  Riboflavin: number;
  Niacin: number;
  VitaminB6: number;
  Folat: number;
  VitaminB12: number;
  VitaminC: number;
  Kalsium: number;
  Jern: number;
  Natrium: number;
  Kalium: number;
  Magnesium: number;
  Sink: number;
  Selen: number;
  Kopper: number;
  Fosfor: number;
  Jod: number;
};
// export type NutrientsOnly = {
//   Kilokalorier: { value: number; unit: "kcal" };
//   Protein: { value: number; unit: "g" };
//   Fett: { value: number; unit: "g" };
//   Karbohydrat: { value: number; unit: "g" };
//   TilsattSukker: { value: number; unit: "g" };
//   Kostfiber: { value: number; unit: "g" };
//   Salt: { value: number; unit: "g" };
//   Omega3: { value: number; unit: "g" };
//   Omega6: { value: number; unit: "g" };
//   VitaminA: { value: number; unit: "RAE" };
//   Retinol: { value: number; unit: "µg" };
//   BetaKaroten: { value: number; unit: "µg" };
//   VitaminD: { value: number; unit: "µg" };
//   VitaminE: { value: number; unit: "alfa-TE" };
//   Tiamin: { value: number; unit: "mg" };
//   Riboflavin: { value: number; unit: "mg" };
//   Niacin: { value: number; unit: "mg" };
//   VitaminB6: { value: number; unit: "mg" };
//   Folat: { value: number; unit: "µg" };
//   VitaminB12: { value: number; unit: "µg" };
//   VitaminC: { value: number; unit: "mg" };
//   Kalsium: { value: number; unit: "mg" };
//   Jern: { value: number; unit: "mg" };
//   Natrium: { value: number; unit: "mg" };
//   Kalium: { value: number; unit: "mg" };
//   Magnesium: { value: number; unit: "mg" };
//   Sink: { value: number; unit: "mg" };
//   Selen: { value: number; unit: "µg" };
//   Kopper: { value: number; unit: "mg" };
//   Fosfor: { value: number; unit: "mg" };
//   Jod: { value: number; unit: "µg" };
// };

export type Ingredient = {
  Matvare: string;
  SpiseligDel: number;
  Kilokalorier: number;
  Protein: number;
  Fett: number;
  Karbohydrat: number;
  TilsattSukker: number;
  Kostfiber: number;
  Salt: number;
  Omega3: number;
  Omega6: number;
  VitaminA: number;
  Retinol: number;
  BetaKaroten: number;
  VitaminD: number;
  VitaminE: number;
  Tiamin: number;
  Riboflavin: number;
  Niacin: number;
  VitaminB6: number;
  Folat: number;
  VitaminB12: number;
  VitaminC: number;
  Kalsium: number;
  Jern: number;
  Natrium: number;
  Kalium: number;
  Magnesium: number;
  Sink: number;
  Selen: number;
  Kopper: number;
  Fosfor: number;
  Jod: number;
};

export type NutrientTotalForRecharts = {
  name: string;
  value: number;
  unit: string;
};
