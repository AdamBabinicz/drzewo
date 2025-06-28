// src/components/PersonModal.tsx

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Calendar,
  MapPin,
  Briefcase,
  Users,
  X,
  MessageSquareText,
} from "lucide-react";
import { Person } from "@shared/schema";
import { useLanguage } from "@/hooks/useLanguage";

interface PersonModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
  onPersonClick: (person: Person) => void;
  allPeople: Person[];
}

// ZAKTUALIZOWANA FUNKCJA formatDate
const formatDate = (dateString: string | null | undefined, locale: string) => {
  if (!dateString || dateString === "?") return "?";
  // Jeśli zawiera litery (np. "ok.", "przed"), zwróć tekst bez zmian
  if (/[a-zA-Z]/.test(dateString)) {
    return dateString;
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

export default function PersonModal({
  person,
  isOpen,
  onClose,
  onPersonClick,
  allPeople,
}: PersonModalProps) {
  const { t, language } = useLanguage();

  if (!person) return null;

  const getDynamicText = (
    field: { pl: string; en: string } | string | null | undefined
  ) => {
    if (!field) return null;
    if (typeof field === "object" && field !== null && "pl" in field) {
      return field[language as keyof typeof field] || field.pl;
    }
    return field;
  };

  const occupationText = getDynamicText(person.occupation);
  const biographyText = getDynamicText(person.biography);
  const hasAnecdotes = person.anecdotes && person.anecdotes.length > 0;

  const parents = person.parentIds
    ? allPeople.filter((p) => person.parentIds!.includes(p.id))
    : [];
  const spouses = person.spouseIds
    ? allPeople.filter((p) => person.spouseIds!.includes(p.id))
    : [];
  const children = person.childIds
    ? allPeople.filter((p) => person.childIds!.includes(p.id))
    : [];

  const familyName =
    person.family === "gierczak" ? t("family.gierczak") : t("family.ofiara");
  const familyColor =
    person.family === "gierczak" ? "heritage-burgundy" : "heritage-teal";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] bg-stone-50 dark:bg-background-alt">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl heritage-text">
            {person.firstName} {person.lastName}
            {person.maidenName &&
              ` (${t("person.maidenName")} ${person.maidenName})`}
          </DialogTitle>
          <DialogDescription className={`${familyColor}`}>
            {familyName}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="w-48 h-48 bg-stone-200 dark:bg-background rounded-lg mx-auto flex items-center justify-center">
                  {person.photoUrl ? (
                    <img
                      src={person.photoUrl}
                      alt={`${person.firstName} ${person.lastName}`}
                      className="w-full h-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <User className="w-16 h-16 text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="md:w-2/3 space-y-4">
                {(person.birthDate ||
                  person.birthDateNote ||
                  person.deathDate) && (
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      {/* KLUCZOWA ZMIANA: Używamy 'birthDateNote' */}
                      {(person.birthDate || person.birthDateNote) && (
                        <span className="heritage-text">
                          {t("person.born")}:{" "}
                          {formatDate(
                            person.birthDateNote || person.birthDate,
                            language
                          )}
                        </span>
                      )}
                      {person.deathDate && (
                        <span className="block heritage-text">
                          {t("person.died")}:{" "}
                          {formatDate(person.deathDate, language)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {person.birthPlace && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="heritage-text">
                      {t("person.bornIn")}: {person.birthPlace}
                    </span>
                  </div>
                )}
                {occupationText && (
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="heritage-text">{occupationText}</span>
                  </div>
                )}
              </div>
            </div>
            {biographyText && (
              <div>
                <h4 className="font-semibold heritage-text mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {t("person.biography")}
                </h4>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {biographyText}
                </p>
              </div>
            )}
            {hasAnecdotes && (
              <div>
                <h4 className="font-semibold heritage-text mb-3 flex items-center">
                  <MessageSquareText className="w-4 h-4 mr-2" />
                  {t("person.anecdotes")}
                </h4>
                <div className="space-y-4">
                  {person.anecdotes?.map((anecdote, index) => (
                    <blockquote
                      key={index}
                      className="border-l-4 border-heritage-gray dark:border-heritage-gold pl-4 italic text-muted-foreground"
                    >
                      {getDynamicText(anecdote)}
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h4 className="font-semibold heritage-text mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {t("person.family")}
              </h4>
              <div className="space-y-4">
                {parents.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm heritage-text mb-2">
                      {t("person.parents")}:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {parents.map((p) => (
                        <Badge
                          key={p.id}
                          variant="secondary"
                          className="cursor-pointer bg-stone-100 dark:bg-card hover:bg-stone-200 dark:hover:bg-border"
                          onClick={() => onPersonClick(p)}
                        >
                          {p.firstName} {p.lastName}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {spouses.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm heritage-text mb-2">
                      {t("person.spouse")}:
                    </h5>
                    <div className="flex flex-col gap-2 items-start">
                      {spouses.map((spouse) => {
                        const marriage = person.marriages?.find(
                          (m) => m.spouseId === spouse.id
                        );
                        return (
                          <div
                            key={spouse.id}
                            className="flex items-center gap-2 bg-stone-100 dark:bg-card rounded-full pr-3"
                          >
                            <Badge
                              variant="secondary"
                              className="cursor-pointer bg-stone-100 dark:bg-card hover:bg-stone-200 dark:hover:bg-border rounded-full py-1"
                              onClick={() => onPersonClick(spouse)}
                            >
                              {spouse.firstName} {spouse.lastName}
                            </Badge>
                            {marriage?.date && (
                              <span className="text-xs text-muted-foreground">
                                ({t("person.marriedOn")}:{" "}
                                {formatDate(marriage.date, language)})
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {children.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm heritage-text mb-2">
                      {t("person.children")}:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {children.map((p) => (
                        <Badge
                          key={p.id}
                          variant="secondary"
                          className="cursor-pointer bg-stone-100 dark:bg-card hover:bg-stone-200 dark:hover:bg-border"
                          onClick={() => onPersonClick(p)}
                        >
                          {p.firstName} {p.lastName}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
