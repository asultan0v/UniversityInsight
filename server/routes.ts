import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { universityFilterSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all universities with filtering
  app.get("/api/universities", async (req, res) => {
    try {
      const filters = universityFilterSchema.parse({
        search: req.query.search as string,
        country: req.query.country as string,
        ranking: req.query.ranking as string,
        tuitionRange: req.query.tuitionRange as string,
        sortBy: req.query.sortBy as string,
        page: req.query.page ? parseInt(req.query.page as string) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
      });

      const result = await storage.getAllUniversities(filters);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid filter parameters" });
    }
  });

  // Get university by ID
  app.get("/api/universities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const university = await storage.getUniversityById(id);
      
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
      
      res.json(university);
    } catch (error) {
      res.status(400).json({ error: "Invalid university ID" });
    }
  });

  // Search universities for suggestions
  app.get("/api/universities/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const suggestions = await storage.searchUniversities(query);
      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Toggle bookmark
  app.post("/api/universities/:id/bookmark", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const university = await storage.toggleBookmark(id);
      
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
      
      res.json(university);
    } catch (error) {
      res.status(400).json({ error: "Invalid university ID" });
    }
  });

  // Get bookmarked universities
  app.get("/api/bookmarks", async (req, res) => {
    try {
      const bookmarked = await storage.getBookmarkedUniversities();
      res.json(bookmarked);
    } catch (error) {
      res.status(500).json({ error: "Failed to get bookmarks" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
