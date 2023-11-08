import { Ingredient } from "@/lib/types";

export async function getIngredients() {
  try {
    const response = await fetch("src/server/Matvarer.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const ingredients: Ingredient[] = data;

    return ingredients;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    throw error;
  }
}
