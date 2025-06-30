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
}

export default function FamilyUnitCard({
  unit,
  onPersonClick,
  familyColor,
}: FamilyUnitCardProps) {
  const { t } = useLanguage();

  return (
    <div className={`mb-8 p-4 rounded-lg border-l-4 ${familyColor} bg-card`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
        {unit.parents.map((parent, index) => (
          <div key={parent.id} className="flex items-center">
            <PersonCard person={parent} onClick={() => onPersonClick(parent)} />
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
            {unit.children.map((child) => (
              <PersonCard
                key={child.id}
                person={child}
                onClick={() => onPersonClick(child)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
