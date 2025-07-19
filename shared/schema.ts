import { pgTable, text, serial, integer, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  country: text("country").notNull(),
  worldRanking: integer("world_ranking"),
  acceptanceRate: decimal("acceptance_rate", { precision: 5, scale: 2 }),
  tuitionFee: text("tuition_fee").notNull(),
  studentPopulation: integer("student_population"),
  founded: integer("founded"),
  type: text("type").notNull(),
  endowment: text("endowment"),
  studentFacultyRatio: text("student_faculty_ratio"),
  website: text("website"),
  phone: text("phone"),
  address: text("address"),
  description: text("description"),
  imageUrl: text("image_url"),
  programs: jsonb("programs").$type<string[]>(),
  isBookmarked: integer("is_bookmarked").default(0), // 0 or 1 for boolean-like behavior
});

export const insertUniversitySchema = createInsertSchema(universities).omit({
  id: true,
});

export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type University = typeof universities.$inferSelect;

// Search and filter schemas
export const universityFilterSchema = z.object({
  search: z.string().optional(),
  country: z.string().optional(),
  ranking: z.string().optional(),
  tuitionRange: z.string().optional(),
  sortBy: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type UniversityFilter = z.infer<typeof universityFilterSchema>;
