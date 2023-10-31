import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {
  index: number;
  RemoveMeal: (index: number) => void;
  CloneMeal: (index: number) => void;
};

export default function MealDropdown(props: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center">
        <GiHamburgerMenu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="fixed right-[-18px] bg-input text-primary">
        <DropdownMenuItem className="cursor-pointer text-lg">
          Endre
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer text-lg"
          onClick={() => props.CloneMeal(props.index)}
        >
          Klone
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-lg"
          onClick={() => props.RemoveMeal(props.index)}
        >
          Slett
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
