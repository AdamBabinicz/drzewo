// src/lib/storage.ts (lub gdziekolwiek go masz)
import { Person, Document } from "@shared/schema";
import genealogyData from "@/data/index"; // Zaktualizowany import

export interface IStorage {
  getAllPeople(): Promise<Person[]>;
  getPersonById(id: number): Promise<Person | undefined>;
  getPeopleByFamily(family: string): Promise<Person[]>;
  getAllDocuments(): Promise<Document[]>;
  getDocumentsByPersonId(personId: number): Promise<Document[]>;
}

export class MemStorage implements IStorage {
  private people: Map<number, Person>;
  private documents: Map<number, Document>;

  constructor() {
    this.people = new Map();
    this.documents = new Map();
    this.initializeData();
  }

  private initializeData() {
    const allPeople = genealogyData.people; // Bez asercji, bo już jest typowane
    const allDocuments = genealogyData.documents; // Bez asercji

    allPeople.forEach((person) => this.people.set(person.id, person));
    allDocuments.forEach((doc) => this.documents.set(doc.id, doc));
  }

  async getAllPeople(): Promise<Person[]> {
    return Array.from(this.people.values());
  }

  async getPersonById(id: number): Promise<Person | undefined> {
    return this.people.get(id);
  }

  async getPeopleByFamily(family: string): Promise<Person[]> {
    return Array.from(this.people.values()).filter(
      (person) => person.family === family
    );
  }

  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async getDocumentsByPersonId(personId: number): Promise<Document[]> {
    const person = this.people.get(personId);
    if (!person || !person.events) {
      return [];
    }
    const documentIds = new Set(person.events.map((e) => e.source.documentId));
    return Array.from(this.documents.values()).filter((doc) =>
      documentIds.has(doc.id)
    );
  }
}

export const storage = new MemStorage();
