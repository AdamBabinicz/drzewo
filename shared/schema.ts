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

export type EventSource = {
  documentId: number;
};

export type Event = {
  type: "birth" | "death" | "marriage";
  date: string;
  place: string;
  source: EventSource;
};

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string | null;
  birthDate?: string | null;
  birthDateNote?: string | null;
  birthTime?: string | null;
  deathDate?: string | null;
  deathDateNote?: string | null;
  deathTime?: string | null;
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
  events?: Event[];
};

export type DocumentType =
  | "marriage_record"
  | "death_record"
  | "birth_record"
  | "photo"
  | "genealogy_chart"
  | "other";

type ExtractedDataItem = {
  label_pl: string;
  label_en: string;
  value: string;
};

export type Document = {
  id: number;
  personId?: number;
  title: string;
  title_pl?: string;
  title_en?: string;
  type: DocumentType;
  description?: string;
  imageUrl: string;
  transcription?: string;
  translation_pl?: string;
  extracted_data?: ExtractedDataItem[];
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
