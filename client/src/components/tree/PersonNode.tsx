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

const formatDate = (dateString: string | null | undefined, locale: string) => {
  if (!dateString || dateString === "?") return "?";

  const translations: { [key: string]: { pl: string; en: string } } = {
    "ok.": { pl: "ok.", en: "c." },
    przed: { pl: "przed", en: "before" },
    po: { pl: "po", en: "after" },
    between: { pl: "między", en: "between" },
  };

  const parts = dateString.split(" ");
  const keyword = parts[0];

  if (Object.prototype.hasOwnProperty.call(translations, keyword)) {
    const translationSet = translations[keyword];
    const translatedKeyword =
      locale === "en" ? translationSet.en : translationSet.pl;

    if (keyword === "between" && parts.length === 4 && parts[2] === "and") {
      const year1 = parts[1];
      const year2 = parts[3];
      return locale === "pl"
        ? `między ${year1} a ${year2}`
        : `between ${year1} and ${year2}`;
    }

    const restOfString = parts.slice(1).join(" ");
    return `${translatedKeyword} ${restOfString}`;
  }

  if (
    /^\d{4}$/.test(dateString) ||
    /^\d{4}s$/.test(dateString) ||
    /^\d{4} \?$/.test(dateString) ||
    /^\d{4}xx$/.test(dateString)
  )
    return dateString;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return dateString.split(" ")[0];
  } catch (e) {
    return dateString;
  }
};

export default function PersonNode({ data }: NodeProps<PersonNodeData>) {
  const { t, language } = useLanguage();
  const { person, onClick, family } = data;
  const isGierczak = family === "gierczak";

  const borderColor = isGierczak
    ? "border-heritage-burgundy"
    : "border-heritage-teal";

  const hasAnecdotes = person.anecdotes && person.anecdotes.length > 0;

  const birthInfo = formatDate(
    person.birthDateNote || person.birthDate,
    language
  );
  const deathInfo = formatDate(
    person.deathDateNote || person.deathDate,
    language
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Handle
        type="source"
        position={Position.Left}
        id={Position.Left}
        className="!bg-transparent !border-none"
      />
      <Handle
        type="target"
        position={Position.Left}
        id={Position.Left}
        className="!bg-transparent !border-none"
      />
      <Handle
        type="source"
        position={Position.Right}
        id={Position.Right}
        className="!bg-transparent !border-none"
      />
      <Handle
        type="target"
        position={Position.Right}
        id={Position.Right}
        className="!bg-transparent !border-none"
      />

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
            {(birthInfo || deathInfo) && (
              <p className="text-xs text-stone-600 dark:text-stone-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1.5 flex-shrink-0" />
                <span>
                  {birthInfo}
                  {deathInfo ? ` - ${deathInfo}` : ""}
                </span>
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
