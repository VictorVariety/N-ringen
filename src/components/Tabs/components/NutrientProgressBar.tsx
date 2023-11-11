import { Progress } from "@/components/ui/progress";
import { NutrientTotalForRecharts } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
  nutrient: NutrientTotalForRecharts;
};

export default function NutrientProgressBar(props: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(props.nutrient.value), 600);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <div className="flex">
        <div>{props.nutrient.name}</div>
        <div>{props.nutrient.value}</div>
        <div>{props.nutrient.unit}</div>
      </div>
      <Progress value={progress} />
    </>
  );
}
