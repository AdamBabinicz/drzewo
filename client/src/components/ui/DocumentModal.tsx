import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { X, BookText, FileText, CheckSquare } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import genealogyData from "@/data/index";

interface DocumentModalProps {
  documentId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentModal({
  documentId,
  isOpen,
  onClose,
}: DocumentModalProps) {
  const { language } = useLanguage();
  const document = genealogyData.documents.find((d) => d.id === documentId);

  if (!document) return null;

  const title =
    (language === "en" ? document.title_en : document.title_pl) || "";
  const description =
    (language === "en" ? document.description_en : document.description_pl) ||
    "";
  const transcriptionText = document.transcription || "";
  const translationText =
    (language === "en" ? document.translation_en : document.translation_pl) ||
    "";

  const keyInfoTitle =
    language === "en" ? "Key Information" : "Kluczowe informacje";
  const transcriptionTitle =
    language === "en" ? "Transcription" : "Transkrypcja";
  const translationTitle = language === "en" ? "Translation" : "Tłumaczenie";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-4xl max-h-[90vh] bg-stone-100 dark:bg-background-alt flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="font-serif text-2xl heritage-text">
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-3">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-white dark:bg-card p-1 rounded-md">
                <img
                  src={document.imageUrl}
                  alt={title}
                  className="w-full h-auto rounded-md"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-6">
              {document.extracted_data && (
                <div>
                  <h4 className="font-semibold heritage-text mb-3 flex items-center">
                    <CheckSquare className="w-4 h-4 mr-2" />
                    {keyInfoTitle}
                  </h4>
                  <div className="space-y-1">
                    {document.extracted_data.map((item, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-semibold text-muted-foreground">
                          {language === "en" ? item.label_en : item.label_pl}:
                        </span>{" "}
                        <span className="heritage-text">
                          {language === "en" ? item.value_en : item.value_pl}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {transcriptionText && (
                <div>
                  <h4 className="font-semibold heritage-text mb-3 flex items-center">
                    <BookText className="w-4 h-4 mr-2" />
                    {transcriptionTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed p-3 bg-white dark:bg-card rounded-md">
                    {transcriptionText}
                  </p>
                </div>
              )}
              {translationText && (
                <div>
                  <h4 className="font-semibold heritage-text mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    {translationTitle}
                  </h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed p-3 bg-white dark:bg-card rounded-md">
                    {translationText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
