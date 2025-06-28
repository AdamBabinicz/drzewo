// src/components/PersonCard.tsx

import { User, Calendar, MapPin, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Person } from "@shared/schema";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PersonCardProps {
  person: Person;
  onClick: () => void;
}

export default function PersonCard({ person, onClick }: PersonCardProps) {
  const { t, language } = useLanguage();
  const isGierczak = person.family === "gierczak";
  const accentColor = isGierczak
    ? "text-[hsl(var(--heritage-burgundy))]"
    : "text-[hsl(var(--heritage-teal))]";
  const hasAnecdotes = person.anecdotes && person.anecdotes.length > 0;

  const getOccupationText = (p: Person) => {
    if (!p.occupation) return null;
    if (typeof p.occupation === "object") {
      return (
        p.occupation[language as keyof typeof p.occupation] || p.occupation.pl
      );
    }
    return p.occupation;
  };

  const occupationText = getOccupationText(person);

  // KLUCZOWA ZMIANA: Wybieramy właściwą informację o dacie urodzenia
  const birthInfo = person.birthDateNote || person.birthDate;

  return (
    <TooltipProvider delayDuration={200}>
      <Card
        className="cursor-pointer hover:shadow-md transition-shadow heritage-border"
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0">
              {person.photoUrl ? (
                <img
                  src={person.photoUrl}
                  alt={`${person.firstName} ${person.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <User className="w-6 h-6 text-stone-500" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h4 className="font-semibold heritage-text truncate">
                  {person.firstName} {person.lastName}
                  {person.maidenName && (
                    <span className="text-sm ml-1">
                      ({t("person.maidenName")} {person.maidenName})
                    </span>
                  )}
                </h4>
                {hasAnecdotes && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400 ml-2 flex-shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("person.hasAnecdotes")}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              {/* KLUCZOWA ZMIANA: Używamy nowej zmiennej 'birthInfo' */}
              {(birthInfo || person.deathDate) && (
                <p className="text-sm text-stone-600 dark:text-slate-300 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {birthInfo}
                  {person.deathDate ? `-${person.deathDate}` : ""}
                </p>
              )}

              {person.birthPlace && (
                <p className="text-xs text-stone-500 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {t("person.born")} {person.birthPlace}
                </p>
              )}

              {occupationText && (
                <p className={`text-xs ${accentColor} font-medium`}>
                  {occupationText}
                </p>
              )}
            </div>

            <div className={`${accentColor}`}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
