import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertPersonSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all people
  app.get("/api/people", async (req, res) => {
    try {
      const people = await storage.getAllPeople();
      res.json(people);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch people" });
    }
  });

  // Get person by ID
  app.get("/api/people/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const person = await storage.getPersonById(id);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.json(person);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch person" });
    }
  });

  // Get people by family
  app.get("/api/people/family/:family", async (req, res) => {
    try {
      const family = req.params.family;
      const people = await storage.getPeopleByFamily(family);
      res.json(people);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch family members" });
    }
  });

  // Get all documents
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  // Get documents by person ID
  app.get("/api/documents/person/:personId", async (req, res) => {
    try {
      const personId = parseInt(req.params.personId);
      const documents = await storage.getDocumentsByPersonId(personId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
