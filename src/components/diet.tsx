"use client";

import { useState } from "react";
import { db } from "~/server/db";
import { DietType, foods } from "~/server/db/schema";
import { getfoods } from "~/server/queries";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { useRouter } from "next/navigation";
import { insertdiet } from "~/server/actions";
export default function Diet(props: {
  type: DietType;
  foods: Awaited<ReturnType<typeof getfoods>>;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Search Foods
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Food..." />
          <CommandEmpty>No food found</CommandEmpty>
          <CommandGroup>
            {props.foods.map((food) => (
              <CommandItem
                key={food.id}
                value={food.name}
                onSelect={(currentValue) => {
                  setOpen(false);

                  if (food.isPerGrams) {
                    insertdiet(food.id, props.type, 100);
                  } else {
                    insertdiet(food.id, props.type, 1);
                  }
                  router.refresh();
                }}
              >
                {food.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
