type Props = {
  amount: number | string;
  index: number;
  changeIngredientAmount: (index: number, newValue: number | "NaN") => void;
};

export default function AmountInput(props: Props) {
  return (
    <div className="flex pr-2 rounded-[5px] bg-secondary ">
      <input
        className="
            h-8 w-12 rounded-xl text-center bg-secondary text-text font-semibold 
            !outline-none"
        type="number"
        value={props.amount}
        onChange={(e) => {
          props.changeIngredientAmount(props.index, parseFloat(e.target.value));
        }}
        onFocus={(e) => e.target.select()}
        onBlur={(e) => {
          if (isNaN(parseFloat(e.target.value))) {
            props.changeIngredientAmount(props.index, 0);
          }
        }}
      />
      <div className="text-base pt-[5px]">g/ml</div>
    </div>
  );
}
