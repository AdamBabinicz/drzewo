import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Landmark } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Place } from "../../../../shared/schema";

interface PlaceModalProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlaceModal({
  place,
  isOpen,
  onClose,
}: PlaceModalProps) {
  const { language } = useLanguage();

  if (!place) return null;

  const getDynamicText = (
    field: { pl: string; en: string } | string | null | undefined
  ) => {
    if (!field) return "";
    if (typeof field === "object" && field !== null && "pl" in field) {
      return field[language as keyof typeof field] || field.pl;
    }
    return field;
  };

  const historyText = getDynamicText(place.history);
  const descriptionText = getDynamicText(place.description);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-4xl max-h-[90vh] bg-stone-100 dark:bg-background-alt flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="font-serif text-2xl heritage-text flex items-center">
            <Landmark className="w-6 h-6 mr-3" />
            {place.name}
          </DialogTitle>
          {descriptionText && (
            <DialogDescription>{descriptionText}</DialogDescription>
          )}
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="hidden md:block bg-white dark:bg-card p-1 rounded-md">
              <img
                src={place.imageUrl || "/images/boc.avif"}
                alt={place.name}
                className="w-full h-auto rounded-md object-cover"
                loading="lazy"
              />
            </div>
          </ScrollArea>

          <ScrollArea className="h-full">
            <div className="space-y-6 sm:pr-4">
              {historyText && (
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p className="whitespace-pre-wrap">{historyText}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
