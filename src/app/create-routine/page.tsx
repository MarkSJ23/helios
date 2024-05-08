"use client";

import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Textarea } from "~/components/ui/textarea";
import { insertRoutine } from "~/server/actions";
import { useRouter } from "next/navigation";

const exercisesSchema = z.object({
  exercise: z.string().max(256).min(1),
});

const formSchema = z.object({
  name: z.string().max(256).min(1),
  targetMuscles: z.string().max(256).min(1),
  notes: z.string().max(512).min(1),
  exercises: z.array(exercisesSchema),
});

export default function CreateRoutine() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const {
    fields: exercisesFields,
    append: exercisesAppend,
    remove: exercisesRemove,
  } = useFieldArray({
    control: form.control,
    name: "exercises",
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const exercisesArray = data.exercises.map((e) => e.exercise);
    insertRoutine(data.name, data.targetMuscles, data.notes, exercisesArray);
    router.push("/routine");
  }

  return (
    <main className="flex grow flex-col items-center p-4">
      <div className="grow-0 text-center text-7xl font-black text-green-700">
        Create Routine
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetMuscles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Muscles</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Target Muscles" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>Exercises</FormLabel>
          {exercisesFields.map((exercise, index) => (
            <div key={exercise.id} className="flex justify-between">
              <FormField
                control={form.control}
                name={`exercises.${index}.exercise`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Exercise" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  exercisesRemove(index);
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
            </div>
          ))}
          <Button
            onClick={() => {
              exercisesAppend({ exercise: "" });
            }}
          >
            Add Exercise
          </Button>

          <Button className="w-full" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </main>
  );
}
