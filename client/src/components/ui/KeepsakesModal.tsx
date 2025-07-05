import { useState } from "react";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Person, Keepsake } from "../../../../shared/schema";

type CustomSlide = Slide & {
  customTitle?: string;
  customDescription?: string;
};

interface KeepsakesModalProps {
  person: Person;
  isOpen: boolean;
  onClose: () => void;
}

export default function KeepsakesModal({
  person,
  isOpen,
  onClose,
}: KeepsakesModalProps) {
  const { t, language } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getDynamicText = (
    field: { pl: string; en: string } | string | null | undefined
  ) => {
    if (!field) return null;
    if (typeof field === "object" && field !== null && "pl" in field) {
      return field[language as keyof typeof field] || field.pl;
    }
    return field;
  };

  const keepsakes = person.keepsakes || [];
  if (keepsakes.length === 0) return null;

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides: CustomSlide[] = keepsakes.map((k: Keepsake) => ({
    src: k.imageUrl,
    customTitle: getDynamicText(k.title) || undefined,
    customDescription: getDynamicText(k.description) || undefined,
  }));

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95%] max-w-4xl max-h-[90vh] bg-stone-50 dark:bg-background-alt">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl heritage-text">
              {t("keepsakes.modal.title", {
                name: `${person.firstName} ${person.lastName}`,
              })}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {t("person.hasKeepsakesDesc")}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-1">
              {keepsakes.map((keepsake: Keepsake, index: number) => (
                <div
                  key={index}
                  className="heritage-card p-3 cursor-pointer group"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="overflow-hidden rounded-md mb-3 aspect-square">
                    <img
                      src={keepsake.imageUrl}
                      alt={getDynamicText(keepsake.title) || ""}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-semibold heritage-text">
                    {getDynamicText(keepsake.title)}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {getDynamicText(keepsake.description)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">{t("keepsakes.close")}</span>
          </DialogClose>
        </DialogContent>
      </Dialog>

      <Lightbox
        className="custom-lightbox"
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        controller={{ closeOnBackdropClick: true }}
        render={{
          slide: ({ slide }) => {
            const customSlide = slide as CustomSlide;
            return (
              <div className="relative w-full h-full">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    alt={customSlide.customTitle || ""}
                    src={customSlide.src}
                    className="max-h-[85vh] max-w-[90vw] object-contain"
                  />
                </div>
                {(customSlide.customTitle || customSlide.customDescription) && (
                  <div className="absolute bottom-0 left-0 w-full p-8 text-center text-white bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                    <div className="max-w-full md:max-w-[50vw] mx-auto">
                      {customSlide.customTitle && (
                        <h3 className="font-serif text-xl font-semibold leading-tight">
                          {customSlide.customTitle}
                        </h3>
                      )}
                      {customSlide.customDescription && (
                        <p className="mt-2 text-base opacity-90">
                          {customSlide.customDescription}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          },
        }}
      />
    </>
  );
}
