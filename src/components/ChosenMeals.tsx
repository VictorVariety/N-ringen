import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ChosenMeals() {
  const [date, setDate] = useState(new Date());
  const [currentMeals, setCurrentMeals] = useState(["bla", "ble"]);

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="w-[400px] h-[600px] rounded-xl flex flex-col bg-primary-background  text-text">
        <div className="h-24 px-6 rounded-t-xl flex justify-center items-center bg-primary ">
          <DatePicker
            selectsStart
            selected={date}
            onChange={(date: Date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
            className="rounded-xl bg-input !outline-none text-primary/70 text-xl font-medium text-center"
          />
        </div>
        <div>
          <div className="h-[440px] mr-2 overflow-y-auto">
            {currentMeals.map((meal, index) => (
              <div
                key={index}
                className={`flex p-1 ml-6 mr-2 items-center text-text text-xl border-border
            ${
              index % 2 === 0
                ? "bg-card-even border-b-[0.5px]"
                : "bg-card-odd border-b-[0.5px] "
            } 
            `}
              >
                <div className="">{meal}</div>
                <div className="flex-grow"></div>
                <div className="pr-2">
                  <input
                    className="h-7 w-14 rounded-xl text-center bg-input text-primary 
                  placeholder:text-primary placeholder:text-base !outline-none"
                    type="number"
                    placeholder="gram"
                  />
                </div>
                <div className="flex">
                  <button
                    className="
                h-8 w-8 pb-2 flex justify-center items-center rounded-full bg-input 
                text-primary text-2xl font-bold
                hover:bg-text hover:transform duration-150"
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow border-b mx-6"></div>
        <div className="w-full h-16 flex justify-around bg-primary text-xl font-medium rounded-b-xl">
          <button className="w-full hover:bg-white/5 rounded-bl-xl">
            New meal
          </button>
          <button className="w-full hover:bg-white/5 rounded-br-xl">
            Ingredient picker
          </button>
        </div>
      </div>
    </div>
  );
}
