import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Lightbox from "@/components/ui/Lightbox";
import { Images, FileText, MapPin, Search } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

type GalleryCategory = "all" | "portraits" | "documents" | "places";

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  titleKey: string;
  descriptionKey?: string;
}

export default function GalleryView() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "portrait-1",
      src: "/images/5.avif",
      alt: "Portret rodzinny z początku XX wieku",
      category: "portraits",
      titleKey: "gallery.item.portrait-1.title",
      descriptionKey: "gallery.item.portrait-1.desc",
    },
    {
      id: "portrait-2",
      src: "/images/33.avif",
      alt: "Zdjęcie mojej mamy z okresu powojennego",
      category: "portraits",
      titleKey: "gallery.item.portrait-2.title",
      descriptionKey: "gallery.item.portrait-2.desc",
    },
    {
      id: "portrait-3",
      src: "/images/przod.avif",
      alt: "Portret starszego człowieka w tradycyjnym stroju",
      category: "portraits",
      titleKey: "gallery.item.portrait-3.title",
      descriptionKey: "gallery.item.portrait-3.desc",
    },
    {
      id: "portrait-4",
      src: "/images/28.avif",
      alt: "Portret rodzinny z początku XX wieku",
      category: "portraits",
      titleKey: "gallery.item.portrait-4.title",
      descriptionKey: "gallery.item.portrait-4.desc",
    },
    {
      id: "doc-1",
      src: "/images/14.avif",
      alt: "Akt ślubu Jana i Agnieszki",
      category: "documents",
      titleKey: "gallery.item.doc-1.title",
      descriptionKey: "gallery.item.doc-1.desc",
    },
    {
      id: "doc-2",
      src: "/images/11.avif",
      alt: "Moja mama jako matka chrzestna Zofii Bilskiej",
      category: "portraits",
      titleKey: "gallery.item.doc-2.title",
      descriptionKey: "gallery.item.doc-2.desc",
    },
    {
      id: "doc-3",
      src: "/images/rozalia-mitak.avif",
      alt: "Stary dokument prawny z pieczęcią woskową",
      category: "documents",
      titleKey: "gallery.item.doc-3.title",
      descriptionKey: "gallery.item.doc-3.desc",
    },
    {
      id: "doc-4",
      src: "/images/1.avif",
      alt: "Ręcznie napisane drzewo genealogiczne",
      category: "documents",
      titleKey: "gallery.item.doc-4.title",
      descriptionKey: "gallery.item.doc-4.desc",
    },
    {
      id: "place-1",
      src: "/images/31.avif",
      alt: "I Komunia Św. mojego wujka Romana Ofiary",
      category: "portraits",
      titleKey: "gallery.item.place-1.title",
      descriptionKey: "gallery.item.place-1.desc",
    },
    {
      id: "place-2",
      src: "/images/24.avif",
      alt: "Historyczne zabudowania wsi Jaszowice",
      category: "places",
      titleKey: "gallery.item.place-2.title",
      descriptionKey: "gallery.item.place-2.desc",
    },
    {
      id: "place-3",
      src: "/images/2.avif",
      alt: "Stary cmentarz z nagrobkami rodzinnymi",
      category: "places",
      titleKey: "gallery.item.place-3.title",
      descriptionKey: "gallery.item.place-3.desc",
    },
  ];

  const categories = [
    { id: "all" as const, name: t("gallery.filter.all"), icon: Images },
    {
      id: "portraits" as const,
      name: t("gallery.filter.portraits"),
      icon: Images,
    },
    {
      id: "documents" as const,
      name: t("gallery.filter.documents"),
      icon: FileText,
    },
    { id: "places" as const, name: t("gallery.filter.places"), icon: MapPin },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const handleImageClick = (item: GalleryItem) => {
    const title = t(item.titleKey);
    const description = item.descriptionKey ? t(item.descriptionKey) : "";
    setLightboxImage({
      src: item.src,
      alt: `${title}${description ? ` - ${description}` : ""}`,
    });
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO title={t("gallery.title")} description={t("gallery.subtitle")} />
      <div className="bg-background">
        <div className="heritage-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Images className="w-16 h-16 heritage-gold mx-auto mb-4" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold heritage-text mb-4">
              {t("gallery.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("gallery.subtitle")}
            </p>
          </div>
        </div>

        <div className="bg-stone-50 dark:bg-background-alt py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "outline"}
                    className={`px-4 py-2 sm:px-6 sm:py-2 transition-all duration-200 ${
                      isActive
                        ? "btn-heritage-burgundy scale-105 shadow-lg"
                        : "heritage-border heritage-text hover:bg-heritage-cream dark:hover:bg-card"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gradient-dark-brown py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                {categories.find((c) => c.id === selectedCategory)?.name} -{" "}
                <span className="font-semibold heritage-text">
                  {t("gallery.results", { count: filteredItems.length })}
                </span>
              </p>
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer hover:shadow-xl transition-all overflow-hidden heritage-card"
                    onClick={() => handleImageClick(item)}
                  >
                    {/* 1. ZMIANA: Kontener z obrazem ma teraz stałe proporcje (kwadrat) */}
                    <div className="relative aspect-square">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-center p-4">
                          <Search className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">
                            {t("gallery.zoom")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold heritage-text text-base mb-1 truncate">
                        {t(item.titleKey)}
                      </h3>
                      {/* 2. ZMIANA: Paragraf z opisem ma stałą wysokość (2 linie tekstu) */}
                      <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                        {item.descriptionKey ? t(item.descriptionKey) : ""}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto mb-4 border-2 heritage-border">
                  <Images className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold heritage-text mb-2">
                  {t("gallery.noResults.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("gallery.noResults.desc")}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory("all")}
                >
                  {t("gallery.noResults.cta")}
                </Button>
              </div>
            )}
          </div>
        </div>

        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          image={lightboxImage}
        />
      </div>
    </>
  );
}
