import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { User, Calendar, MessageSquare } from "lucide-react";
import { Person } from "@shared/schema";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PersonNodeData = {
  person: Person;
  onClick: () => void;
  family: "gierczak" | "ofiara";
};

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "?";
  if (/[a-zA-Z]/.test(dateString)) {
    return dateString;
  }
  if (/^\d{4}$/.test(dateString)) {
    return dateString;
  }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return dateString.split(" ")[0];
  } catch (e) {
    return dateString;
  }
};

export default function PersonNode({ data }: NodeProps<PersonNodeData>) {
  const { t } = useLanguage();
  const { person, onClick, family } = data;
  const isGierczak = family === "gierczak";

  const borderColor = isGierczak
    ? "border-heritage-burgundy"
    : "border-heritage-teal";

  const birthInfo = person.birthDateNote || person.birthDate;
  const birth = formatDate(birthInfo);
  const death = formatDate(person.deathDate);
  const lifeSpan = `${birth} - ${death}`;
  const hasAnecdotes = person.anecdotes && person.anecdotes.length > 0;

  return (
    <TooltipProvider delayDuration={200}>
      {/* ================== POCZĄTEK DODANEGO KODU ================== */}
      {/* Niewidoczne uchwyty dla połączeń bocznych (małżeństwa)      */}
      <Handle
        type="source"
        position={Position.Left}
        id={Position.Left}
        style={{ background: "transparent", border: "none" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={Position.Left}
        style={{ background: "transparent", border: "none" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={Position.Right}
        style={{ background: "transparent", border: "none" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id={Position.Right}
        style={{ background: "transparent", border: "none" }}
      />
      {/* =================== KONIEC DODANEGO KODU =================== */}

      <div
        className={`person-node bg-white dark:bg-stone-800 border-2 ${borderColor} rounded-lg p-3 shadow-md cursor-pointer hover:shadow-lg transition-all w-[240px]`}
        onClick={onClick}
      >
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-stone-400"
        />
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-stone-200 dark:bg-stone-700 rounded-full flex-shrink-0 flex items-center justify-center">
            {person.photoUrl ? (
              <img
                src={person.photoUrl}
                alt={`${person.firstName} ${person.lastName}`}
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
              />
            ) : (
              <User className="w-8 h-8 text-stone-500" />
            )}
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center">
              <h4 className="font-semibold text-base heritage-text mb-1 break-words">
                {person.firstName} {person.lastName}
              </h4>
              {hasAnecdotes && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MessageSquare className="w-3 h-3 text-stone-400 ml-1.5 mb-1 flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("person.hasAnecdotes")}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            {(birthInfo || person.deathDate) && (
              <p className="text-xs text-stone-600 dark:text-stone-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1.5 flex-shrink-0" />
                <span>{lifeSpan}</span>
              </p>
            )}
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-stone-400"
        />
      </div>
    </TooltipProvider>
  );
}
