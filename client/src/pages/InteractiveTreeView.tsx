import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import InteractiveTree from '@/components/tree/InteractiveTree';
import PersonModal from '@/components/ui/PersonModal';
import { Person } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import genealogyData from '@/data/genealogy.json';

export default function InteractiveTreeView() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Use local JSON data for now, can be replaced with API call
  const { data: people = [], isLoading, error } = useQuery({
    queryKey: ['/api/people'],
    queryFn: () => Promise.resolve(genealogyData.people as Person[]),
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
        title="Interaktywne Drzewo Genealogiczne"
        description="Eksploruj interaktywne drzewo genealogiczne rodów Gierczak i Ofiara. Kliknij na dowolną osobę, aby poznać jej historię i powiązania rodzinne."
      />

      <div className="min-h-screen bg-stone-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-4">
                Interaktywne Drzewo Genealogiczne
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Eksploruj powiązania rodzinne w interaktywny sposób. Kliknij na dowolną osobę, aby poznać jej historię.
              </p>
            </div>
          </div>
        </div>

        {/* Tree Container */}
        <div className="h-[calc(100vh-200px)]">
          <div className="bg-white mx-4 my-4 rounded-xl shadow-lg heritage-border h-full">
            <InteractiveTree 
              people={people}
              onPersonClick={handlePersonClick}
            />
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-[hsl(var(--heritage-burgundy))] bg-white rounded mr-2"></div>
                  <span className="heritage-text">Ród Gierczaków</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-[hsl(var(--heritage-teal))] bg-white rounded mr-2"></div>
                  <span className="heritage-text">Ród Ofiarów</span>
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
