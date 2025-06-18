import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import InteractiveTree from '@/components/tree/InteractiveTree';
import PersonModal from '@/components/ui/PersonModal';
import { Person } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import { useLanguage } from '@/hooks/useLanguage';

export default function InteractiveTreeView() {
  const { t } = useLanguage();
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Use API call to get data from server
  const { data: people = [], isLoading, error } = useQuery({
    queryKey: ['/api/people'],
  });

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPerson(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
          <div className="space-y-2">
            <Skeleton className="h-20 w-20 rounded-full mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Nie udało się załadować danych genealogicznych. Spróbuj ponownie później.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={t('tree.title')}
        description="Eksploruj interaktywne drzewo genealogiczne rodów Gierczak i Ofiara. Kliknij na dowolną osobę, aby poznać jej historię i powiązania rodzinne."
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold heritage-gradient-text mb-4">
                {t('tree.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('tree.subtitle')}. Kliknij na dowolną osobę, aby poznać jej historię.
              </p>
            </div>
          </div>
        </div>

        {/* Tree Container */}
        <div className="h-[calc(100vh-200px)]">
          <div className="heritage-card mx-4 my-4 rounded-xl h-full relative">
            <InteractiveTree 
              people={people}
              onPersonClick={handlePersonClick}
            />
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-md heritage-border">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-[hsl(var(--heritage-burgundy))] bg-card rounded mr-2"></div>
                  <span className="heritage-text">{t('family.gierczak')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-[hsl(var(--heritage-teal))] bg-card rounded mr-2"></div>
                  <span className="heritage-text">{t('family.ofiara')}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-0.5 bg-[hsl(var(--heritage-burgundy))] mr-2"></div>
                  <span className="heritage-text">Potomkowie</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-0.5 bg-[hsl(var(--heritage-teal))] border-dashed border-t-2 mr-2"></div>
                  <span className="heritage-text">Małżeństwa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Person Modal */}
        <PersonModal
          person={selectedPerson}
          isOpen={modalOpen}
          onClose={handleModalClose}
          onPersonClick={handlePersonClick}
          allPeople={people}
        />
      </div>
    </>
  );
}
