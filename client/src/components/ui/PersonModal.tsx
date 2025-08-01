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
  Asterisk,
  Focus,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Person, Anecdote, Event } from "../../../../shared/schema";
import { useLanguage } from "@/hooks/useLanguage";
import DocumentModal from "./DocumentModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./button";

interface PersonModalProps {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
  onPersonClick: (person: Person) => void;
  allPeople: Person[];
  onOpenKeepsakes: (person: Person) => void;
  onSetFocus?: (personId: number) => void;
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
  onOpenKeepsakes,
  onSetFocus,
}: PersonModalProps) {
  const { t, language } = useLanguage();
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null
  );

  if (!isOpen || !person || !allPeople) {
    return null;
  }

  const currentPerson = allPeople.find((p) => p.id === person.id) || person;

  if (!currentPerson) {
    return null;
  }

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

  const formatTimeWithContext = (
    time: string | null | undefined,
    qualifier: string | null | undefined
  ) => {
    if (!time) return null;
    if (qualifier) {
      const translatedQualifier = t(`time.${qualifier}`);
      return `${time} ${translatedQualifier}`;
    }
    return time;
  };

  const occupationText = getDynamicText(currentPerson.occupation);
  const biographyText = getDynamicText(currentPerson.biography);
  const hasAnecdotes =
    currentPerson.anecdotes && currentPerson.anecdotes.length > 0;
  const hasKeepsakes =
    currentPerson.keepsakes && currentPerson.keepsakes.length > 0;

  const parents = currentPerson.parentIds
    ? allPeople.filter((p) => currentPerson.parentIds!.includes(p.id))
    : [];
  const children = currentPerson.childIds
    ? allPeople.filter((p) => currentPerson.childIds!.includes(p.id))
    : [];

  const familyName =
    currentPerson.family === "gierczak"
      ? t("family.gierczak")
      : t("family.ofiara");
  const familyColor =
    currentPerson.family === "gierczak" ? "heritage-burgundy" : "heritage-teal";

  const birthEvent = currentPerson.events?.find(
    (e: Event) => e.type === "birth"
  );
  const deathEvent = currentPerson.events?.find(
    (e: Event) => e.type === "death"
  );

  const birthDocId = birthEvent?.source?.documentId;
  const deathDocId = deathEvent?.source?.documentId;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <TooltipProvider>
          <DialogContent className="w-[95%] max-w-2xl max-h-[90vh] bg-stone-50 dark:bg-background-alt">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl heritage-text">
                {currentPerson.firstName} {currentPerson.lastName}
                {currentPerson.maidenName &&
                  ` (${t("person.maidenName")} ${currentPerson.maidenName})`}
              </DialogTitle>
              <DialogDescription className={`${familyColor}`}>
                {familyName}
              </DialogDescription>
            </DialogHeader>

            {onSetFocus && (
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-14"
                onClick={() => onSetFocus(currentPerson.id)}
              >
                <Focus className="w-4 h-4 mr-2" />
                {t("tree.setAsFocus")}
              </Button>
            )}

            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex-shrink-0">
                    <div className="w-48 h-48 bg-stone-200 dark:bg-background rounded-lg mx-auto flex items-center justify-center">
                      {currentPerson.photoUrl ? (
                        <img
                          src={currentPerson.photoUrl}
                          alt={`${currentPerson.firstName} ${currentPerson.lastName}`}
                          className="w-full h-full rounded-lg object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <User className="w-16 h-16 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    {(currentPerson.birthDate ||
                      currentPerson.birthDateNote ||
                      currentPerson.deathDate ||
                      currentPerson.deathDateNote) && (
                      <div className="flex items-start space-x-3">
                        <Calendar className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          {(currentPerson.birthDate ||
                            currentPerson.birthDateNote) && (
                            <div className="flex items-center gap-2">
                              <p className="heritage-text">
                                <span className="font-semibold">
                                  {t("person.born")}:
                                </span>{" "}
                                {formatDate(
                                  currentPerson.birthDateNote ||
                                    currentPerson.birthDate,
                                  language
                                )}
                              </p>
                              {birthDocId && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Book
                                      className="w-4 h-4 text-blue-500 cursor-pointer"
                                      onClick={() =>
                                        handleDocumentClick(birthDocId)
                                      }
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{t("tooltip.viewBirthRecord")}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          )}
                          {(currentPerson.deathDate ||
                            currentPerson.deathDateNote) && (
                            <div className="flex items-center gap-2">
                              <p className="heritage-text">
                                <span className="font-semibold">
                                  {t("person.died")}:
                                </span>{" "}
                                {formatDate(
                                  currentPerson.deathDateNote ||
                                    currentPerson.deathDate,
                                  language
                                )}
                              </p>
                              {deathDocId && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Book
                                      className="w-4 h-4 text-blue-500 cursor-pointer"
                                      onClick={() =>
                                        handleDocumentClick(deathDocId)
                                      }
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{t("tooltip.viewDeathRecord")}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {currentPerson.marriages?.map((marriage, index) => {
                      const spouse = allPeople.find(
                        (p) => p.id === marriage.spouseId
                      );
                      if (!spouse) return null;

                      const marriageDocId = marriage.source?.documentId;

                      return (
                        <div key={index} className="flex items-start space-x-3">
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
                                {marriageDocId && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Book
                                        className="w-4 h-4 text-blue-500 cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDocumentClick(marriageDocId);
                                        }}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{t("tooltip.viewMarriageRecord")}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                                {marriage.note && (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <button
                                        aria-label={t(
                                          "tooltip.viewMarriageNote"
                                        )}
                                      >
                                        <Asterisk className="w-4 h-4 text-heritage-gold cursor-pointer" />
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="max-w-xs">
                                      <p>{getDynamicText(marriage.note)}</p>
                                    </PopoverContent>
                                  </Popover>
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
                            onClick={() => onOpenKeepsakes(currentPerson)}
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

                    {(currentPerson.birthTime || currentPerson.deathTime) && (
                      <div className="flex items-start space-x-3">
                        <Clock className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          {currentPerson.birthTime && (
                            <p className="heritage-text">
                              <span className="font-semibold">
                                {t("person.birthTime")}:
                              </span>{" "}
                              {formatTimeWithContext(
                                currentPerson.birthTime,
                                currentPerson.birthTimeQualifier
                              )}
                            </p>
                          )}
                          {currentPerson.deathTime && (
                            <p className="heritage-text">
                              <span className="font-semibold">
                                {t("person.deathTime")}:
                              </span>{" "}
                              {formatTimeWithContext(
                                currentPerson.deathTime,
                                currentPerson.deathTimeQualifier
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {currentPerson.birthPlace && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="heritage-text">
                          {t("person.bornIn")}: {currentPerson.birthPlace}
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
                      {currentPerson.anecdotes?.map(
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
    </>
  );
}
