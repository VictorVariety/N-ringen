export default function IngredientPicker() {
  const ingredients = ["Fruits", "Vegetables", "Meats", "Grains"];

  return (
    <div className="flex flex-col bg- w-[400px] h-[600px] rounded-3xl">
      <div className="flex p-6 justify-center items-center">
        <input className="p-4 w-96 h-12 rounded-full" />
      </div>
      <div>
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className={`flex p-2 items-center text-white text-lg ${
              index % 2 === 0 ? "bg-slate-500" : "bg-slate-600"
            } `}
          >
            <div>{ingredient}</div>
            <div className="flex-grow"></div>
            <div className="pr-2">
              <input
                className="h-8 w-16 rounded-full text-center text-black"
                type="number"
                placeholder="grams"
              />
            </div>
            <div className="flex">
              <button className="h-8 w-8 rounded-full bg-white"></button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-grow"></div>
      <div className="flex justify-around bg-white w-full h-16 rounded-br-3xl rounded-bl-3xl">
        <button>New ingredient</button>
        <button>Meal picker</button>
      </div>
    </div>
  );
}
