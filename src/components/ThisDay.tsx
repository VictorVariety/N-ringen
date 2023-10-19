import { IngredientData, MealData, ThisDayContentData } from "@/lib/types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  setSecondTab: (f: string) => void;
  thisDayContent: ThisDayContentData[];
  removeIngredientForThisDay: (index: number) => void;
  removeMealForThisDay: (index: number) => void;
};

function isMealData(item: MealData | IngredientData): item is MealData {
  return (item as MealData).name !== undefined;
}

export default function ThisDay(props: Props) {
  const [date, setDate] = useState(new Date());
  const [thisDayContent, setThisDayContent] = useState<ThisDayContentData[]>(
    []
  );

  useEffect(() => {
    setThisDayContent(props.thisDayContent);
  }, [props.thisDayContent]);

  return (
    <div className="p-6 bg-backgroundBorder rounded-xl">
      <div className="w-[500px] h-[600px] rounded-xl flex flex-col bg-primary-background  text-text">
        <div className="h-24 px-6 rounded-t-xl flex justify-center items-center bg-primary ">
          <DatePicker
            selectsStart
            selected={date}
            onChange={(date: Date) => setDate(date)}
            dateFormat="dd.MM.yyyy"
            className="rounded-xl bg-input !outline-none text-primary/70 text-xl font-medium text-center"
          />
        </div>
        <div>
          <div className="h-[440px] mr-2 overflow-y-auto">
            {thisDayContent.map((item, index) => (
              <div
                key={index}
                className="flex p-1 ml-6 mr-2 items-center text-text text-xl border-border"
              >
                {isMealData(item) ? (
                  // MealData
                  <>
                    <div>{item.name}</div>
                    <div className="flex-grow"></div>
                    <div className="pr-2">
                      <button
                        className="
                          h-7 w-14 rounded-xl text-center bg-input text-base text-primary 
                          hover:bg-input/70 transition-background-color duration-300"
                        placeholder="gram"
                      >
                        Tilpass
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        className="
                          h-8 w-8 pb-2 flex justify-center items-center rounded-full bg-input 
                          text-primary text-2xl font-bold
                          hover:bg-text hover:transform duration-150"
                        onClick={() => props.removeMealForThisDay(index)}
                      >
                        x
                      </button>
                    </div>
                  </>
                ) : (
                  // IngredientData
                  <>
                    <div>{item.Matvare}</div>
                    <div className="flex-grow"></div>
                    <div className="pr-2">
                      <input
                        className="
                          h-7 w-14 rounded-xl text-center bg-input text-base text-primary 
                          placeholder:text-primary !outline-none"
                        placeholder="g/mL"
                      />
                    </div>
                    <div className="flex">
                      <button
                        className="
                          h-8 w-8 pb-2 flex justify-center items-center rounded-full bg-input 
                          text-primary text-2xl font-bold
                          hover:bg-text hover:transform duration-150"
                        onClick={() => props.removeIngredientForThisDay(index)}
                      >
                        x
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow border-b mx-6"></div>
        <div className="w-full h-16 flex justify-around bg-primary text-xl font-medium rounded-b-xl">
          <button className="w-full hover:bg-white/5 rounded-bl-xl">
            Næringsinnhold
          </button>
          <button
            className="w-full hover:bg-white/5 rounded-br-xl"
            onClick={() => console.log(thisDayContent)}
          >
            ???
          </button>
        </div>
      </div>
    </div>
  );
}
