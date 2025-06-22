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
  deathDate?: string | null;
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

export type Document = {
  id: number;
  personId?: number;
  title: string;
  type: string;
  description?: string;
  imageUrl: string;
};

export type Place = {
  name: string;
  description: LocalizedString | string;
  imageUrl: string;
};

export type InsertPerson = Omit<Person, "id">;
export type InsertDocument = Omit<Document, "id">;
