import { Person, Document, Place, Witness } from "@shared/schema";
import peopleData from "./people.json";
import documentsData from "./documents.json";
import placesData from "./places.json";
import witnessesData from "./witnesses.json";

interface GenealogyData {
  people: Person[];
  documents: Document[];
  places: Place[];
  witnesses: Witness[];
}

const genealogyData: GenealogyData = {
  people: peopleData as Person[],
  documents: documentsData as Document[],
  places: placesData as Place[],
  witnesses: witnessesData as Witness[],
};

export default genealogyData;
