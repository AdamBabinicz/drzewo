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
  Clock,
  Book,
  Heart,
  Archive,
} from "lucide-react";
import { Person, Anecdote, Event } from "../../../../shared/schema";
import { useLanguage } from "@/hooks/useLanguage";
import DocumentModal from "./DocumentModal";
import KeepsakesModal from "./KeepsakesModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PersonModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
  onPersonClick: (person: Person) => void;
  allPeople: Person[];
}

const formatDate = (dateString: string | null | undefined, locale: string) => {
  if (!dateString || dateString === "?") return "?";
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

const renderTextWithLinks = (text: string) => {
  const parts = text.split(/<link>(.*?)<\/link>/g);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <a
              key={index}
              href="https://ognisko.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-heritage-burgundy hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

export default function PersonModal({
  person,
  isOpen,
  onClose,
  onPersonClick,
  allPeople,
}: PersonModalProps) {
  const { t, language } = useLanguage();
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null
  );
  const [keepsakesModalOpen, setKeepsakesModalOpen] = useState(false);

  if (!person) return null;

  const handleDocumentClick = (docId: number) => {
    setSelectedDocumentId(docId);
    setDocumentModalOpen(true);
  };

  const getDynamicText = (
    field: { pl: string; en: string } | string | null | undefined
  ) => {
    if (!field) return null;
    if (typeof field === "object" && field !== null && "pl" in field) {
      return field[language as keyof typeof field] || field.pl;
    }
    return field;
  };

  const formatTimeWithContext = (timeString: string | null | undefined) => {
    if (!timeString) return timeString;

    if (timeString.toLowerCase().includes("rano")) {
      const timePart = timeString.replace(/rano/gi, "").trim();
      return `${timePart} ${t("time.morning")}`.trim();
    }

    const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})$/);
    if (timeMatch) {
      const hour = parseInt(timeMatch[1], 10);
      if (hour < 12) {
        return `${timeString} ${t("time.morning")}`;
      }
    }

    return timeString;
  };

  const occupationText = getDynamicText(person.occupation);
  const biographyText = getDynamicText(person.biography);
  const hasAnecdotes = person.anecdotes && person.anecdotes.length > 0;
  const hasKeepsakes = person.keepsakes && person.keepsakes.length > 0;

  const parents = person.parentIds
    ? allPeople.filter((p) => person.parentIds!.includes(p.id))
    : [];
  const children = person.childIds
    ? allPeople.filter((p) => person.childIds!.includes(p.id))
    : [];

  const familyName =
    person.family === "gierczak" ? t("family.gierczak") : t("family.ofiara");
  const familyColor =
    person.family === "gierczak" ? "heritage-burgundy" : "heritage-teal";

  const birthEvent = person.events?.find((e: Event) => e.type === "birth");
  const deathEvent = person.events?.find((e: Event) => e.type === "death");

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <TooltipProvider>
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
                          {(person.birthDate || person.birthDateNote) && (
                            <div className="flex items-center gap-2">
                              <p className="heritage-text">
                                <span className="font-semibold">
                                  {t("person.born")}:
                                </span>{" "}
                                {formatDate(
                                  person.birthDateNote || person.birthDate,
                                  language
                                )}
                              </p>
                              {birthEvent && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Book
                                      className="w-4 h-4 text-blue-500 cursor-pointer"
                                      onClick={() =>
                                        handleDocumentClick(
                                          birthEvent.source.documentId
                                        )
                                      }
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Zobacz akt urodzenia</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          )}
                          {person.deathDate && (
                            <div className="flex items-center gap-2">
                              <p className="heritage-text">
                                <span className="font-semibold">
                                  {t("person.died")}:
                                </span>{" "}
                                {formatDate(person.deathDate, language)}
                              </p>
                              {deathEvent && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Book
                                      className="w-4 h-4 text-blue-500 cursor-pointer"
                                      onClick={() =>
                                        handleDocumentClick(
                                          deathEvent.source.documentId
                                        )
                                      }
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Zobacz akt zgonu</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {person.marriages?.map((marriage) => {
                      const spouse = allPeople.find(
                        (p) => p.id === marriage.spouseId
                      );
                      if (!spouse) return null;

                      return (
                        <div
                          key={marriage.spouseId}
                          className="flex items-start space-x-3"
                        >
                          <Heart className="w-4 h-4 text-muted-foreground mt-1" />
                          <div>
                            <p
                              className="heritage-text cursor-pointer hover:underline"
                              onClick={() => onPersonClick(spouse)}
                            >
                              <span className="font-semibold">
                                {t("person.marriedTo")}:
                              </span>{" "}
                              {spouse.firstName} {spouse.lastName}
                            </p>
                            {marriage.date && (
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(marriage.date, language)}
                                </p>
                                {marriage.source && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Book
                                        className="w-4 h-4 text-blue-500 cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDocumentClick(
                                            marriage.source!.documentId
                                          );
                                        }}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Zobacz akt ślubu</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {hasKeepsakes && (
                      <div className="flex items-start space-x-3">
                        <Archive className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <p
                            className="heritage-text cursor-pointer hover:underline"
                            onClick={() => setKeepsakesModalOpen(true)}
                          >
                            <span className="font-semibold">
                              {t("person.keepsakes")}
                            </span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t("person.hasKeepsakesDesc")}
                          </p>
                        </div>
                      </div>
                    )}

                    {(person.birthTime || person.deathTime) && (
                      <div className="flex items-start space-x-3">
                        <Clock className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          {person.birthTime && (
                            <p className="heritage-text">
                              <span className="font-semibold">
                                {t("person.birthTime")}:
                              </span>{" "}
                              {formatTimeWithContext(person.birthTime)}
                            </p>
                          )}
                          {person.deathTime && (
                            <p className="heritage-text">
                              <span className="font-semibold">
                                {t("person.deathTime")}:
                              </span>{" "}
                              {formatTimeWithContext(person.deathTime)}
                            </p>
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
                      {person.anecdotes?.map(
                        (anecdote: Anecdote, index: number) => (
                          <blockquote
                            key={index}
                            className="border-l-4 border-heritage-gray dark:border-heritage-gold pl-4 italic text-muted-foreground"
                          >
                            {renderTextWithLinks(
                              getDynamicText(anecdote) || ""
                            )}
                          </blockquote>
                        )
                      )}
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
        </TooltipProvider>
      </Dialog>
      <DocumentModal
        isOpen={documentModalOpen}
        onClose={() => setDocumentModalOpen(false)}
        documentId={selectedDocumentId}
      />
      {hasKeepsakes && (
        <KeepsakesModal
          isOpen={keepsakesModalOpen}
          onClose={() => setKeepsakesModalOpen(false)}
          person={person}
        />
      )}
    </>
  );
}
