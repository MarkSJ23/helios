"use server";

import { db } from "./db";
import {
  diet,
  DietType,
  dietType,
  routine,
  userData,
  workoutLog,
} from "./db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function insertdiet(
  food_id: number,
  type: DietType,
  quantity: number,
) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db.insert(diet).values({
    foodId: food_id,
    userId: user.userId,
    type: type,
    quantity: quantity,
  });
}
export async function updatediet(id: number, quantity: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .update(diet)
    .set({
      quantity: quantity,
    })
    .where(and(eq(diet.userId, user.userId), eq(diet.id, id)));
}

export async function deletediet(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .delete(diet)
    .where(and(eq(diet.userId, user.userId), eq(diet.id, id)));
}

export async function updateSquatleaderboard(squatHighScore: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .update(userData)
    .set({
      squatHighScore: squatHighScore,
    })
    .where(eq(userData.userId, user.userId));
}

export async function updatePushUpleaderboard(pushUpHighScore: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .update(userData)
    .set({
      pushUpHighScore: pushUpHighScore,
    })
    .where(eq(userData.userId, user.userId));
}

export async function upsertUserInfo(
  age: number,
  weight: number,
  height: number,
  calorie_target: number,
) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .insert(userData)
    .values({
      userId: user.userId,
      weight: weight,
      height: height,
      age: age,
      calorieTarget: calorie_target,
    })
    .onConflictDoUpdate({
      target: userData.userId,
      set: {
        weight: weight,
        height: height,
        age: age,
        calorieTarget: calorie_target,
      },
    });
}

export async function updateRoutine(
  id: number,
  name: string,
  target_muscle: string,
  notes: string,
  exercises: string[],
) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .update(routine)
    .set({
      name: name,
      targetMuscle: target_muscle,
      notes: notes,
      exercises: exercises,
    })
    .where(and(eq(routine.userId, user.userId), eq(routine.id, id)));
}

export async function insertRoutine(
  name: string,
  target_muscle: string,
  notes: string,
  exercises: string[],
) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db.insert(routine).values({
    userId: user.userId,
    name: name,
    targetMuscle: target_muscle,
    notes: notes,
    exercises: exercises,
  });
}

export async function deleteRoutine(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .delete(routine)
    .where(and(eq(routine.userId, user.userId), eq(routine.id, id)));
}

export async function insertWorkoutLog(routine_id: number, date: Date) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db.insert(workoutLog).values({
    userId: user.userId,
    routineId: routine_id,
    date: date,
  });
}

export async function updateWorkoutLog(
  id: number,
  routine_id: number,
  date: Date,
) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .update(workoutLog)
    .set({
      routineId: routine_id,
      date: date,
    })
    .where(and(eq(workoutLog.userId, user.userId), eq(workoutLog.id, id)));
}

export async function deleteWorkoutLog(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  await db
    .delete(workoutLog)
    .where(and(eq(workoutLog.userId, user.userId), eq(workoutLog.id, id)));
}
