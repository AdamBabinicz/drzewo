// src/components/ui/FamilyUnitCard.tsx
import { Person } from "@shared/schema";
import PersonCard from "./PersonCard";
import { Users, GitBranch } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface FamilyUnitCardProps {
  unit: {
    parents: Person[];
    children: Person[];
  };
  onPersonClick: (person: Person) => void;
  familyColor: string;
}

export default function FamilyUnitCard({
  unit,
  onPersonClick,
  familyColor,
}: FamilyUnitCardProps) {
  const { t } = useLanguage();

  if (unit.parents.length === 0) return null;

  return (
    <div className={`mb-8 p-4 border-l-4 ${familyColor}`}>
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 mr-3 text-muted-foreground" />
        <h3 className="text-xl font-semibold heritage-text">
          {t("familyUnit.parents")}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {unit.parents.map((parent) => (
          <PersonCard
            key={parent.id}
            person={parent}
            onClick={() => onPersonClick(parent)}
          />
        ))}
      </div>

      {unit.children.length > 0 && (
        <>
          <div className="flex items-center mt-6 mb-4">
            <GitBranch className="w-5 h-5 mr-3 text-muted-foreground" />
            <h3 className="text-xl font-semibold heritage-text">
              {t("familyUnit.children")}
            </h3>
          </div>
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
