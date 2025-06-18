import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const people = pgTable("people", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  maidenName: text("maiden_name"),
  birthDate: text("birth_date"),
  deathDate: text("death_date"),
  birthPlace: text("birth_place"),
  deathPlace: text("death_place"),
  occupation: text("occupation"),
  biography: text("biography"),
  family: text("family").notNull(), // 'gierczak' or 'ofiara'
  photoUrl: text("photo_url"),
  documents: jsonb("documents").$type<string[]>().default([]),
  parentIds: jsonb("parent_ids").$type<number[]>().default([]),
  spouseIds: jsonb("spouse_ids").$type<number[]>().default([]),
  childIds: jsonb("child_ids").$type<number[]>().default([]),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  personId: integer("person_id").references(() => people.id),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'birth', 'marriage', 'death', 'photo', 'other'
  imageUrl: text("image_url").notNull(),
  description: text("description"),
});

export const insertPersonSchema = createInsertSchema(people).omit({
  id: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
});

export type InsertPerson = z.infer<typeof insertPersonSchema>;
export type Person = typeof people.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;
