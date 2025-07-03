import { Person, Document, Place } from "@shared/schema";
import peopleData from "./people.json";
import documentsData from "./documents.json";
import placesData from "./places.json";

interface GenealogyData {
  people: Person[];
  documents: Document[];
  places: Place[];
}

const genealogyData: GenealogyData = {
  people: peopleData as Person[],
  documents: documentsData as Document[],
  places: placesData as Place[],
};

export default genealogyData;
