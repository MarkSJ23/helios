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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
export default function Diet(props: {
  type: DietType;
  foods: Awaited<ReturnType<typeof getfoods>>;
}) {
  const [userfoods, setUserfoods] = useState<typeof props.foods>([]);
  const [open, setOpen] = useState(false);
  console.log(props);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.type}</CardTitle>
      </CardHeader>
      <CardContent>
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
              <CommandInput placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {props.foods.map((food) => (
                  <CommandItem
                    key={food.id}
                    value={food.name}
                    onSelect={(currentValue) => {
                      //setUserfoods([...userfoods, food]);
                    }}
                  >
                    {food.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
