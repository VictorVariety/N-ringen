import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { NutrientsOnly } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  FemaleActiveRDA,
  FemaleEliteRDA,
  FemaleOptimalMicroNutrients,
  FemaleSedentaryRDA,
  MaleActiveRDA,
  MaleEliteRDA,
  MaleOptimalMicroNutrients,
  MaleSedentaryRDA,
  RDAPostMenopause,
  RDAPostMenopauseUpperLimits,
  RDAPregnant,
} from "@/server/RDA";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/server/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const [activityLevel, setActivityLevel] = useState(1);
  const [gender, setGender] = useState(0);
  const [isPregnant, setIsPregnant] = useState(false);
  const [hasMenopause, setHasMenopause] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {});

  async function Save() {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const profileData = CreateNutrientProfile();
      await setDoc(docRef, profileData);
    }
  }

  function CreateNutrientProfile() {
    let profile: NutrientsOnly | undefined;
    let rda: { [nutrient: string]: number } | undefined;

    switch (gender) {
      case 0:
        switch (activityLevel) {
          case 0:
            rda = { ...FemaleSedentaryRDA };
            break;
          case 1:
            rda = { ...FemaleActiveRDA };
            break;
          case 2:
            rda = { ...FemaleEliteRDA };
            break;
          default:
            return undefined;
        }
        rda = { ...rda, ...FemaleOptimalMicroNutrients };
        if (isPregnant) {
          // RESEARCH AND FIX ///////////////////////////////////////////////////////////

          // for (const nutrient in RDAPregnant) {
          //   if (nutrient in rda) {
          //     rda[nutrient] += RDAPregnant[nutrient];
          //   }
          // }

          rda.Folat += 100;
          rda.VitaminE += 3;
        }
        if (hasMenopause) {
          // RESEARCH AND FIX ///////////////////////////////////////////////////////////
          rda.Jern -= 6;
        }
        break;
      case 1:
        switch (activityLevel) {
          case 0:
            rda = { ...MaleSedentaryRDA };
            break;
          case 1:
            rda = { ...MaleActiveRDA };
            break;
          case 2:
            rda = { ...MaleEliteRDA };
            break;
        }
        rda = { ...rda, ...MaleOptimalMicroNutrients };
        break;
    }
    if (rda && rda.Protein && rda.Selen) {
      profile = rda as NutrientsOnly;
    }

    return profile;
  }

  return (
    <>
      <div className="w-screen h-screen bg-secondary flex justify-center items-center">
        <div className="mx-32 w-full h-full">
          <div>
            <div className="pt-52 flex justify-center ">
              <Slider
                defaultValue={[0]}
                step={1}
                max={1}
                value={[gender]}
                onValueChange={(e: number[]) => setGender(e[0])}
                className={cn("w-[60%]")}
              />
            </div>
            <div className="flex justify-center pt-2">
              <div className="flex justify-between items-center w-[67%] text-white">
                <div>Dame</div>
                <div>Mann</div>
              </div>
            </div>
          </div>
          <div>
            <div className="pt-24 flex justify-center ">
              <Slider
                defaultValue={[1]}
                step={1}
                max={2}
                value={[activityLevel]}
                onValueChange={(e: number[]) => setActivityLevel(e[0])}
                className={cn("w-[60%]")}
              />
            </div>
            <div className="flex justify-center pt-2">
              <div className="flex justify-between items-center w-[67%] text-white">
                <div>Lite aktiv</div>
                <div>Passe aktiv</div>
                <div>Veldig aktiv</div>
              </div>
            </div>
          </div>
          {gender === 0 ? (
            <div className="pt-24 flex items-center justify-center text-white">
              <div className="pr-8 flex">
                <div>
                  <Checkbox
                    checked={isPregnant}
                    onCheckedChange={() => setIsPregnant(!isPregnant)}
                  />
                </div>
                <div className="pl-2">Gravid eller ammer</div>
              </div>
              <div className="flex">
                <div>
                  <Checkbox
                    checked={hasMenopause}
                    onCheckedChange={() => {
                      setHasMenopause(!hasMenopause);
                    }}
                  />
                </div>
                <div className="pl-2">Opplevd overgangsalderen</div>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="pt-8 flex justify-center">
            <Button onClick={() => Save()} className="w-24 h-12 text-white">
              Lagre
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
