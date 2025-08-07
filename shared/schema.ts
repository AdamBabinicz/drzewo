export interface Translation {
  pl: string;
  en: string;
}

export interface Keepsake {
  imageUrl: string;
  title: Translation;
  description: Translation;
}

export interface Marriage {
  spouseId: number;
  date: string | null;
  source?: {
    documentId: number;
  };
  note?: Translation;
}

export interface Event {
  type: "birth" | "death" | "marriage";
  date?: string;
  place?: string;
  time?: string;
  timeQualifier?: string;
  source?: {
    documentId: number;
  };
  note?: Translation;
  spouseId?: number;
  witnesses?: {
    witnessId: number;
  }[];
}

export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  birthDate?: string | null;
  birthDateNote?: string;
  birthTime?: string;
  birthTimeQualifier?: string;
  deathDate?: string | null;
  deathDateNote?: string;
  deathTime?: string;
  deathTimeQualifier?: string;
  photoUrl?: string | null;
  family: "gierczak" | "ofiara";
  spouseIds: number[];
  childIds: number[];
  parentIds: number[];
  occupation?: Translation;
  marriages: Marriage[];
  biography: Translation;
  anecdotes?: Translation[];
  keepsakes?: Keepsake[];
  events?: Event[];
}

export interface ExtractedData {
  label_pl: string;
  label_en: string;
  value_pl: string;
  value_en: string;
}

export interface Document {
  id: number;
  title_pl: string;
  title_en: string;
  type: string;
  description_pl: string;
  description_en: string;
  imageUrl: string;
  transcription?: string;
  translation_pl?: string;
  translation_en?: string;
  witnessIds?: number[];
  extracted_data?: ExtractedData[];
}

export interface Place {
  id: string;
  name: string;
  context?: string;
  description: Translation;
  history: Translation;
  imageUrl: string;
}

export interface Witness {
  id: number;
  lastName: string;
  firstName: string;
  residence: string;
  documentIds: number[];
  personId?: number;
}
