import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Lightbox from '@/components/ui/Lightbox';
import { Images, FileText, MapPin } from 'lucide-react';
import SEO from '@/components/SEO';
import genealogyData from '@/data/genealogy.json';

type GalleryCategory = 'all' | 'portraits' | 'documents' | 'places';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
  description?: string;
}

export default function GalleryView() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{src: string, alt: string} | null>(null);

  // Sample gallery items based on design reference
  const galleryItems: GalleryItem[] = [
    // Portrait Images
    {
      id: 'portrait-1',
      src: 'https://pixabay.com/get/ge9be98d848c4e8bc4954ba6dbe5de827949c78af3e21a825b69a77c486e58451213712661f85d56cfbcf485cfe76445d09795914a0a222a43c5c20d7cda03bd7_1280.jpg',
      alt: 'Portret rodzinny z początku XX wieku',
      category: 'portraits',
      title: 'Portret rodzinny',
      description: 'Rodzina Gierczak, około 1900 roku'
    },
    {
      id: 'portrait-2',
      src: 'https://pixabay.com/get/g1908ecf58b4143e9118bd5445daf3ce09e07b361b50e7bcf241a909c59fb808fd33ed404883842f46aa09ab013b5fbf57c94d12f13d6419b1ecdf2dcb55bdf02_1280.jpg',
      alt: 'Zdjęcie ślubne z lat 20. XX wieku',
      category: 'portraits',
      title: 'Zdjęcie ślubne',
      description: 'Ślub w rodzinie Ofiara, lata 20. XX wieku'
    },
    {
      id: 'portrait-3',
      src: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400',
      alt: 'Portret starszego człowieka w tradycyjnym stroju',
      category: 'portraits',
      title: 'Portret przodka',
      description: 'Jeden z najstarszych członków rodu'
    },
    {
      id: 'portrait-4',
      src: 'https://pixabay.com/get/ge355f6892961a613268a8762a7c59a43aa0c6c80c15c1aeaacf76b5ef4f4648348cb4de8cff97dd4fd2a10b5e0a3a4498252a58daca4f8fa7fb0cdb1a96bb92a_1280.jpg',
      alt: 'Portret kobiety z początku XX wieku',
      category: 'portraits',
      title: 'Portret kobiety',
      description: 'Członkini rodziny Ofiara'
    },

    // Document Images
    {
      id: 'doc-1',
      src: 'https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400',
      alt: 'Stary akt urodzenia z pieczęciami urzędowymi',
      category: 'documents',
      title: 'Akt urodzenia',
      description: 'Metryka urodzenia z parafii Cerekiew'
    },
    {
      id: 'doc-2',
      src: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400',
      alt: 'Strona z księgi metrykalnej ślubów',
      category: 'documents',
      title: 'Księga małżeństw',
      description: 'Wpis o ślubie w księgach parafialnych'
    },
    {
      id: 'doc-3',
      src: 'https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400',
      alt: 'Stary dokument prawny z pieczęcią woskową',
      category: 'documents',
      title: 'Dokument prawny',
      description: 'Akt własności ziemi'
    },
    {
      id: 'doc-4',
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400',
      alt: 'Ręcznie napisane drzewo genealogiczne',
      category: 'documents',
      title: 'Drzewo genealogiczne',
      description: 'Ręcznie sporządzone drzewo rodzinne'
    },

    // Place Images  
    {
      id: 'place-1',
      src: 'https://pixabay.com/get/gb838724c97b3a06a5d1601e0b3b6bf647cd39a9f2864f9eca85b44338a6b803e640ae27baffbb7af9d06ecb886cb71acdacac9eebb44f455475a9307ddf35d84_1280.jpg',
      alt: 'Drewniany kościół z cmentarzem w Cerekwi',
      category: 'places',
      title: 'Kościół w Cerekwi',
      description: 'Parafia, w której ochrzczono i pochowano wielu członków rodzin'
    },
    {
      id: 'place-2',
      src: 'https://pixabay.com/get/g6de97cc45e5be3ce1aeb68017b82f940edbf35e49e84af44d015428e2a44627d2b92d479ce214d6c1c57ce44a7817d354c44c1aa522bccafb98d1328dcdbb05e_1280.jpg',
      alt: 'Historyczne zabudowania wsi Jaszowice',
      category: 'places',
      title: 'Wieś Jaszowice',
      description: 'Główne miejsce zamieszkania rodu Gierczaków'
    },
    {
      id: 'place-3',
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400',
      alt: 'Stary cmentarz z nagrobkami rodzinnymi',
      category: 'places',
      title: 'Stary cmentarz',
      description: 'Miejsce spoczynku przodków'
    }
  ];

  const categories = [
    { id: 'all' as const, name: 'Wszystkie', icon: Images },
    { id: 'portraits' as const, name: 'Portrety', icon: Images },
    { id: 'documents' as const, name: 'Dokumenty', icon: FileText },
    { id: 'places' as const, name: 'Miejsca', icon: MapPin },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleImageClick = (item: GalleryItem) => {
    setLightboxImage({ src: item.src, alt: `${item.title} - ${item.description || item.alt}` });
    setLightboxOpen(true);
  };

  return (
    <>
      <SEO
        title="Galeria"
        description="Galeria zdjęć, dokumentów i miejsc związanych z historią rodów Gierczak i Ofiara. Portrety rodzinne, historyczne dokumenty i ważne miejsca."
      />

      <div className="min-h-screen bg-stone-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-4">
                Galeria Rodzinna
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Portrety, dokumenty i miejsca związane z historią rodzin
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  className={`px-6 py-2 ${
                    isActive 
                      ? 'btn-heritage-burgundy' 
                      : 'heritage-border heritage-text hover:bg-stone-100'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Results Stats */}
          <div className="text-center mb-8">
            <p className="text-stone-600">
              {selectedCategory === 'all' ? 'Wszystkie' : categories.find(c => c.id === selectedCategory)?.name} -{' '}
              <span className="font-semibold heritage-text">{filteredItems.length}</span> elementów
            </p>
          </div>

          {/* Gallery Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map(item => (
                <Card
                  key={item.id}
                  className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden"
                  onClick={() => handleImageClick(item)}
                >
                  <div className="relative">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <Images className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Powiększ</p>
                      </div>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${
                        item.category === 'portraits' ? 'bg-blue-500' :
                        item.category === 'documents' ? 'bg-green-500' :
                        item.category === 'places' ? 'bg-orange-500' : 'bg-stone-500'
                      }`}>
                        {categories.find(c => c.id === item.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <h3 className="font-semibold heritage-text text-sm mb-1 truncate">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-stone-600 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Images className="w-16 h-16 text-stone-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold heritage-text mb-2">
                Brak elementów w tej kategorii
              </h3>
              <p className="text-stone-600 mb-4">
                Wybierz inną kategorię lub wyświetl wszystkie elementy.
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategory('all')}
                className="heritage-border heritage-text hover:bg-stone-100"
              >
                Pokaż wszystkie
              </Button>
            </div>
          )}
        </div>

        {/* Lightbox */}
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          image={lightboxImage}
        />
      </div>
    </>
  );
}
