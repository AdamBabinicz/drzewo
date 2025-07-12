import { Person } from "@shared/schema";
import { useLanguage } from "@/hooks/useLanguage";
import PersonCard from "./PersonCard";
import { Heart } from "lucide-react";

interface FamilyUnit {
  parents: Person[];
  children: Person[];
}

interface FamilyUnitCardProps {
  unit: FamilyUnit;
  onPersonClick: (person: Person) => void;
  familyColor: string;
  isProgenitor: boolean;
}

export default function FamilyUnitCard({
  unit,
  onPersonClick,
  familyColor,
  isProgenitor, // Ta właściwość znów jest nam potrzebna
}: FamilyUnitCardProps) {
  const { t } = useLanguage();

  return (
    <div
      className={`mb-8 p-4 rounded-lg border-l-4 ${familyColor} bg-transparent`}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
        {/*
          Rodzice w KAŻDEJ jednostce rodzinnej (FamilyUnit) są wyróżniani.
          To oni definiują tę jednostkę.
        */}
        {unit.parents.map((parent, index) => (
          <div key={parent.id} className="flex items-center">
            <PersonCard
              person={parent}
              onClick={() => onPersonClick(parent)}
              isProgenitor={true} // <-- ZAWSZE TRUE DLA RODZICÓW W JEDNOSTCE
            />
            {index === 0 && unit.parents.length > 1 && (
              <Heart className="w-5 h-5 text-red-400 mx-2" />
            )}
          </div>
        ))}
      </div>

      {unit.children.length > 0 && (
        <>
          <h4 className="font-semibold text-sm uppercase text-muted-foreground mt-6 mb-2">
            {t("person.children")}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/*
              Dzieci w tej jednostce NIGDY nie są wyróżniane,
              nawet jeśli sami są rodzicami w innej jednostce niżej.
            */}
            {unit.children.map((child) => (
              <PersonCard
                key={child.id}
                person={child}
                onClick={() => onPersonClick(child)}
                isProgenitor={false} // <-- ZAWSZE FALSE DLA DZIECI W TEJ JEDNOSTCE
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
