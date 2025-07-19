import { universities, type University, type InsertUniversity, type UniversityFilter } from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, ilike, or, desc, asc, count } from "drizzle-orm";

export interface IStorage {
  getAllUniversities(filters?: UniversityFilter): Promise<{ universities: University[], total: number }>;
  getUniversityById(id: number): Promise<University | undefined>;
  searchUniversities(query: string): Promise<University[]>;
  toggleBookmark(id: number): Promise<University | undefined>;
  getBookmarkedUniversities(): Promise<University[]>;
}

export class DatabaseStorage implements IStorage {
  async getAllUniversities(filters?: UniversityFilter): Promise<{ universities: University[], total: number }> {
    const conditions: any[] = [];

    // Apply search filter
    if (filters?.search) {
      const searchCondition = or(
        ilike(universities.name, `%${filters.search}%`),
        ilike(universities.location, `%${filters.search}%`),
        ilike(universities.country, `%${filters.search}%`)
      );
      if (searchCondition) conditions.push(searchCondition);
    }

    // Apply country filter
    if (filters?.country && filters.country !== "All Countries") {
      conditions.push(eq(universities.country, filters.country));
    }

    // Apply ranking filter
    if (filters?.ranking && filters.ranking !== "All Rankings") {
      switch (filters.ranking) {
        case "Top 10":
          conditions.push(lte(universities.worldRanking, 10));
          break;
        case "Top 50":
          conditions.push(lte(universities.worldRanking, 50));
          break;
        case "Top 100":
          conditions.push(lte(universities.worldRanking, 100));
          break;
        case "Top 500":
          conditions.push(lte(universities.worldRanking, 500));
          break;
      }
    }

    // Build base query
    let queryBuilder = db.select().from(universities);
    let countQueryBuilder = db.select({ count: count() }).from(universities);

    // Apply WHERE conditions
    if (conditions.length > 0) {
      const whereCondition = and(...conditions);
      queryBuilder = queryBuilder.where(whereCondition) as any;
      countQueryBuilder = countQueryBuilder.where(whereCondition) as any;
    }

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case "Ranking (Best First)":
          queryBuilder = queryBuilder.orderBy(asc(universities.worldRanking)) as any;
          break;
        case "Tuition (Low to High)":
          queryBuilder = queryBuilder.orderBy(asc(universities.tuitionFee)) as any;
          break;
        case "Alphabetical":
          queryBuilder = queryBuilder.orderBy(asc(universities.name)) as any;
          break;
        default:
          queryBuilder = queryBuilder.orderBy(asc(universities.worldRanking)) as any;
      }
    } else {
      queryBuilder = queryBuilder.orderBy(asc(universities.worldRanking)) as any;
    }

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 9;
    const offset = (page - 1) * limit;
    
    queryBuilder = queryBuilder.limit(limit).offset(offset) as any;

    // Execute queries
    const [results, totalCount] = await Promise.all([
      queryBuilder,
      countQueryBuilder
    ]);

    return {
      universities: results,
      total: totalCount[0]?.count || 0
    };
  }

  async getUniversityById(id: number): Promise<University | undefined> {
    const [university] = await db.select().from(universities).where(eq(universities.id, id));
    return university || undefined;
  }

  async searchUniversities(query: string): Promise<University[]> {
    const searchResults = await db
      .select()
      .from(universities)
      .where(
        or(
          ilike(universities.name, `%${query}%`),
          ilike(universities.location, `%${query}%`),
          ilike(universities.country, `%${query}%`)
        )
      )
      .limit(5);
    
    return searchResults;
  }

  async toggleBookmark(id: number): Promise<University | undefined> {
    const [university] = await db.select().from(universities).where(eq(universities.id, id));
    if (university) {
      const newBookmarkStatus = university.isBookmarked ? 0 : 1;
      const [updated] = await db
        .update(universities)
        .set({ isBookmarked: newBookmarkStatus })
        .where(eq(universities.id, id))
        .returning();
      return updated;
    }
    return undefined;
  }

  async getBookmarkedUniversities(): Promise<University[]> {
    const bookmarked = await db
      .select()
      .from(universities)
      .where(eq(universities.isBookmarked, 1));
    return bookmarked;
  }
}

export const storage = new DatabaseStorage();