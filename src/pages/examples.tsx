import IngredientPicker from "@/components/IngredientPicker";

export default function Examples() {
  return (
    <div className="w-screen min-h-[calc(100vh-64px)] relative top-12 bg-blue-950 flex justify-center items-center">
      <div className="flex">
        <IngredientPicker />
      </div>
    </div>
  );
}
