import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PersonCard from "@/components/ui/PersonCard";
import PersonModal from "@/components/ui/PersonModal";
import { Person } from "@shared/schema";
import { Search } from "lucide-react";
import SEO from "@/components/SEO";
import genealogyData from "@/data/genealogy.json";
import { useLanguage } from "@/hooks/useLanguage";

export default function PersonIndex() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: people = [] } = useQuery({
    queryKey: ["/api/people"],
    queryFn: () => Promise.resolve(genealogyData.people as Person[]),
  });

  const availableLetters = useMemo(() => {
    const letters = new Set(
      people.map((person) => person.lastName.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  }, [people]);

  const filteredPeople = useMemo(() => {
    let filtered = people;
    if (searchTerm) {
      filtered = filtered.filter(
        (person) =>
          `${person.firstName} ${person.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (person.maidenName &&
            person.maidenName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (person.birthPlace &&
            person.birthPlace.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedLetter) {
      filtered = filtered.filter(
        (person) => person.lastName.charAt(0).toUpperCase() === selectedLetter
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
      <SEO title={t("index.title")} description={t("index.subtitle")} />
      <div className="min-h-screen bg-stone-50 dark:bg-card">
        <div className="bg-white dark:bg-background shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-4">
                {t("index.title")}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("index.subtitle")}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("index.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {availableLetters.map((letter) => (
              <Button
                key={letter}
                variant={selectedLetter === letter ? "default" : "outline"}
                size="sm"
                className={`w-10 h-10 ${
                  selectedLetter === letter
                    ? "btn-heritage-burgundy"
                    : "heritage-border heritage-text hover:bg-heritage-cream dark:hover:bg-background-alt"
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
                className="text-muted-foreground hover:text-foreground"
              >
                {t("index.clear")}
              </Button>
            )}
          </div>

          {/* --- NOWY WRAPPER DLA SEKCJI WYNIKÓW --- */}
          <div className="bg-white dark:bg-background-alt rounded-lg p-4 sm:p-8 mt-8">
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                {t("index.resultsFound", { count: filteredPeople.length })}
                {selectedLetter &&
                  t("index.resultsForLetter", { letter: selectedLetter })}
                {searchTerm &&
                  t("index.resultsForSearch", { term: searchTerm })}
              </p>
            </div>

            {filteredPeople.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPeople.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onClick={() => handlePersonClick(person)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border heritage-border">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold heritage-text mb-2">
                  {t("index.noResults.title")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t("index.noResults.desc")}
                </p>
                {(searchTerm || selectedLetter) && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedLetter(null);
                    }}
                    className="heritage-border heritage-text hover:bg-heritage-cream dark:hover:bg-background"
                  >
                    {t("index.noResults.cta")}
                  </Button>
                )}
              </div>
            )}
          </div>

          {filteredPeople.length > 50 && (
            <div className="text-center mt-8">
              <Button className="btn-heritage-burgundy">
                {t("index.showMore")}
              </Button>
            </div>
          )}
        </div>
      </div>

      <PersonModal
        person={selectedPerson}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPersonClick={handlePersonClick}
        allPeople={people}
      />
    </>
  );
}
