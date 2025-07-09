import { useState } from "react";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Person, Keepsake } from "../../../../shared/schema";

type SlideWithDescription = Slide & {
  description?: string;
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
    if (!field) return "";
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

  const lightboxSlides: SlideWithDescription[] = keepsakes.map(
    (k: Keepsake) => ({
      src: k.imageUrl,
      title: getDynamicText(k.title),
      description: getDynamicText(k.description),
    })
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose} modal={false}>
        <DialogContent
          onInteractOutside={(e) => {
            if (lightboxOpen) {
              e.preventDefault();
            }
          }}
          className="w-[95%] max-w-4xl max-h-[90vh] bg-stone-50 dark:bg-background-alt top-4 translate-y-0 md:top-1/2 md:-translate-y-1/2 flex flex-col"
        >
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

          <div className="flex-1 overflow-y-auto">
            <div className="grid gap-4 p-1 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
              {keepsakes.map((keepsake: Keepsake, index: number) => (
                <div
                  key={index}
                  className="heritage-card p-3 cursor-pointer group"
                  onClick={() => handleImageClick(index)}
                >
                  <div className="overflow-hidden rounded-md mb-3 aspect-square">
                    <img
                      src={keepsake.imageUrl}
                      alt={getDynamicText(keepsake.title)}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
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
          </div>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">{t("keepsakes.close")}</span>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {lightboxOpen && (
        <Lightbox
          className="custom-lightbox"
          plugins={[Captions, Fullscreen, Zoom]}
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={lightboxIndex}
          carousel={{ finite: true }}
          controller={{ closeOnBackdropClick: true }}
          captions={{
            descriptionTextAlign: "center",
            descriptionMaxLines: 5,
          }}
        />
      )}
    </>
  );
}
