import { universities, type University, type InsertUniversity, type UniversityFilter } from "@shared/schema";
import { universityMockData } from "../client/src/lib/university-data";

export interface IStorage {
  getAllUniversities(filters?: UniversityFilter): Promise<{ universities: University[], total: number }>;
  getUniversityById(id: number): Promise<University | undefined>;
  searchUniversities(query: string): Promise<University[]>;
  toggleBookmark(id: number): Promise<University | undefined>;
  getBookmarkedUniversities(): Promise<University[]>;
}

export class MemStorage implements IStorage {
  private universities: Map<number, University>;
  private currentId: number;

  constructor() {
    this.universities = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    universityMockData.forEach(university => {
      const id = this.currentId++;
      const universityWithId: University = { 
        ...university, 
        id,
        address: university.address ?? null,
        description: university.description ?? null,
        worldRanking: university.worldRanking ?? null,
        acceptanceRate: university.acceptanceRate ?? null,
        studentPopulation: university.studentPopulation ?? null,
        founded: university.founded ?? null,
        endowment: university.endowment ?? null,
        studentFacultyRatio: university.studentFacultyRatio ?? null,
        website: university.website ?? null,
        phone: university.phone ?? null,
        imageUrl: university.imageUrl ?? null,
        programs: university.programs ? [...university.programs] : null,
        isBookmarked: university.isBookmarked ?? 0
      };
      this.universities.set(id, universityWithId);
    });
  }

  async getAllUniversities(filters?: UniversityFilter): Promise<{ universities: University[], total: number }> {
    let results = Array.from(this.universities.values());

    // Apply search filter
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(uni =>
        uni.name.toLowerCase().includes(searchLower) ||
        uni.location.toLowerCase().includes(searchLower) ||
        uni.country.toLowerCase().includes(searchLower)
      );
    }

    // Apply country filter
    if (filters?.country && filters.country !== "All Countries") {
      results = results.filter(uni => uni.country === filters.country);
    }

    // Apply ranking filter
    if (filters?.ranking && filters.ranking !== "All Rankings") {
      switch (filters.ranking) {
        case "Top 10":
          results = results.filter(uni => uni.worldRanking && uni.worldRanking <= 10);
          break;
        case "Top 50":
          results = results.filter(uni => uni.worldRanking && uni.worldRanking <= 50);
          break;
        case "Top 100":
          results = results.filter(uni => uni.worldRanking && uni.worldRanking <= 100);
          break;
        case "Top 500":
          results = results.filter(uni => uni.worldRanking && uni.worldRanking <= 500);
          break;
      }
    }

    // Apply tuition filter
    if (filters?.tuitionRange && filters.tuitionRange !== "All Tuition Ranges") {
      results = results.filter(uni => {
        const tuitionNum = this.extractTuitionNumber(uni.tuitionFee);
        switch (filters.tuitionRange) {
          case "Under $10,000":
            return tuitionNum < 10000;
          case "$10,000 - $30,000":
            return tuitionNum >= 10000 && tuitionNum <= 30000;
          case "$30,000 - $50,000":
            return tuitionNum > 30000 && tuitionNum <= 50000;
          case "Over $50,000":
            return tuitionNum > 50000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case "Ranking (Best First)":
          results.sort((a, b) => (a.worldRanking || 9999) - (b.worldRanking || 9999));
          break;
        case "Tuition (Low to High)":
          results.sort((a, b) => this.extractTuitionNumber(a.tuitionFee) - this.extractTuitionNumber(b.tuitionFee));
          break;
        case "Acceptance Rate":
          results.sort((a, b) => parseFloat(a.acceptanceRate || "100") - parseFloat(b.acceptanceRate || "100"));
          break;
        case "Alphabetical":
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    } else {
      // Default sort by ranking
      results.sort((a, b) => (a.worldRanking || 9999) - (b.worldRanking || 9999));
    }

    const total = results.length;
    const page = filters?.page || 1;
    const limit = filters?.limit || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      universities: results.slice(startIndex, endIndex),
      total
    };
  }

  private extractTuitionNumber(tuition: string): number {
    const match = tuition.match(/[\d,]+/);
    if (match) {
      return parseInt(match[0].replace(/,/g, ""));
    }
    return 0;
  }

  async getUniversityById(id: number): Promise<University | undefined> {
    return this.universities.get(id);
  }

  async searchUniversities(query: string): Promise<University[]> {
    const searchLower = query.toLowerCase();
    return Array.from(this.universities.values())
      .filter(uni =>
        uni.name.toLowerCase().includes(searchLower) ||
        uni.location.toLowerCase().includes(searchLower) ||
        uni.country.toLowerCase().includes(searchLower)
      )
      .slice(0, 5); // Return top 5 suggestions
  }

  async toggleBookmark(id: number): Promise<University | undefined> {
    const university = this.universities.get(id);
    if (university) {
      university.isBookmarked = university.isBookmarked ? 0 : 1;
      this.universities.set(id, university);
      return university;
    }
    return undefined;
  }

  async getBookmarkedUniversities(): Promise<University[]> {
    return Array.from(this.universities.values()).filter(uni => uni.isBookmarked === 1);
  }
}

export const storage = new MemStorage();
