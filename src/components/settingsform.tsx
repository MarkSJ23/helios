"use client";

import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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

const formSchema = z.object({
  age: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
  height: z.coerce.number().positive(),
  targetCalories: z.coerce.number().positive(),
});

export function SettingsForm(props: {
  age: number;
  weight: number;
  height: number;
  targetCalories: number;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props,
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    upsertUserInfo(data.age, data.weight, data.height, data.targetCalories);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-2">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight(kg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Weight" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height(cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Height" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetCalories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Calories</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Target Calories" {...field} />
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
  );

  //   return (
  //     <form className="flex w-1/2 grow-0 flex-col gap-2">
  //       <Label htmlFor="age">Age</Label>
  //       <Input required={true} type="number" id="age" placeholder="Age" />

  //       <Label htmlFor="weight">Weight(kg)</Label>
  //       <Input required={true} type="number" id="weight" placeholder="Weight" />

  //       <Label htmlFor="height">Height(m)</Label>
  //       <Input required={true} type="number" id="height" placeholder="Height" />

  //       <Label htmlFor="target-calories" ries>
  //         Target Calories
  //       </Label>
  //       <Input
  //         required={true}
  //         type="number"
  //         id="target-calories"
  //         placeholder="Target Calories"
  //       />

  //       <Button type="submit">Save</Button>
  //     </form>
  //   );
}
