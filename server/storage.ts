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
    // Authentic genealogical data for Gierczak and Ofiara families
    const authenticPeople: Person[] = [
      // Gierczak family line
      {
        id: 1,
        firstName: "Tomasz",
        lastName: "Gierczak",
        birthDate: null,
        deathDate: null,
        birthPlace: "Jaszowice",
        occupation: null,
        family: "gierczak",
        biography: "Praprzodek rodziny Gierczak. Mieszkał w Jaszowicach - prywatnej wsi szlacheckiej w drugiej połowie XVI wieku w powiecie radomskim województwa sandomierskiego.",
        spouseIds: [2],
        childIds: [3],
        parentIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
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
        documents: [],
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 3,
        firstName: "Ambroży",
        lastName: "Gierczak",
        birthDate: null,
        deathDate: "1836",
        birthPlace: "Jaszowice",
        occupation: null,
        family: "gierczak",
        biography: "Syn Tomasza i Zofii Gierczak. Zmarł w 1836 roku. Poślubił Kunegundę Kania około 1820 roku.",
        spouseIds: [4],
        childIds: [5],
        parentIds: [1, 2],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 4,
        firstName: "Kunegunda",
        lastName: "Kania",
        maidenName: "Koniak, Karcz",
        birthDate: null,
        deathDate: null,
        birthPlace: null,
        occupation: null,
        family: "gierczak",
        biography: "Żona Ambrożego Gierczaka, poślubiona około 1820 roku.",
        spouseIds: [3],
        childIds: [5],
        parentIds: [],
        documents: [],
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 5,
        firstName: "Karol",
        lastName: "Gierczak",
        birthDate: "1828",
        deathDate: "1903",
        birthPlace: "Jaszowice",
        occupation: null,
        family: "gierczak",
        biography: "Syn Ambrożego i Kunegundy. Urodził się w 1828 roku, zmarł w 1903. Poślubił Teklę Kozyra 23 listopada 1857 roku.",
        spouseIds: [6],
        childIds: [7],
        parentIds: [3, 4],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 6,
        firstName: "Tekla",
        lastName: "Kozyra",
        maidenName: "Kozera",
        birthDate: "1831-10-19",
        deathDate: "1909",
        birthPlace: null,
        occupation: null,
        family: "gierczak",
        biography: "Żona Karola Gierczaka, urodzona 19 października 1831, zmarła w 1909. Pobrali się 23 listopada 1857 roku.",
        spouseIds: [5],
        childIds: [7],
        parentIds: [],
        documents: [],
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 7,
        firstName: "Paweł",
        lastName: "Gierczak",
        birthDate: "1867-01-11",
        deathDate: "1935-07-29",
        birthPlace: "Gulinek",
        occupation: null,
        family: "gierczak",
        biography: "Syn Karola i Tekli. Urodził się 11 stycznia 1867 w Gulinku k. Zakrzewa - prywatnej wsi szlacheckiej, zmarł 29 lipca 1935. Poślubił Katarzynę Czerwińską w 1887 roku.",
        spouseIds: [8],
        childIds: [9],
        parentIds: [5, 6],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 8,
        firstName: "Katarzyna",
        lastName: "Czerwińska",
        birthDate: null,
        deathDate: null,
        birthPlace: null,
        occupation: null,
        family: "gierczak",
        biography: "Żona Pawła Gierczaka, poślubiona w 1887 roku.",
        spouseIds: [7],
        childIds: [9],
        parentIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 9,
        firstName: "Jan",
        lastName: "Gierczak",
        birthDate: "1891-06-18",
        deathDate: "1958-11-07",
        birthPlace: "Gulinek",
        occupation: null,
        family: "gierczak",
        biography: "Syn Pawła i Katarzyny. Urodził się 18 czerwca 1891, zmarł 7 listopada 1958. Poślubił Agnieszkę Baćmaga 14 listopada 1917 roku.",
        spouseIds: [10],
        childIds: [11],
        parentIds: [7, 8],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 10,
        firstName: "Agnieszka",
        lastName: "Baćmaga",
        birthDate: "1894-04-13",
        deathDate: "1969-11-08",
        birthPlace: null,
        occupation: null,
        family: "gierczak",
        biography: "Żona Jana Gierczaka, urodzona 13 kwietnia 1894, zmarła 8 listopada 1969. Pobrali się 14 listopada 1917 roku.",
        spouseIds: [9],
        childIds: [11],
        parentIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 11,
        firstName: "Józef",
        lastName: "Gierczak",
        birthDate: "1930-02-23",
        deathDate: "1996-08-08",
        birthPlace: "Gulinek",
        occupation: null,
        family: "gierczak",
        biography: "Syn Jana i Agnieszki. Urodził się 23 lutego 1930, zmarł 8 sierpnia 1996. Poślubił Mariannę Ofiarę 26 listopada 1952 roku.",
        spouseIds: [12],
        childIds: [],
        parentIds: [9, 10],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },

      // Ofiara family line
      {
        id: 12,
        firstName: "Marianna",
        lastName: "Ofiara",
        birthDate: "1931-12-08",
        deathDate: "1987-01-26",
        birthPlace: "Ludwików",
        occupation: null,
        family: "ofiara",
        biography: "Córka Józefa Ofiary i Heleny Sobień. Urodziła się 8 grudnia 1931, zmarła 26 stycznia 1987. Poślubiła Józefa Gierczaka 26 listopada 1952 roku.",
        spouseIds: [11],
        childIds: [],
        parentIds: [13, 14],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 13,
        firstName: "Józef",
        lastName: "Ofiara",
        birthDate: "1896",
        deathDate: "1968-06-17",
        birthPlace: "Ludwików",
        occupation: null,
        family: "ofiara",
        biography: "Syn Andrzeja Ofiary i Franciszki Szaruch. Urodził się w 1896 roku w Ludwikowie, zmarł 17 czerwca 1968. Poślubił Helenę Sobień 9 lutego 1926 roku.",
        spouseIds: [14],
        childIds: [12],
        parentIds: [15, 16],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 14,
        firstName: "Helena",
        lastName: "Sobień",
        birthDate: "1905-01-09",
        deathDate: "1978-09-06",
        birthPlace: null,
        occupation: null,
        family: "ofiara",
        biography: "Żona Józefa Ofiary, urodzona 9 stycznia 1905, zmarła 6 września 1978. Pobrali się 9 lutego 1926 roku.",
        spouseIds: [13],
        childIds: [12],
        parentIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
      },
      {
        id: 15,
        firstName: "Andrzej",
        lastName: "Ofiara",
        birthDate: null,
        deathDate: null,
        birthPlace: "Ludwików",
        occupation: null,
        family: "ofiara",
        biography: "Praprzodek rodziny Ofiara. Mieszkał w Ludwikowie, gdzie już w latach 1442–1457 właścicielami miejscowości okolicznych byli Mikołaj i Zbigniew Czajkowie herbu Dębno. W XVI wieku tereny należały do rodu Jedlińskich herbu Nabram, gdzie w 1530 r. napisano prawo lokacji Jedlińska przez króla Zygmunta I Starego.",
        spouseIds: [16],
        childIds: [13],
        parentIds: [],
        documents: [],
        maidenName: null,
        deathPlace: null,
        photoUrl: null
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
        documents: [],
        deathPlace: null,
        photoUrl: null
      }
    ];

    const sampleDocuments: Document[] = [
      {
        id: 1,
        personId: 11,
        title: "Akt ślubu Józefa Gierczaka i Marianny Ofiara",
        type: "marriage",
        description: "Dokument ślubu z 26 listopada 1952 roku",
        imageUrl: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: 2,
        personId: 9,
        title: "Akt ślubu Jana Gierczaka i Agnieszki Baćmaga",
        type: "marriage",
        description: "Dokument ślubu z 14 listopada 1917 roku",
        imageUrl: "https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      },
      {
        id: 3,
        personId: 5,
        title: "Akt ślubu Karola Gierczaka i Tekli Kozyra",
        type: "marriage",
        description: "Dokument ślubu z 23 listopada 1857 roku",
        imageUrl: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      }
    ];

    authenticPeople.forEach(person => this.people.set(person.id, person));
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