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
    'home.cta.tree': 'Zobacz Interaktywne Drzewo',
    'home.cta.history': 'Poznaj Historię',
    
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
    
    // Sources
    'sources.title': 'Źródła i Bibliografia',
    'sources.subtitle': 'Dokumentacja źródeł wykorzystanych w badaniach genealogicznych'
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
    'home.cta.tree': 'View Interactive Tree',
    'home.cta.history': 'Learn the History',
    
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
    
    // Sources
    'sources.title': 'Sources and Bibliography',
    'sources.subtitle': 'Documentation of sources used in genealogical research'
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