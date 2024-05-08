// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `helios_${name}`);

export const foods = createTable("food", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  calories: integer("calories").notNull(),
  isPerGrams: boolean("is_per_grams").notNull(),
});
const dietTypeEnum = ["breakfast", "lunch", "dinner", "snack"] as const;

export type DietType = (typeof dietTypeEnum)[number];
export const dietType = pgEnum("helios_diet_type", dietTypeEnum);
export const diet = createTable("diet", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  foodId: integer("food_id")
    .references(() => foods.id)
    .notNull(), // foreign key
  type: dietType("helios_diet_type").notNull(),
  quantity: integer("quantity").notNull(),
});

export const userData = createTable("user_data", {
  userId: varchar("user_id", { length: 256 }).primaryKey(),
  weight: integer("weight").notNull(),
  height: integer("height").notNull(),
  age: integer("age").notNull(),
  calorieTarget: integer("calorie_target").notNull(),
  pushUpHighScore: integer("push_up_high_score").notNull().default(0),
  squatHighScore: integer("squat_high_score").notNull().default(0),
});

export const workoutLog = createTable("workout_log", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  routineId: integer("routine_id")
    .references(() => routine.id, { onDelete: "cascade" })
    .notNull(), // foreign key
  date: timestamp("date").notNull(),
});
export const workoutLogRelations = relations(workoutLog, ({ one }) => ({
  routine: one(routine, {
    fields: [workoutLog.routineId],
    references: [routine.id],
  }),
}));

export const dietRelations = relations(diet, ({ one }) => ({
  food: one(foods, {
    fields: [diet.foodId],
    references: [foods.id],
  }),
}));

export const routine = createTable("routine", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  targetMuscle: varchar("target_muscle", { length: 256 }).notNull(),
  notes: varchar("notes", { length: 512 }).notNull(),
  exercises: varchar("exercises", { length: 256 }).notNull().array(),
});
