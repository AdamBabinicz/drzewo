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
    // Sample data from genealogy.json
    const samplePeople: Person[] = [
      {
        id: 1,
        firstName: "Jan",
        lastName: "Gierczak",
        birthDate: "1820",
        deathDate: "1890",
        birthPlace: "Jaszowice",
        occupation: "Rolnik",
        family: "gierczak",
        biography: "Jan Gierczak był rolnikiem żyjącym w Jaszowicach w XIX wieku. Gospodarował na kilku morgach ziemi, zajmując się uprawą zbóż i hodowlą bydła. Był szanowanym członkiem społeczności lokalnej, aktywnie uczestniczył w życiu parafii. Zmarł w wieku 70 lat i został pochowany na cmentarzu parafialnym w Cerekwi.",
        spouseIds: [2],
        childIds: [3, 4, 5],
        parentIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 2,
        firstName: "Anna",
        lastName: "Ofiara",
        birthDate: "1825",
        deathDate: "1895",
        birthPlace: "Ludwików",
        occupation: "Gospodarczyni",
        family: "ofiara",
        biography: "Anna z domu Ofiara, żona Jana Gierczaka. Pochodziła z rodziny z Ludwikowa. Była znaną w okolicy za swoje umiejętności w prowadzeniu gospodarstwa domowego i wychowaniu dzieci.",
        spouseIds: [1],
        childIds: [3, 4, 5],
        parentIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 3,
        firstName: "Józef",
        lastName: "Gierczak",
        birthDate: "1850",
        deathDate: "1920",
        birthPlace: "Gulinek",
        occupation: "Kowal",
        family: "gierczak",
        biography: "Józef Gierczak, syn Jana i Anny. Wyuczył się zawodu kowala i prowadził własną kuźnię w Gulinku. Był znanym i szanowanym rzemieślnikiem w okolicy.",
        parentIds: [1, 2],
        spouseIds: [],
        childIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 4,
        firstName: "Maria",
        lastName: "Gierczak",
        birthDate: "1855",
        deathDate: "1925",
        birthPlace: "Jaszowice",
        occupation: "Gospodarczyni",
        family: "gierczak",
        biography: "Maria Gierczak, córka Jana i Anny. Pomagała rodzicom w prowadzeniu gospodarstwa, później wyszła za mąż i założyła własną rodzinę.",
        parentIds: [1, 2],
        spouseIds: [],
        childIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 5,
        firstName: "Stanisław",
        lastName: "Gierczak",
        birthDate: "1860",
        deathDate: "1930",
        birthPlace: "Jaszowice",
        occupation: "Rolnik",
        family: "gierczak",
        biography: "Stanisław Gierczak, najmłodszy syn Jana i Anny. Kontynuował tradycję rodzinną jako rolnik, przejmując część ojcowskiego gospodarstwa.",
        parentIds: [1, 2],
        spouseIds: [],
        childIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 6,
        firstName: "Tekla",
        lastName: "Ofiara",
        birthDate: "1825",
        deathDate: "1895",
        birthPlace: "Cerekiew",
        occupation: "Gospodarczyni",
        family: "ofiara",
        biography: "Tekla Ofiara, pochodząca z Cerekwi. Była znana w okolicy z swojej religijności i pomocy potrzebującym. Prowadziła skromne gospodarstwo razem z mężem.",
        parentIds: [],
        spouseIds: [],
        childIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 7,
        firstName: "Michał",
        lastName: "Ofiara",
        birthDate: "1830",
        deathDate: "1900",
        birthPlace: "Ludwików",
        occupation: "Rolnik",
        family: "ofiara",
        biography: "Michał Ofiara z Ludwikowa. Zajmował się rolnictwem i drobnym handlem. Był aktywnym członkiem społeczności lokalnej i regularnie uczęszczał do kościoła w Cerekwi.",
        parentIds: [],
        spouseIds: [],
        childIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      }
    ];

    const sampleDocuments: Document[] = [
      {
        id: 1,
        personId: 1,
        title: "Akt urodzenia Jana Gierczaka",
        type: "birth",
        description: "Metryka urodzenia z parafii Cerekiew",
        imageUrl: "https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: 2,
        personId: 1,
        title: "Akt ślubu Jana i Anny",
        type: "marriage",
        description: "Dokument ślubu z 1845 roku",
        imageUrl: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      }
    ];

    samplePeople.forEach(person => this.people.set(person.id, person));
    sampleDocuments.forEach(doc => this.documents.set(doc.id, doc));
  }

  async getAllPeople(): Promise<Person[]> {
    return Array.from(this.people.values());
  }

  async getPersonById(id: number): Promise<Person | undefined> {
    return this.people.get(id);
  }

  async getPeopleByFamily(family: string): Promise<Person[]> {
    return Array.from(this.people.values()).filter(person => person.family === family);
  }

  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async getDocumentsByPersonId(personId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(doc => doc.personId === personId);
  }
}

export const storage = new MemStorage();