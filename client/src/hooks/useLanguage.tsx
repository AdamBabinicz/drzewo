import { createContext, useContext, useState } from 'react';

type Language = 'pl' | 'en';

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  pl: {
    // Navigation
    'nav.home': 'Strona Główna',
    'nav.tree': 'Drzewo Interaktywne',
    'nav.families': 'Rody',
    'nav.index': 'Indeks Osób',
    'nav.gallery': 'Galeria',
    'nav.sources': 'Źródła',
    
    // Family names
    'family.gierczak': 'Gierczakowie',
    'family.ofiara': 'Ofiarowie',
    'family.origin': 'Pochodzenie',
    'family.period': 'Okres',
    'family.members': 'Członkowie rodziny',
    'family.timeline': 'Linia czasu',
    
    // Common
    'common.born': 'ur.',
    'common.died': 'zm.',
    'common.married': 'śl.',
    'common.occupation': 'Zawód',
    'common.biography': 'Biografia',
    'common.family': 'Rodzina',
    'common.documents': 'Dokumenty',
    'common.places': 'Miejsca',
    'common.search': 'Szukaj',
    'common.close': 'Zamknij',
    'common.view': 'Zobacz',
    
    // Home page
    'home.title': 'Historia Rodów Gierczak i Ofiara',
    'home.subtitle': 'Odkryj fascynującą historię dwóch rodów z okolic Radomia',
    'home.description': 'Odkryj fascynującą historię dwóch rodów z okolic Radomia. Prześledzij losy pokoleń, poznaj ich historie i zobacz, jak przeplatały się ich życiowe ścieżki.',
    'home.cta.tree': 'Zobacz Interaktywne Drzewo',
    'home.cta.history': 'Poznaj Historię',
    
    // About section
    'about.title': 'O Projekcie',
    'about.history': 'Historia',
    'about.gierczak.title': 'Ród Gierczaków',
    'about.gierczak.description': 'Odkryj historię rodziny Gierczaków, której korzenie sięgają XVIII wieku. Poznaj ich tradycje, zawody i miejsca zamieszkania.',
    'about.ofiara.title': 'Ród Ofiarów', 
    'about.ofiara.description': 'Poznaj fascynującą historię rodziny Ofiarów i ich związki z regionem radomskim. Śledź ich genealogiczne ścieżki przez pokolenia.',
    'about.features.title': 'Funkcje',
    'about.features.interactive': 'Interaktywne drzewo genealogiczne',
    'about.features.gallery': 'Galeria rodzinnych fotografii',
    'about.features.sources': 'Dokumentacja źródeł historycznych',
    'about.features.search': 'Zaawansowane wyszukiwanie osób',
    
    // Tree page
    'tree.title': 'Interaktywne Drzewo Genealogiczne',
    'tree.subtitle': 'Eksploruj powiązania rodzinne w interaktywny sposób',
    
    // Person modal
    'person.parents': 'Rodzice',
    'person.spouse': 'Małżonek',
    'person.children': 'Dzieci',
    'person.showInTree': 'Pokaż w drzewie',
    
    // Gallery
    'gallery.title': 'Galeria Rodzinna',
    'gallery.subtitle': 'Portrety, dokumenty i miejsca związane z historią rodzin',
    'gallery.all': 'Wszystkie',
    'gallery.portraits': 'Portrety',
    'gallery.documents': 'Dokumenty',
    'gallery.places': 'Miejsca',
    
    // Index page
    'index.description': 'Przeszukaj wszystkie osoby z drzewa genealogicznego. Użyj filtrów, aby zawęzić wyniki.',
    'index.filters': 'Filtry',
    'index.generation': 'Pokolenie',
    'index.family': 'Rodzina',
    'index.century': 'Wiek',
    'index.results': 'wyników',
    'index.noResults': 'Nie znaleziono osób pasujących do kryteriów',
    
    // Sources
    'sources.title': 'Źródła i Bibliografia',
    'sources.subtitle': 'Dokumentacja źródeł wykorzystanych w badaniach genealogicznych',
    
    // Family branch page
    'familyBranch.title': 'Ród Rodziny',
    'familyBranch.gierczak.title': 'Ród Gierczaków',
    'familyBranch.ofiara.title': 'Ród Ofiarów',
    'familyBranch.gierczak.description': 'Odkryj historię rodziny Gierczaków, której korzenie sięgają XVIII wieku w regionie radomskim.',
    'familyBranch.ofiara.description': 'Poznaj fascynującą historię rodziny Ofiarów i ich związki z okolicami Radomia.',
    'familyBranch.overview': 'Przegląd',
    'familyBranch.keyFigures': 'Kluczowe Postacie',
    'familyBranch.timeline': 'Linia Czasu Rodziny',
    'familyBranch.places': 'Ważne Miejsca',
    'familyBranch.viewTree': 'Zobacz w Interaktywnym Drzewie',
    'familyBranch.notFound': 'Nie znaleziono rodziny',
    'familyBranch.backToFamilies': 'Powrót do Rodzin'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tree': 'Interactive Tree',
    'nav.families': 'Families',
    'nav.index': 'Person Index',
    'nav.gallery': 'Gallery',
    'nav.sources': 'Sources',
    
    // Family names
    'family.gierczak': 'Gierczak Family',
    'family.ofiara': 'Ofiara Family',
    'family.origin': 'Origin',
    'family.period': 'Period',
    'family.members': 'Family members',
    'family.timeline': 'Timeline',
    
    // Common
    'common.born': 'b.',
    'common.died': 'd.',
    'common.married': 'm.',
    'common.occupation': 'Occupation',
    'common.biography': 'Biography',
    'common.family': 'Family',
    'common.documents': 'Documents',
    'common.places': 'Places',
    'common.search': 'Search',
    'common.close': 'Close',
    'common.view': 'View',
    
    // Home page
    'home.title': 'History of Gierczak and Ofiara Families',
    'home.subtitle': 'Discover the fascinating history of two families from the Radom area',
    'home.description': 'Discover the fascinating history of two families from the Radom area. Trace the fate of generations, learn their stories and see how their life paths intertwined.',
    'home.cta.tree': 'View Interactive Tree',
    'home.cta.history': 'Learn the History',
    
    // About section
    'about.title': 'About the Project',
    'about.history': 'History',
    'about.gierczak.title': 'Gierczak Family',
    'about.gierczak.description': 'Discover the history of the Gierczak family, whose roots date back to the 18th century. Learn about their traditions, occupations and places of residence.',
    'about.ofiara.title': 'Ofiara Family',
    'about.ofiara.description': 'Learn the fascinating history of the Ofiara family and their connections to the Radom region. Follow their genealogical paths through generations.',
    'about.features.title': 'Features',
    'about.features.interactive': 'Interactive genealogical tree',
    'about.features.gallery': 'Family photo gallery',
    'about.features.sources': 'Historical sources documentation',
    'about.features.search': 'Advanced people search',
    
    // Tree page
    'tree.title': 'Interactive Genealogical Tree',
    'tree.subtitle': 'Explore family connections in an interactive way',
    
    // Person modal
    'person.parents': 'Parents',
    'person.spouse': 'Spouse',
    'person.children': 'Children',
    'person.showInTree': 'Show in tree',
    
    // Gallery
    'gallery.title': 'Family Gallery',
    'gallery.subtitle': 'Portraits, documents and places related to family history',
    'gallery.all': 'All',
    'gallery.portraits': 'Portraits',
    'gallery.documents': 'Documents',
    'gallery.places': 'Places',
    
    // Index page
    'index.description': 'Search all people from the genealogical tree. Use filters to narrow down results.',
    'index.filters': 'Filters',
    'index.generation': 'Generation',
    'index.family': 'Family',
    'index.century': 'Century',
    'index.results': 'results',
    'index.noResults': 'No people found matching the criteria',
    
    // Sources
    'sources.title': 'Sources and Bibliography',
    'sources.subtitle': 'Documentation of sources used in genealogical research',
    
    // Family branch page
    'familyBranch.title': 'Family Branch',
    'familyBranch.gierczak.title': 'Gierczak Family Branch',
    'familyBranch.ofiara.title': 'Ofiara Family Branch',
    'familyBranch.gierczak.description': 'Discover the history of the Gierczak family, whose roots date back to the 18th century in the Radom region.',
    'familyBranch.ofiara.description': 'Learn about the fascinating history of the Ofiara family and their connections to the Radom area.',
    'familyBranch.overview': 'Overview',
    'familyBranch.keyFigures': 'Key Figures',
    'familyBranch.timeline': 'Family Timeline',
    'familyBranch.places': 'Important Places',
    'familyBranch.viewTree': 'View in Interactive Tree',
    'familyBranch.notFound': 'Family branch not found',
    'familyBranch.backToFamilies': 'Back to Families'
  }
};

const initialState: LanguageProviderState = {
  language: 'pl',
  setLanguage: () => null,
  t: () => '',
};

const LanguageProviderContext = createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = 'pl',
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('genealogy-language') as Language) || defaultLanguage
  );

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pl']] || key;
  };

  const value = {
    language,
    setLanguage: (newLanguage: Language) => {
      localStorage.setItem('genealogy-language', newLanguage);
      setLanguage(newLanguage);
    },
    t,
  };

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined)
    throw new Error('useLanguage must be used within a LanguageProvider');

  return context;
};