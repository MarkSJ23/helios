"use client";

import { useState } from "react";
import { db } from "~/server/db";
import { DietType, foods } from "~/server/db/schema";
import { getfoods, getdiets } from "~/server/queries";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { upsertUserInfo } from "~/server/actions";

import { useRouter } from "next/navigation";
import { deletediet, insertdiet, updatediet } from "~/server/actions";
import { Button } from "./ui/button";
export function Diet(props: {
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
          className="w-full justify-between"
        >
          Search Foods
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Food..." />
          <CommandEmpty>No food found</CommandEmpty>
          <CommandGroup className="h-40 overflow-y-auto">
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

const formSchema = z.object({
  quantity: z.coerce.number().positive(),
});

export function DietButtons(props: {
  diet: Awaited<ReturnType<typeof getdiets>>[number];
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: props.diet.quantity,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    updatediet(props.diet.id, data.quantity);
    router.refresh();
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="h-4 w-4"></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Quantity</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity(g/ml)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Button
        className="h-4 w-4"
        variant="destructive"
        size="icon"
        onClick={() => {
          deletediet(props.diet.id);
          router.refresh();
        }}
      ></Button>
    </>
  );
}
