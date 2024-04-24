import "server-only"; 
import { db } from "./db";
import { diet, DietType, dietType } from "./db/schema";
import { eq } from "drizzle-orm";


export async function getfoods() {
  const foods = await db.query.foods.findMany();
  return foods;
}
export async function insertdiet(food_id:number,type: DietType,quantity:number) {

  await db.insert(diet).values({
    foodId: food_id,
    type: type,
    quantity: quantity,
  });
}
export async function updatediet(id: number, quantity:number) {
  await db.update(diet).set({
    quantity: quantity,
  }).where(eq(diet.id, id));
}

export async function deletediet(id: number) {
  await db.delete(diet).where(eq(diet.id, id));
}

export async function getdiets() {
  const diets = await db.query.diet.findMany();
  return diets;
}