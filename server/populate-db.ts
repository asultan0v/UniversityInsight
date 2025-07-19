import { db } from "./db";
import { universities } from "@shared/schema";
import { universityMockData } from "../client/src/lib/university-data";

async function populateDatabase() {
  try {
    console.log("Populating database with university data...");
    
    // Check if database already has data
    const existingUniversities = await db.select().from(universities).limit(1);
    if (existingUniversities.length > 0) {
      console.log("Database already contains university data");
      return;
    }

    // Insert all university data
    const insertData = universityMockData.map(university => ({
      ...university,
      address: university.address || null,
      description: university.description || null,
      worldRanking: university.worldRanking || null,
      acceptanceRate: university.acceptanceRate || null,
      studentPopulation: university.studentPopulation || null,
      founded: university.founded || null,
      endowment: university.endowment || null,
      studentFacultyRatio: university.studentFacultyRatio || null,
      website: university.website || null,
      phone: university.phone || null,
      imageUrl: university.imageUrl || null,
      programs: university.programs || null,
      isBookmarked: 0
    }));

    await db.insert(universities).values(insertData);
    
    console.log(`Successfully inserted ${insertData.length} universities into the database`);
  } catch (error) {
    console.error("Error populating database:", error);
    throw error;
  }
}

// Run the population
populateDatabase()
  .then(() => {
    console.log("Database population completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database population failed:", error);
    process.exit(1);
  });

export { populateDatabase };