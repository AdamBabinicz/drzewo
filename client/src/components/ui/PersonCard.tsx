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
  isProgenitor: boolean;
}

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
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

export default function PersonCard({
  person,
  onClick,
  isProgenitor,
}: PersonCardProps) {
  const { t, language } = useLanguage();
  const isGierczak = person.family === "gierczak";
  const accentColor = isGierczak
    ? "text-[hsl(var(--heritage-burgundy))]"
    : "text-[hsl(var(--heritage-teal))]";
  const hasAnecdotes = person.anecdotes && person.anecdotes.length > 0;

  const getOccupationText = (p: Person) => {
    if (!p.occupations || p.occupations.length === 0) return null;
    const firstOccupation = p.occupations[0];
    if (typeof firstOccupation.title === "object") {
      return (
        firstOccupation.title[language as keyof typeof firstOccupation.title] ||
        firstOccupation.title.pl
      );
    }
    return null;
  };

  const occupationText = getOccupationText(person);
  const birthInfo = formatDate(
    person.birthDateNote || person.birthDate,
    language
  );

  const birthEvent = person.events?.find((e) => e.type === "birth");
  const birthPlace = birthEvent?.place;

  const backgroundClass = isProgenitor
    ? "bg-muted hover:bg-heritage-gray-dark/50"
    : "bg-card hover:shadow-md";

  return (
    <TooltipProvider delayDuration={200}>
      <Card
        className={`cursor-pointer transition-all duration-200 heritage-border ${backgroundClass}`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center">
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

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <h4 className="font-semibold heritage-text break-words">
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

              {(birthInfo || person.deathDate || person.deathDateNote) && (
                <p className="text-sm text-stone-600 dark:text-slate-300 flex items-center justify-center sm:justify-start">
                  <Calendar className="w-3 h-3 mr-1" />
                  {birthInfo}
                  {person.deathDate || person.deathDateNote
                    ? ` - ${formatDate(
                        person.deathDateNote || person.deathDate,
                        language
                      )}`
                    : ""}
                </p>
              )}

              {birthPlace && (
                <p className="text-xs text-stone-500 flex items-center justify-center sm:justify-start">
                  <MapPin className="w-3 h-3 mr-1" />
                  {t("person.born")} {birthPlace}
                </p>
              )}

              {occupationText && (
                <p className={`text-xs ${accentColor} font-medium mt-1`}>
                  {occupationText}
                </p>
              )}
            </div>

            <div className={`${accentColor} hidden sm:block`}>
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
