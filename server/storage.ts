import { Person, Document, InsertPerson, InsertDocument } from "@shared/schema";

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
    const authenticPeople: Person[] = [
      {
        id: 1,
        firstName: "Tomasz",
        lastName: "Gerczak vel Gierczak",
        birthDate: null,
        deathDate: null,
        birthPlace: "Jaszowice",
        occupation: null,
        family: "gierczak",
        biography:
          "Praprzodek rodziny Gierczak. Mieszkał w Jaszowicach - prywatnej wsi szlacheckiej w drugiej połowie XVI wieku w powiecie radomskim województwa sandomierskiego.",
        spouseIds: [2],
        childIds: [3],
        parentIds: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null,
      },
      {
        id: 2,
        firstName: "Zofia",
        lastName: "Giel",
        maidenName: "Gielowska",
        birthDate: null,
        deathDate: null,
        birthPlace: null,
        occupation: null,
        family: "gierczak",
        biography: "Żona Tomasza Gierczaka, z domu Giel (Gielowska).",
        spouseIds: [1],
        childIds: [3],
        parentIds: [],
        deathPlace: null,
        photoUrl: null,
      },
      {
        id: 16,
        firstName: "Franciszka",
        lastName: "Szaruch",
        maidenName: "Saruch",
        birthDate: "1876",
        deathDate: null,
        birthPlace: null,
        occupation: null,
        family: "ofiara",
        biography: "Żona Andrzeja Ofiary, urodzona w 1876 roku.",
        spouseIds: [15],
        childIds: [13],
        parentIds: [],
        deathPlace: null,
        photoUrl: null,
      },
    ];

    const sampleDocuments: Document[] = [
      {
        id: 1,
        personId: 11,
        title: "Akt ślubu Józefa Gierczaka i Marianny Ofiara",
        type: "marriage",
        description: "Dokument ślubu z 26 listopada 1952 roku",
        imageUrl:
          "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      },
      {
        id: 2,
        personId: 9,
        title: "Akt ślubu Jana Gierczaka i Agnieszki Baćmaga",
        type: "marriage",
        description: "Dokument ślubu z 14 listopada 1917 roku",
        imageUrl:
          "https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      },
      {
        id: 3,
        personId: 5,
        title: "Akt ślubu Karola Gierczaka i Tekli Kozyra",
        type: "marriage",
        description: "Dokument ślubu z 23 listopada 1857 roku",
        imageUrl:
          "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      },
    ];

    authenticPeople.forEach((person) => this.people.set(person.id, person));
    sampleDocuments.forEach((doc) => this.documents.set(doc.id, doc));
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
    return Array.from(this.documents.values()).filter(
      (doc) => doc.personId === personId
    );
  }
}

export const storage = new MemStorage();
