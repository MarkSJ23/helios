// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
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

export const foods = createTable(
  "food",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    calories: integer("calories").notNull(),
    isPerGrams:  boolean("is_per_grams").notNull(),
  }

);
const dietTypeEnum  = ["breakfast", "lunch", "dinner", "snack"] as const;
export type DietType = typeof dietTypeEnum[number];
export const dietType = pgEnum("helios_diet_type",dietTypeEnum );
export const diet = createTable(
  "diet",
  {
    id: serial("id").primaryKey(),
    foodId: integer("food_id").references(() => foods.id).notNull(), // foreign key
    type: dietType("helios_diet_type").notNull(),
    quantity: integer("quantity").notNull(),
  }
);
