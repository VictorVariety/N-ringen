export type ThisDayContentData = MealData | AddedIngredientData;

export type MealData = {
  id: string;
  name: string;
  ingredients: IngredientData[];
};

export type AddedIngredientData = {
  amount: number;
  ingredientData: IngredientData;
};

export type IngredientData = {
  Matvare: string;
  SpiseligDel: { value: number; unit: "%" };
  Kilokalorier: { value: number; unit: "kcal" };
  Protein: { value: number; unit: "g" };
  Fett: { value: number; unit: "g" };
  Karbohydrat: { value: number; unit: "g" };
  TilsattSukker: { value: number; unit: "g" };
  Kostfiber: { value: number; unit: "g" };
  Salt: { value: number; unit: "g" };
  Omega3: { value: number; unit: "g" };
  Omega6: { value: number; unit: "g" };
  VitaminA: { value: number; unit: "RAE" };
  Retinol: { value: number; unit: "µg" };
  BetaKaroten: { value: number; unit: "µg" };
  VitaminD: { value: number; unit: "µg" };
  VitaminE: { value: number; unit: "alfa-TE" };
  Tiamin: { value: number; unit: "mg" };
  Riboflavin: { value: number; unit: "mg" };
  Niacin: { value: number; unit: "mg" };
  VitaminB6: { value: number; unit: "mg" };
  Folat: { value: number; unit: "µg" };
  VitaminB12: { value: number; unit: "µg" };
  VitaminC: { value: number; unit: "mg" };
  Kalsium: { value: number; unit: "mg" };
  Jern: { value: number; unit: "mg" };
  Natrium: { value: number; unit: "mg" };
  Kalium: { value: number; unit: "mg" };
  Magnesium: { value: number; unit: "mg" };
  Sink: { value: number; unit: "mg" };
  Selen: { value: number; unit: "µg" };
  Kopper: { value: number; unit: "mg" };
  Fosfor: { value: number; unit: "mg" };
  Jod: { value: number; unit: "µg" };
};
