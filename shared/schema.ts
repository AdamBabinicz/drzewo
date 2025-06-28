type LocalizedString = {
  pl: string;
  en: string;
};

export type Marriage = {
  spouseId: number;
  date?: string | null;
  place?: string | null;
};

export type Anecdote = {
  pl: string;
  en: string;
};

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string | null;
  birthDate?: string | null;
  birthDateNote?: string | null;
  deathDate?: string | null;
  deathDateNote?: string | null;
  birthPlace?: string | null;
  deathPlace?: string | null;
  occupation: LocalizedString | string | null;
  biography: LocalizedString | string | null;
  family: "gierczak" | "ofiara";
  photoUrl?: string | null;
  parentIds?: number[];
  spouseIds?: number[];
  childIds?: number[];
  marriages?: Marriage[];
  anecdotes?: Anecdote[];
};

export type DocumentType =
  | "marriage_record"
  | "death_record"
  | "birth_record"
  | "photo"
  | "genealogy_chart"
  | "other";

export type Document = {
  id: number;
  personId?: number;
  title: string;
  type: DocumentType;
  description?: string;
  imageUrl: string;
};

export type Place = {
  id: string;
  name: string;
  context?: "gierczak" | "ofiara";
  description: LocalizedString | string;
  imageUrl: string;
};

export type InsertPerson = Omit<Person, "id">;
export type InsertDocument = Omit<Document, "id">;
