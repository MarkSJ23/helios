import "server-only";
import { db } from "./db";
import { diet, DietType, dietType, routine, workoutLog } from "./db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function getfoods() {
  const foods = await db.query.foods.findMany();
  return foods;
}

export async function getdiets() {
  const user = auth();

  if (!user.userId) throw new Error("unauthorized");

  const diets = await db.query.diet.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    with: {
      food: true,
    },
  });

  return diets;
}

export async function getSquatLeaderboard() {
  const squatLeaderboard = await db.query.userData.findMany({
    orderBy: (model, { desc }) => desc(model.squatHighScore),
    limit: 20,
  });
  return squatLeaderboard;
}

export async function getPushUpLeaderboard() {
  const pushUpLeaderboard = await db.query.userData.findMany({
    orderBy: (model, { desc }) => desc(model.pushUpHighScore),
    limit: 20,
  });
  return pushUpLeaderboard;
}

export async function getUserInfo() {
  const user = auth();
  if (!user.userId) throw new Error("unauthorized");

  const userInfo = await db.query.userData.findFirst({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });
  return userInfo;
}
export async function getRoutine() {
  const user = auth();
  if (!user.userId) throw new Error("unauthorized");
  const routine = await db.query.routine.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
  });
  return routine;
}

export async function getWorkoutLog() {
  const user = auth();
  if (!user.userId) throw new Error("unauthorized");
  const workoutlog = await db.query.workoutLog.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.date),
    limit: 7,
    with: {
      routine: true,
    },
  });
  return workoutLog;
}
