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
          <Button size="icon" variant="ghost" className="h-4 w-4">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
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
        variant="ghost"
        size="icon"
        onClick={() => {
          deletediet(props.diet.id);
          router.refresh();
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </Button>
    </>
  );
}
