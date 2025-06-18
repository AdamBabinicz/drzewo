import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PersonCard from '@/components/ui/PersonCard';
import PersonModal from '@/components/ui/PersonModal';
import { Person } from '@shared/schema';
import { Search } from 'lucide-react';
import SEO from '@/components/SEO';
import genealogyData from '@/data/genealogy.json';

export default function PersonIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: people = [] } = useQuery({
    queryKey: ['/api/people'],
    queryFn: () => Promise.resolve(genealogyData.people as Person[]),
  });

  // Get all unique first letters of surnames
  const availableLetters = useMemo(() => {
    const letters = new Set(
      people.map(person => person.lastName.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  }, [people]);

  // Filter people based on search term and selected letter
  const filteredPeople = useMemo(() => {
    let filtered = people;

    if (searchTerm) {
      filtered = filtered.filter(person =>
        `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (person.maidenName && person.maidenName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.birthPlace && person.birthPlace.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedLetter) {
      filtered = filtered.filter(person =>
        person.lastName.charAt(0).toUpperCase() === selectedLetter
      );
    }

    return filtered.sort((a, b) => {
      const nameA = `${a.lastName} ${a.firstName}`.toLowerCase();
      const nameB = `${b.lastName} ${b.firstName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [people, searchTerm, selectedLetter]);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(selectedLetter === letter ? null : letter);
  };

  return (
    <>
      <SEO
        title="Indeks Osób"
        description="Alfabetyczny spis wszystkich osób w bazie genealogicznej rodów Gierczak i Ofiara. Szukaj swoich przodków i poznaj ich historie."
      />

      <div className="min-h-screen bg-stone-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-4">
                Indeks Osób
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Alfabetyczny spis wszystkich osób w bazie genealogicznej
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Szukaj osoby..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-500" />
            </div>
          </div>

          {/* Alphabet Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {availableLetters.map(letter => (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "default" : "outline"}
                size="sm"
                className={`w-10 h-10 ${
                  selectedLetter === letter 
                    ? 'btn-heritage-burgundy' 
                    : 'heritage-border heritage-text hover:bg-stone-100'
                }`}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </Button>
            ))}
            {selectedLetter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedLetter(null)}
                className="text-stone-600 hover:text-stone-800"
              >
                Wyczyść
              </Button>
            )}
          </div>

          {/* Results Stats */}
          <div className="text-center mb-6">
            <p className="text-stone-600">
              Znaleziono <span className="font-semibold heritage-text">{filteredPeople.length}</span> osób
              {selectedLetter && ` na literę "${selectedLetter}"`}
              {searchTerm && ` pasujących do "${searchTerm}"`}
            </p>
          </div>

          {/* Person List */}
          {filteredPeople.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPeople.map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onClick={() => handlePersonClick(person)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-500" />
              </div>
              <h3 className="text-lg font-semibold heritage-text mb-2">
                Nie znaleziono osób
              </h3>
              <p className="text-stone-600 mb-4">
                Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry.
              </p>
              {(searchTerm || selectedLetter) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLetter(null);
                  }}
                  className="heritage-border heritage-text hover:bg-stone-100"
                >
                  Wyczyść filtry
                </Button>
              )}
            </div>
          )}

          {/* Load More Button (if needed for large datasets) */}
          {filteredPeople.length > 50 && (
            <div className="text-center mt-8">
              <Button className="btn-heritage-burgundy">
                Pokaż więcej osób
              </Button>
            </div>
          )}
        </div>

        {/* Person Modal */}
        <PersonModal
          person={selectedPerson}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onPersonClick={handlePersonClick}
          allPeople={people}
        />
      </div>
    </>
  );
}
