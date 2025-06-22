import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
  } | null;
}

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl max-h-screen p-0 bg-black/90 border-none"
        // --- KLUCZOWA POPRAWKA ---
        // Dodajemy ten atrybut, aby wyciszyć ostrzeżenie o braku opisu.
        aria-describedby={undefined}
      >
        <div className="relative flex items-center justify-center min-h-[50vh]">
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>

          {image.alt && (
            <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-black/50 backdrop-blur-sm rounded-lg p-3">
              {image.alt}
            </div>
          )}
        </div>
        <DialogTitle className="sr-only">{image.alt}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
