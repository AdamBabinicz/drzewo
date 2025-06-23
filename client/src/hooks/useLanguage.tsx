import { createContext, useContext, useState } from "react";
import { useLocation } from "wouter";

type Language = "pl" | "en";

type LanguageProviderProps = {
  children: React.ReactNode;
  defaultLanguage?: Language;
};

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  p: (key: string) => string;
};

const translations = {
  pl: {
    "nav.title": "Korzenie rodu Gierczak i Ofiara",
    "nav.title.mobile": "Genealogia",
    "nav.description": "Nawigacja po historii rodu",
    "nav.home": "Strona Główna",
    "nav.tree": "Drzewo Interaktywne",
    "nav.families": "Rody",
    "nav.index": "Indeks Osób",
    "nav.gallery": "Galeria",
    "nav.sources": "Źródła",
    "nav.toggleTheme": "Zmień motyw",
    "nav.toggleLanguage": "Zmień język",
    "nav.openMenu": "Otwórz menu nawigacji",
    "nav.scrollToTop": "Przewiń do góry",

    "theme.light": "Jasny",
    "theme.dark": "Ciemny",
    "theme.system": "System",

    "family.gierczak": "Ród Gierczaków",
    "family.ofiara": "Ród Ofiarów",

    "home.title": "Historia Rodów Chłopskich",
    "home.subtitle": "Gierczak i Ofiara",
    "home.description":
      "Odkryj historię rodów Gierczak i Ofiara z okolic Radomia. Przeglądaj interaktywne drzewo genealogiczne, poznaj losy pokoleń i miejsca ich życia.",
    "home.cta.tree": "Zobacz Interaktywne Drzewo",
    "home.cta.history": "Poznaj Historię",
    "home.about.title": "Początki Rodów",
    "home.about.p1":
      "Historia rodzin Gierczak i Ofiara sięga głęboko w przeszłość okolic radomskich. Te dwa rody, związane z Jaszowicami, Ludwikowem i Gulinkiem, tworzą fascynującą opowieść o życiu na ziemiach polskich na przestrzeni wieków.",
    "home.about.p2":
      "Dzięki zachowanym metrykom, aktom kościelnym i przekazom rodzinnym, możemy prześledzić losy pokoleń, poznać ich imiona, miejsca zamieszkania i najważniejsze wydarzenia z ich życia.",
    "home.branches.title": "Gałęzie Rodzinne",
    "home.branches.subtitle": "Poznaj historię i pochodzenie każdego z rodów",
    "home.branches.gierczak.cta": "Poznaj Wszystkich Gierczaków",
    "home.branches.ofiara.cta": "Poznaj Wszystkich Ofiarów",
    "home.branches.gierczak.desc":
      "Ród Gierczaków, wywodzący się z Jaszowic, to historia chłopskiej rodziny, której korzenie sięgają Tomasza Gierczaka. Kolejne pokolenia, poprzez małżeństwa i dziedziczenie ziemi, rozprzestrzeniły się, osiedlając się m.in. w Gulinku.",
    "home.branches.ofiara.desc":
      "Historia rodu Ofiarów nierozerwalnie związana jest z Ludwikowem. Jego protoplastą jest Andrzej Ofiara, którego potomkowie przez dekady tworzyli lokalną społeczność, a ich losy połączyły się z rodem Gierczaków.",
    "home.explore.title": "Rozpocznij Eksplorację",
    "home.explore.subtitle":
      "Wybierz jeden ze sposobów poznawania historii rodzin",
    "home.explore.tree.title": "Drzewo Genealogiczne",
    "home.explore.tree.desc":
      "Interaktywne drzewo z wszystkimi członkami rodzin",
    "home.explore.index.title": "Indeks Osób",
    "home.explore.index.desc": "Alfabetyczna lista wszystkich osób w bazie",
    "home.explore.gallery.title": "Galeria",
    "home.explore.gallery.desc":
      "Zdjęcia, dokumenty i miejsca związane z rodzinami",

    "tree.title": "Interaktywne Drzewo Genealogiczne",
    "tree.subtitle":
      "Eksploruj powiązania rodzinne. Kliknij na osobę, aby zobaczyć szczegóły",
    "tree.filter.all": "Wszystkie Rodziny",
    "tree.legend.descendants": "Potomkowie",
    "tree.legend.marriages": "Małżeństwa",
    "tree.viewFilters": "Filtry widoku",

    "index.title": "Indeks Osób",
    "index.subtitle":
      "Alfabetyczny spis wszystkich osób w bazie genealogicznej",
    "index.searchPlaceholder": "Szukaj osoby...",
    "index.clear": "Wyczyść",
    "index.resultsFound": "Znaleziono {count} osób",
    "index.resultsForLetter": ' na literę "{letter}"',
    "index.resultsForSearch": ' pasujących do "{term}"',
    "index.noResults.title": "Nie znaleziono osób",
    "index.noResults.desc":
      "Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry.",
    "index.noResults.cta": "Wyczyść filtry",
    "index.showMore": "Pokaż więcej osób",

    "gallery.title": "Galeria Rodzinna",
    "gallery.subtitle":
      "Portrety, dokumenty i miejsca związane z historią rodzin.",
    "gallery.filter.all": "Wszystkie",
    "gallery.filter.portraits": "Portrety",
    "gallery.filter.documents": "Dokumenty",
    "gallery.filter.places": "Miejsca",
    "gallery.results": "{count} elementów",
    "gallery.zoom": "Powiększ",
    "gallery.noResults.title": "Brak zdjęć w tej kategorii",
    "gallery.noResults.desc": "Wybierz inną kategorię, aby zobaczyć zdjęcia.",
    "gallery.noResults.cta": "Pokaż wszystkie",

    "gallery.item.portrait-1.title": "Portret rodzinny",
    "gallery.item.portrait-1.desc": "Rodzina (Sobień?), około 1940 roku",
    "gallery.item.portrait-2.title": "Zdjęcie portretowe",
    "gallery.item.portrait-2.desc": "Marianna Ofiara",
    "gallery.item.portrait-3.title": "Portret przodka",
    "gallery.item.portrait-3.desc":
      "Jeden z najstarszych członków rodu z czasów pańszczyźnianych",
    "gallery.item.portrait-4.title": "Portret prababci i pradziadka (?)",
    "gallery.item.portrait-4.desc": "Członkowie rodziny Sobień (Drużdżel)",
    "gallery.item.doc-1.title":
      "Akt ślubu Jana i Agnieszki Gierczak 14.11.1917",
    "gallery.item.doc-1.desc": "Księga parafialna w Zakrzowie (Zakrzewie)",
    "gallery.item.doc-2.title": "Gulinek, 1960",
    "gallery.item.doc-2.desc":
      "I Komunia Św. Zofii Bilskiej, moja mama jako matka chrzestna",
    "gallery.item.doc-3.title": "Dokument prawny",
    "gallery.item.doc-3.desc":
      "Zapis w Księdze Parafialnej w Zakrzowie (Zakrzewie)",
    "gallery.item.doc-4.title": "Drzewo genealogiczne",
    "gallery.item.doc-4.desc": "Ręcznie sporządzone drzewo rodzinne",
    "gallery.item.place-1.title": "I Komunia Św. wujka Romana Ofiary",
    "gallery.item.place-1.desc": "Roman Ofiara z babcią Helena",
    "gallery.item.place-2.title": "Wieś Jaszowice",
    "gallery.item.place-2.desc": "Główne miejsce zamieszkania rodu Gierczaków",
    "gallery.item.place-3.title": "Stary cmentarz",
    "gallery.item.place-3.desc":
      "Miejsce spoczynku przodków, prababci Ewy i pradziadka Karola",

    "sources.title": "Źródła i Bibliografia",
    "sources.subtitle":
      "Dokumentacja źródeł wykorzystanych w badaniach genealogicznych.",
    "sources.about.title": "O projekcie",
    "sources.about.p1":
      "Ten projekt genealogiczny powstał w wyniku wieloletnich badań nad historią rodów Gierczak i Ofiara z okolic Radomia. Zebrane informacje pochodzą z różnorodnych źródeł archiwalnych, kościelnych oraz przekazów rodzinnych.",
    "sources.about.p2":
      "Wszystkie dane zostały starannie zweryfikowane i skonfrontowane z dostępnymi dokumentami. Projekt jest kontynuowany - nowe informacje są regularnie dodawane do bazy danych.",
    "sources.archive.title": "Źródła archiwalne",
    "sources.contact.title": "Masz dodatkowe informacje?",
    "sources.contact.desc":
      "Jeśli posiadasz dokumenty, zdjęcia lub wspomnienia związane z rodzinami Gierczak i Ofiara, skontaktuj się z nami. Każda informacja jest cenna dla uzupełnienia historii rodzin.",
    "sources.section.stateArchives.title": "Archiwa państwowe",
    "sources.section.stateArchives.item1":
      "Archiwum Państwowe w Radomiu - księgi metrykalne parafii Cerekiew",
    "sources.section.stateArchives.item2":
      "Archiwum Diecezjalne w Sandomierzu - akta parafialne XVIII-XX w.",
    "sources.section.stateArchives.item3":
      "Urząd Stanu Cywilnego w Radomiu - akty stanu cywilnego",
    "sources.section.churchSources.title": "Źródła kościelne",
    "sources.section.churchSources.item1":
      "Księgi chrztów parafii pw. św. Stanisława w Cerekwi (1780-1950)",
    "sources.section.churchSources.item2":
      "Księgi ślubów parafii Cerekiew (1790-1940)",
    "sources.section.churchSources.item3":
      "Księgi zmarłych cmentarza parafialnego w Cerekwi i Zakrzowie (Zakrzewie)",
    "sources.section.churchSources.item4":
      "Kronika parafialna - zapisy o mieszkańcach Jaszowic i Ludwikowa",
    "sources.section.familyAccounts.title": "Przekazy rodzinne",
    "sources.section.familyAccounts.item1":
      "Dokumenty osobiste zachowane w rodzinie",
    "sources.section.familyAccounts.item2":
      "Relacje ustne przekazywane przez pokolenia",
    "sources.section.familyAccounts.item3":
      "Fotografie rodzinne z XIX i XX wieku",
    "sources.section.familyAccounts.item4":
      "Korespondencja między członkami rodzin",
    "sources.section.literature.title": "Literatura i opracowania",
    "sources.section.literature.item1":
      "„Osadnictwo i gospodarka powiatu radomskiego w XVI–XVIII wieku”, Z. Guldon, W. Kowalski, J. Muszyńska, S. Zieliński, 1995",
    "sources.section.literature.item2":
      "„Rody szlacheckie ziemi radomskiej”, D. Kupisz, 2009",
    "sources.section.literature.item3":
      "„Wieś Radomska”, cykl periodyczny, tomy z różnych lat, Muzeum Wsi Radomskiej",

    "familyBranch.history.title": "Historia rodu",
    "familyBranch.history.places": "Główne miejscowości",
    "familyBranch.history.membersInDb": "osób w bazie",
    "familyBranch.members.title": "Członkowie rodziny",
    "familyBranch.members.viewInTree": "Zobacz w drzewie",
    "familyBranch.members.noData.title": "Brak danych",
    "familyBranch.members.noData.desc":
      "Nie znaleziono osób z tej gałęzi rodziny w bazie danych.",
    "familyBranch.places.title": "Kluczowe miejsca",
    "familyBranch.notFound.title": "Nieznana rodzina",
    "familyBranch.notFound.desc": "Wybierz prawidłową gałąź rodzinną.",
    "familyBranch.etymology.title": "Pochodzenie nazwiska",

    "familyBranch.etymology.gierczak.h1": "Budowa morfologiczna",
    "familyBranch.etymology.gierczak.p1":
      "Nazwisko Gierczak ma typową dla języka polskiego, dwuczłonową budowę: Podstawa (rdzeń): Gier- i Formant (sufiks): -czak.",
    "familyBranch.etymology.gierczak.p2":
      'Sufiks -czak jest jednym z najpopularniejszych w polszczyźnie formantów patronimicznych (odojcowskich). Jego pierwotną funkcją było tworzenie nazw oznaczających potomka, najczęściej syna osoby, której imię lub przezwisko stanowiło podstawę. Nazwisko oznaczało więc "syn Giera" lub "potomek Giera".',
    "familyBranch.etymology.gierczak.h2": "Etymologia podstawy 'Gier-'",
    "familyBranch.etymology.gierczak.p3":
      "To kluczowy i najbardziej złożony element analizy. Istnieje kilka hipotez dotyczących pochodzenia tego rdzenia.",
    "familyBranch.etymology.gierczak.h3":
      "Hipoteza 1 (Najbardziej prawdopodobna): Pochodzenie od imienia germańskiego",
    "familyBranch.etymology.gierczak.p4":
      'Podstawa Gier- pochodzi od starogermańskiego imienia, którego rdzeń gēr oznaczał "włócznia" lub "oszczep". Imiona germańskie były popularne w średniowiecznej Polsce. Rdzeń Ger- był częścią imion takich jak Gerhard (spolszczone jako Gierard lub Gierałt).',
    "familyBranch.etymology.gierczak.p5":
      "Od pełnych imion, jak Gierard, w mowie potocznej tworzono skróty. Najprostszą formą było Gier. Zatem nazwisko Gierczak powstało w następujący sposób: Gerhard (imię) -> Gierard (spolszczenie) -> Gier (przezwisko/skrót) -> Gierczak (syn Giera).",
    "familyBranch.etymology.gierczak.h4":
      "Hipoteza 2 (Mniej prawdopodobna): Pochodzenie od imienia słowiańskiego",
    "familyBranch.etymology.gierczak.p6":
      "Niektórzy badacze dopuszczają, że Gier- jest formą skróconą od słowiańskiego imienia Grzegorz (Grzegorz -> Gierosz -> Gier). Jest to jednak uznawane za hipotezę drugorzędną.",
    "familyBranch.etymology.gierczak.h5":
      "Hipoteza 3 (Najmniej prawdopodobna): Pochodzenie odapelatywne",
    "familyBranch.etymology.gierczak.p7":
      'Teoretycznie, podstawa mogłaby pochodzić od słowa "gier" lub "giera", które w dawnej polszczyźnie oznaczało grę lub zabawę. W takim scenariuszu "Gierczak" byłby przezwiskiem syna zapalonego gracza.',
    "familyBranch.etymology.gierczak.h6": "Kontekst historyczny",
    "familyBranch.etymology.gierczak.p8":
      "Nazwiska z formantem -czak zaczęły się masowo kształtować w okresie od późnego średniowiecza do XVII wieku. Czas ten zbiega się z okresem silnych wpływów niemieckich, co dodatkowo wzmacnia hipotezę o germańskim pochodzeniu imienia bazowego.",
    "familyBranch.etymology.gierczak.h7": "Podsumowanie",
    "familyBranch.etymology.gierczak.p9":
      'Nazwisko Gierczak jest z największym prawdopodobieństwem nazwiskiem patronimicznym, utworzonym od skróconej formy spolszczonego imienia germańskiego, najpewniej Gierard. Pierwotne znaczenie to "syn Gierarda".',
    "familyBranch.etymology.gierczak.l1": "Podstawa (rdzeń): Gier-",
    "familyBranch.etymology.gierczak.l2": "Formant (sufiks): -czak",

    "familyBranch.etymology.ofiara.h1": "Budowa morfologiczna",
    "familyBranch.etymology.ofiara.p1":
      "Nazwisko Ofiara ma najprostszą możliwą strukturę – jest to tzw. nazwisko odapelatywne niemodyfikowane. Jego forma jest identyczna z rzeczownikiem pospolitym, od którego pochodzi, bez dodawania jakichkolwiek formantów. Taka budowa jest typowa dla jednej z najstarszych warstw nazwisk polskich.",
    "familyBranch.etymology.ofiara.h2": "Etymologia i semantyka",
    "familyBranch.etymology.ofiara.p2":
      "Słowo \"ofiara\" pochodzi z łacińskiego 'offerre' (ofiarować). W polszczyźnie było związane z kontekstem religijnym (dar dla bóstwa), ale z czasem nabrało znaczeń przenośnych, kluczowych dla powstania nazwiska.",
    "familyBranch.etymology.ofiara.h3": "Znaczenie przenośne (źródło nazwiska)",
    "familyBranch.etymology.ofiara.p3":
      'Przezwisko "Ofiara" najprawdopodobniej pochodzi od jednego z potocznych znaczeń słowa: osoba pechowa, niezaradna ("ofiara losu"), osoba cierpiąca lub pokrzywdzona, osoba bardzo pobożna (czasem ironicznie) lub ktoś powolny i niezdarny.',
    "familyBranch.etymology.ofiara.h4":
      "Hipotezy dotyczące motywacji (najbardziej prawdopodobna)",
    "familyBranch.etymology.ofiara.p4":
      'Pierwszy "Ofiara" był najpewniej postrzegany przez społeczność jako wyjątkowo nieszczęśliwy, pechowy lub niezaradny. Było to przezwisko opisowe, być może z nutą współczucia lub drwiny. Mechanizm tworzenia przezwisk od cech charakteru lub losu był niezwykle powszechny.',
    "familyBranch.etymology.ofiara.h5": "Inne motywacje",
    "familyBranch.etymology.ofiara.p5":
      "Mniej prawdopodobne, ale możliwe, jest pochodzenie przezwiska od konkretnego, tragicznego wydarzenia (np. pożaru, napadu), którego dana osoba była ofiarą, lub od jej wyjątkowej, być może na pokaz, religijności.",
    "familyBranch.etymology.ofiara.h6": "Kontekst historyczny",
    "familyBranch.etymology.ofiara.p6":
      "Nazwiska odapelatywne, takie jak Ofiara, należą do najstarszej warstwy nazwiskowej w Polsce. Mogły funkcjonować jako przezwiska już w późnym średniowieczu (XIV-XV w.), a jako dziedziczne nazwiska utrwaliły się ostatecznie w okresie od XVI do XVIII wieku.",
    "familyBranch.etymology.ofiara.h7": "Podsumowanie",
    "familyBranch.etymology.ofiara.p7":
      "Nazwisko Ofiara pochodzi bezpośrednio od rzeczownika pospolitego. Najbardziej prawdopodobna motywacja nadania takiego przezwiska była związana z cechą charakteru lub losem pierwszego nosiciela – osoby postrzeganej jako pechowa, niezaradna lub pokrzywdzona przez los.",

    "person.born": "ur.",
    "person.bornIn": "Ur.",
    "person.died": "zm.",
    "person.maidenName": "z d.",
    "person.occupation": "Zawód",
    "person.biography": "Biografia",
    "person.family": "Rodzina",
    "person.parents": "Rodzice",
    "person.spouse": "Małżonkowie",
    "person.children": "Dzieci",
    "person.marriedOn": "ślub",
    "person.anecdotes": "Wspomnienia i anegdoty",
    "person.hasAnecdotes": "Kliknij, aby przeczytać wspomnienia",

    "footer.title": "Korzenie rodu",
    "footer.description":
      "Cyfrowe archiwum i interaktywne drzewo genealogiczne rodów Gierczak i Ofiara z okolic Radomia.",
    "footer.nav.title": "Nawigacja",
    "footer.nav.home": "Strona Główna",
    "footer.nav.tree": "Drzewo Interaktywne",
    "footer.nav.gierczak": "Ród Gierczaków",
    "footer.nav.ofiara": "Ród Ofiarów",
    "footer.nav.gallery": "Galeria",
    "footer.nav.legal": "Informacje",
    "footer.nav.terms": "Regulamin",
    "footer.nav.privacy": "Polityka Prywatności",
    "footer.contact.title": "Kontakt",
    "footer.contact.email": "[puaro@vp.pl]",
    "footer.contact.location": "Okolice Radomia",
    "footer.contact.projectInfo":
      "Projekt genealogiczny\nzachowujący pamięć o przodkach",
    "footer.copyright": "{year} Radom, Korzenie rodu Gierczak i Ofiara.",

    "terms.title": "Regulamin Strony",
    "terms.lastUpdated": "Ostatnia aktualizacja: 24 maja 2024",
    "terms.section1.title": "1. Postanowienia ogólne",
    "terms.section1.p1":
      "Niniejsza strona internetowa jest prywatnym, niekomercyjnym projektem genealogicznym, którego celem jest dokumentowanie i udostępnianie historii rodzin Gierczak i Ofiara.",
    "terms.section1.p2":
      "Korzystanie ze strony jest dobrowolne i bezpłatne. Wchodząc na stronę, użytkownik akceptuje postanowienia niniejszego regulaminu.",
    "terms.section2.title": "2. Zakres i charakter informacji",
    "terms.section2.p1":
      "Informacje zawarte na stronie, w tym dane osobowe, daty, miejsca i relacje rodzinne, pochodzą z badań archiwalnych, dokumentów historycznych oraz przekazów rodzinnych. Autor dołożył wszelkich starań, aby były one jak najdokładniejsze, jednak nie może zagwarantować ich stuprocentowej poprawności.",
    "terms.section2.p2":
      "Strona ma charakter wyłącznie informacyjny i edukacyjny. Prezentowane dane nie stanowią oficjalnego dokumentu i nie mogą być podstawą do roszczeń prawnych.",
    "terms.section3.title": "3. Prawa autorskie",
    "terms.section3.p1":
      "Treści tekstowe, opracowania, anegdoty oraz struktura bazy danych na tej stronie są własnością intelektualną autora projektu. Kopiowanie i rozpowszechnianie tych materiałów w celach komercyjnych bez zgody autora jest zabronione.",
    "terms.section3.p2":
      "Dozwolone jest cytowanie fragmentów oraz wykorzystywanie informacji w prywatnych, niekomercyjnych badaniach genealogicznych z podaniem źródła.",
    "terms.section4.title": "4. Odpowiedzialność",
    "terms.section4.p1":
      "Autor nie ponosi odpowiedzialności za ewentualne błędy lub nieścisłości w prezentowanych danych genealogicznych.",
    "terms.section4.p2":
      "Użytkownik korzysta ze strony na własną odpowiedzialność. Autor nie odpowiada za jakiekolwiek szkody wynikłe z wykorzystania informacji zawartych na stronie.",
    "terms.section5.title": "5. Postanowienia końcowe",
    "terms.section5.p1":
      "Autor zastrzega sobie prawo do wprowadzania zmian w regulaminie. Wszelkie zmiany będą publikowane na tej stronie.",
    "terms.section5.p2":
      "W sprawach nieuregulowanych niniejszym regulaminem, a także w celu zgłoszenia uwag lub prośby o korektę danych, prosimy o kontakt mailowy pod adresem podanym w stopce strony.",

    "privacy.title": "Polityka Prywatności",
    "privacy.lastUpdated": "Ostatnia aktualizacja: 24 maja 2024",
    "privacy.section1.title": "1. Administrator danych",
    "privacy.section1.p1":
      "Administratorem danych osobowych w ramach tego prywatnego projektu jest autor strony. Kontakt możliwy jest poprzez adres e-mail podany w stopce.",
    "privacy.section2.title": "2. Jakie dane są gromadzone?",
    "privacy.section2.p1":
      "Strona gromadzi i prezentuje dane genealogiczne, które mogą zawierać imiona, nazwiska, daty i miejsca urodzenia, ślubu i zgonu. Dane te dotyczą zarówno osób zmarłych, jak i żyjących, w zakresie niezbędnym do przedstawienia powiązań rodzinnych.",
    "privacy.section2.p2":
      "Strona nie zbiera aktywnie danych o odwiedzających. Jedynymi danymi, które mogą być zapisywane w przeglądarce użytkownika (za pomocą `localStorage`), są preferencje dotyczące motywu (jasny/ciemny) i wybranego języka. Są to dane anonimowe i służą wyłącznie poprawie komfortu użytkowania.",
    "privacy.section3.title": "3. Dane osób żyjących",
    "privacy.section3.p1":
      "Autor zdaje sobie sprawę z wrażliwości danych dotyczących osób żyjących. Dane te są publikowane wyłącznie w kontekście genealogicznym, w celu ukazania pełnych relacji rodzinnych. Data urodzenia osób żyjących jest celowo niepełna lub pomijana.",
    "privacy.section3.p2":
      "Każda osoba żyjąca, której dane znajdują się na stronie, ma prawo zażądać ich usunięcia, anonimizacji lub korekty. W tym celu prosimy o kontakt mailowy.",
    "privacy.section4.title": "4. Pliki cookies",
    "privacy.section4.p1":
      "Strona nie wykorzystuje tradycyjnych plików cookies do śledzenia użytkowników. Używamy mechanizmu `localStorage` przeglądarki do przechowywania ustawień interfejsu (motyw, język), co nie wiąże się ze śledzeniem aktywności.",
    "privacy.section5.title": "5. Udostępnianie danych",
    "privacy.section5.p1":
      "Dane zgromadzone na stronie nie są i nie będą udostępniane podmiotom trzecim w celach komercyjnych. Celem projektu jest wyłącznie zachowanie i dzielenie się historią rodziny.",

    paths: {
      home: "/",
      tree: "/drzewo",
      index: "/indeks-osob",
      gallery: "/galeria",
      sources: "/zrodla",
      familyBase: "/rod",
      terms: "/regulamin",
      privacy: "/polityka-prywatnosci",
    },
  },
  en: {
    "nav.title": "Roots of the Gierczak & Ofiara Family",
    "nav.title.mobile": "Genealogy",
    "nav.description": "Navigate the family history",
    "nav.home": "Home",
    "nav.tree": "Interactive Tree",
    "nav.families": "Families",
    "nav.index": "Person Index",
    "nav.gallery": "Gallery",
    "nav.sources": "Sources",
    "nav.toggleTheme": "Toggle theme",
    "nav.toggleLanguage": "Change language",
    "nav.openMenu": "Open navigation menu",
    "nav.scrollToTop": "Scroll to top",

    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",

    "family.gierczak": "Gierczak Family",
    "family.ofiara": "Ofiara Family",

    "home.title": "History of Peasant Families",
    "home.subtitle": "Gierczak & Ofiara",
    "home.description":
      "Explore the history of the Gierczak and Ofiara families from near Radom, Poland. Browse the interactive family tree and discover the lives of generations.",
    "home.cta.tree": "View Interactive Tree",
    "home.cta.history": "Learn the History",
    "home.about.title": "The Beginnings of the Families",
    "home.about.p1":
      "The history of the Gierczak and Ofiara families dates far back into the past of the Radom area. These two families, connected with Jaszowice, Ludwików and Gulinek, create a fascinating story of life on Polish lands over the centuries.",
    "home.about.p2":
      "Thanks to preserved vital records, church documents, and family accounts, we can trace the fates of generations, learn their names, places of residence, and the most important events of their lives.",
    "home.branches.title": "Family Branches",
    "home.branches.subtitle": "Learn the history and origin of each family",
    "home.branches.gierczak.cta": "Meet All the Gierczaks",
    "home.branches.ofiara.cta": "Meet All the Ofiaras",
    "home.branches.gierczak.desc":
      "The Gierczak family, originating from Jaszowice, is a story of a peasant family whose roots trace back to Tomasz Gierczak. Subsequent generations, through marriage and land inheritance, spread out, settling in places like Gulinek.",
    "home.branches.ofiara.desc":
      "The history of the Ofiara family is inseparably linked with Ludwików. Its progenitor is Andrzej Ofiara, whose descendants formed the local community for decades, and their fates merged with the Gierczak family.",
    "home.explore.title": "Start Exploring",
    "home.explore.subtitle":
      "Choose one of the ways to learn the family history",
    "home.explore.tree.title": "Genealogical Tree",
    "home.explore.tree.desc": "Interactive tree with all family members",
    "home.explore.index.title": "Person Index",
    "home.explore.index.desc":
      "Alphabetical list of all people in the database",
    "home.explore.gallery.title": "Gallery",
    "home.explore.gallery.desc":
      "Photos, documents, and places related to the families",

    "tree.title": "Interactive Genealogical Tree",
    "tree.subtitle":
      "Explore family connections. Click on a person to see details",
    "tree.filter.all": "All Families",
    "tree.legend.descendants": "Descendants",
    "tree.legend.marriages": "Marriages",
    "tree.viewFilters": "View Filters",

    "index.title": "Person Index",
    "index.subtitle":
      "Alphabetical list of all people in the genealogical database",
    "index.searchPlaceholder": "Search for a person...",
    "index.clear": "Clear",
    "index.resultsFound": "Found {count} people",
    "index.resultsForLetter": ' for letter "{letter}"',
    "index.resultsForSearch": ' matching "{term}"',
    "index.noResults.title": "No People Found",
    "index.noResults.desc":
      "Try changing the search criteria or clearing the filters.",
    "index.noResults.cta": "Clear filters",
    "index.showMore": "Show more people",

    "gallery.title": "Family Gallery",
    "gallery.subtitle":
      "Portraits, documents, and places related to the family history.",
    "gallery.filter.all": "All",
    "gallery.filter.portraits": "Portraits",
    "gallery.filter.documents": "Documents",
    "gallery.filter.places": "Places",
    "gallery.results": "{count} items",
    "gallery.zoom": "Zoom",
    "gallery.noResults.title": "No images in this category",
    "gallery.noResults.desc": "Please select another category to view images.",
    "gallery.noResults.cta": "Show all",

    "gallery.item.portrait-1.title": "Family Portrait",
    "gallery.item.portrait-1.desc": "Sobień (?) family, around 1940",
    "gallery.item.portrait-2.title": "Portrait Photo",
    "gallery.item.portrait-2.desc": "Marianna Ofiara",
    "gallery.item.portrait-3.title": "Ancestor's Portrait",
    "gallery.item.portrait-3.desc":
      "One of the oldest family members from the times of serfdom",
    "gallery.item.portrait-4.title":
      "Great-grandmother and great-grandfather's portrait (?)",
    "gallery.item.portrait-4.desc": "Members of the Sobień (Drużdżel) family",
    "gallery.item.doc-1.title":
      "Marriage certificate of Jan and Agnieszka Gierczak 11/14/1917",
    "gallery.item.doc-1.desc": "Parish register in Zakrzów (Zakrzew)",
    "gallery.item.doc-2.title": "Gulinek, 1960",
    "gallery.item.doc-2.desc":
      "First Holy Communion of Zofia Bilska, my mother as godmother",
    "gallery.item.doc-3.title": "Legal Document",
    "gallery.item.doc-3.desc":
      "Entry in the Parish Register of Zakrzów (Zakrzew)",
    "gallery.item.doc-4.title": "Genealogical Tree",
    "gallery.item.doc-4.desc": "Hand-drawn family tree",
    "gallery.item.place-1.title":
      "First Holy Communion of my uncle Roman Ofiara",
    "gallery.item.place-1.desc": "Roman Ofiara with grandmother Helena",
    "gallery.item.place-2.title": "Jaszowice Village",
    "gallery.item.place-2.desc":
      "The main place of residence of the Gierczak family",
    "gallery.item.place-3.title": "Old Cemetery",
    "gallery.item.place-3.desc":
      "Resting place of ancestors, great-grandmother Ewa and great-grandfather Karol",

    "sources.title": "Sources and Bibliography",
    "sources.subtitle":
      "Documentation of sources used in genealogical research.",
    "sources.about.title": "About the project",
    "sources.about.p1":
      "This genealogical project is the result of many years of research into the history of the Gierczak and Ofiara families from the Radom area. The information gathered comes from a variety of archival, church, and family sources.",
    "sources.about.p2":
      "All data has been carefully verified and cross-referenced with available documents. The project is ongoing - new information is regularly added to the database.",
    "sources.archive.title": "Archival Sources",
    "sources.contact.title": "Do you have additional information?",
    "sources.contact.desc":
      "If you have documents, photos, or memories related to the Gierczak and Ofiara families, please contact us. Every piece of information is valuable for completing the family history.",
    "sources.section.stateArchives.title": "State Archives",
    "sources.section.stateArchives.item1":
      "State Archives in Radom - parish registers of the Cerekiew parish",
    "sources.section.stateArchives.item2":
      "Diocesan Archives in Sandomierz - parish records from the 18th-20th centuries",
    "sources.section.stateArchives.item3":
      "Civil Registry Office in Radom - civil status records",
    "sources.section.churchSources.title": "Church Sources",
    "sources.section.churchSources.item1":
      "Baptismal records of the St. Stanislaus parish in Cerekiew (1780-1950)",
    "sources.section.churchSources.item2":
      "Marriage records of the Cerekiew parish (1790-1940)",
    "sources.section.churchSources.item3":
      "Death records from the parish cemetery in Cerekiew and Zakrzów (Zakrzew)",
    "sources.section.churchSources.item4":
      "Parish chronicle - records about the inhabitants of Jaszowice and Ludwików",
    "sources.section.familyAccounts.title": "Family Accounts",
    "sources.section.familyAccounts.item1":
      "Personal documents preserved in the family",
    "sources.section.familyAccounts.item2":
      "Oral accounts passed down through generations",
    "sources.section.familyAccounts.item3":
      "Family photographs from the 19th and 20th centuries",
    "sources.section.familyAccounts.item4":
      "Correspondence between family members",
    "sources.section.literature.title": "Literature and Studies",
    "sources.section.literature.item1":
      "“Settlement and Economy of the Radom County in the 16th–18th Centuries”, Z. Guldon, W. Kowalski, J. Muszyńska, S. Zieliński, 1995",
    "sources.section.literature.item2":
      "“Noble Families of the Radom Land”, D. Kupisz, 2009",
    "sources.section.literature.item3":
      "“Wieś Radomska” (periodical series), volumes from various years, Museum of the Radom Village",

    "familyBranch.history.title": "History of the Family",
    "familyBranch.history.places": "Main Locations",
    "familyBranch.history.membersInDb": "people in database",
    "familyBranch.members.title": "Family Members",
    "familyBranch.members.viewInTree": "View in Tree",
    "familyBranch.members.noData.title": "No Data",
    "familyBranch.members.noData.desc":
      "No people from this family branch were found in the database.",
    "familyBranch.places.title": "Key Places",
    "familyBranch.notFound.title": "Unknown family",
    "familyBranch.notFound.desc": "Please select a valid family branch.",
    "familyBranch.etymology.title": "Surname Origin",

    "familyBranch.etymology.gierczak.h1": "Morphological Structure",
    "familyBranch.etymology.gierczak.p1":
      "The surname Gierczak has a typical two-part structure for the Polish language: a base (root): Gier- and a formant (suffix): -czak.",
    "familyBranch.etymology.gierczak.p2":
      'The -czak suffix is one of the most popular patronymic (from the father) formants in Polish. Its primary function was to create names meaning a descendant, most often the son of the person whose name or nickname formed the base. The surname thus meant "son of Gier" or "descendant of Gier".',
    "familyBranch.etymology.gierczak.h2": "Etymology of the 'Gier-' Root",
    "familyBranch.etymology.gierczak.p3":
      "This is the key and most complex part of the analysis. There are several hypotheses about the origin of this root.",
    "familyBranch.etymology.gierczak.h3":
      "Hypothesis 1 (Most Probable): Origin from a Germanic name",
    "familyBranch.etymology.gierczak.p4":
      'The root Gier- comes from an Old Germanic name whose root gēr meant "spear". Germanic names were popular in medieval Poland. The root Ger- was part of names like Gerhard (Polonized as Gierard or Gierałt).',
    "familyBranch.etymology.gierczak.p5":
      "From full names like Gierard, diminutives were created in common speech. The simplest form was Gier. Thus, the surname Gierczak was formed as follows: Gerhard (name) -> Gierard (Polonization) -> Gier (nickname/short form) -> Gierczak (son of Gier).",
    "familyBranch.etymology.gierczak.h4":
      "Hypothesis 2 (Less Probable): Origin from a Slavic name",
    "familyBranch.etymology.gierczak.p6":
      "Some researchers suggest that Gier- is a short form of the Slavic name Grzegorz (Gregory) (Grzegorz -> Gierosz -> Gier). However, this is considered a secondary hypothesis.",
    "familyBranch.etymology.gierczak.h5":
      "Hypothesis 3 (Least Probable): Appellative origin",
    "familyBranch.etymology.gierczak.p7":
      'Theoretically, the base could come from the word "gier" or "giera", which in old Polish meant a game. In this scenario, "Gierczak" would be a nickname for the son of an avid gamer.',
    "familyBranch.etymology.gierczak.h6": "Historical Context",
    "familyBranch.etymology.gierczak.p8":
      "Surnames with the -czak formant began to form en masse from the late Middle Ages to the 17th century. This period coincides with strong German influences, which further strengthens the hypothesis of the Germanic origin of the base name.",
    "familyBranch.etymology.gierczak.h7": "Summary",
    "familyBranch.etymology.gierczak.p9":
      'The surname Gierczak is most likely a patronymic surname, formed from a shortened, Polonized version of a Germanic name, most likely Gierard. The original meaning is "son of Gierard".',
    "familyBranch.etymology.gierczak.l1": "Base (root): Gier-",
    "familyBranch.etymology.gierczak.l2": "Formant (suffix): -czak",

    "familyBranch.etymology.ofiara.h1": "Morphological Structure",
    "familyBranch.etymology.ofiara.p1":
      "The surname Ofiara has the simplest possible structure - it is a so-called unmodified appellative surname. Its form is identical to the common noun from which it originates, without any added formants. This structure is typical of one of the oldest layers of Polish surnames.",
    "familyBranch.etymology.ofiara.h2": "Etymology and Semantics",
    "familyBranch.etymology.ofiara.p2":
      "The word \"ofiara\" (victim/offering) comes from the Latin 'offerre' (to offer). In Polish, it was linked to a religious context (an offering to a deity), but over time it acquired metaphorical meanings crucial for the surname's origin.",
    "familyBranch.etymology.ofiara.h3":
      "Metaphorical Meaning (Source of the Surname)",
    "familyBranch.etymology.ofiara.p3":
      'The nickname "Ofiara" most likely derives from one of the colloquial meanings of the word: an unlucky, helpless person ("victim of fate"), a suffering or wronged person, a very pious person (sometimes ironically), or someone slow and clumsy.',
    "familyBranch.etymology.ofiara.h4":
      "Hypotheses on Motivation (Most Probable)",
    "familyBranch.etymology.ofiara.p4":
      'The first "Ofiara" was most likely perceived by the community as exceptionally unlucky, unfortunate, or helpless. It was a descriptive nickname, perhaps with a hint of pity or mockery. The mechanism of creating nicknames from character traits or fate was extremely common.',
    "familyBranch.etymology.ofiara.h5": "Other Motivations",
    "familyBranch.etymology.ofiara.p5":
      "Less probable, but possible, is the origin of the nickname from a specific tragic event (e.g., a fire, an attack) of which the person was a victim, or from their exceptional, perhaps feigned, piety.",
    "familyBranch.etymology.ofiara.h6": "Historical Context",
    "familyBranch.etymology.ofiara.p6":
      "Appellative surnames like Ofiara belong to the oldest layer of surnames in Poland. They could have functioned as nicknames as early as the late Middle Ages (14th-15th c.), and became hereditary surnames between the 16th and 18th centuries.",
    "familyBranch.etymology.ofiara.h7": "Summary",
    "familyBranch.etymology.ofiara.p7":
      "The surname Ofiara comes directly from the common noun. The most likely motivation for giving such a nickname was related to the character or fate of the first bearer - a person perceived as unlucky, helpless, or wronged by fate.",

    "person.born": "b.",
    "person.bornIn": "Born",
    "person.died": "d.",
    "person.maidenName": "née",
    "person.occupation": "Occupation",
    "person.biography": "Biography",
    "person.family": "Family",
    "person.parents": "Parents",
    "person.spouse": "Spouses",
    "person.children": "Children",
    "person.marriedOn": "m.",
    "person.anecdotes": "Memories and Anecdotes",
    "person.hasAnecdotes": "Click to read anecdotes",

    "footer.title": "Family Roots",
    "footer.description":
      "A digital archive and interactive genealogical tree of the Gierczak and Ofiara families from the Radom area.",
    "footer.nav.title": "Navigation",
    "footer.nav.home": "Home",
    "footer.nav.tree": "Interactive Tree",
    "footer.nav.gierczak": "Gierczak Family",
    "footer.nav.ofiara": "Ofiara Family",
    "footer.nav.gallery": "Gallery",
    "footer.nav.legal": "Information",
    "footer.nav.terms": "Terms of Service",
    "footer.nav.privacy": "Privacy Policy",
    "footer.contact.title": "Contact",
    "footer.contact.email": "[puaro@vp.pl]",
    "footer.contact.location": "Radom Area",
    "footer.contact.projectInfo":
      "A genealogical project\npreserving the memory of ancestors",
    "footer.copyright": "{year} Radom, Roots of the Gierczak & Ofiara Family.",

    "terms.title": "Terms of Service",
    "terms.lastUpdated": "Last updated: May 24, 2024",
    "terms.section1.title": "1. General Provisions",
    "terms.section1.p1":
      "This website is a private, non-commercial genealogical project aimed at documenting and sharing the history of the Gierczak and Ofiara families.",
    "terms.section1.p2":
      "Use of the site is voluntary and free of charge. By accessing the site, the user accepts the provisions of these terms.",
    "terms.section2.title": "2. Scope and Nature of Information",
    "terms.section2.p1":
      "The information on the site, including personal data, dates, places, and family relationships, comes from archival research, historical documents, and family accounts. The author has made every effort to ensure their accuracy but cannot guarantee they are 100% correct.",
    "terms.section2.p2":
      "The site is for informational and educational purposes only. The data presented does not constitute an official document and cannot be the basis for legal claims.",
    "terms.section3.title": "3. Copyright",
    "terms.section3.p1":
      "The text content, compilations, anecdotes, and database structure on this site are the intellectual property of the project's author. Copying and distributing these materials for commercial purposes without the author's consent is prohibited.",
    "terms.section3.p2":
      "Quoting excerpts and using information for private, non-commercial genealogical research is permitted, provided the source is cited.",
    "terms.section4.title": "4. Liability",
    "terms.section4.p1":
      "The author is not responsible for any errors or inaccuracies in the presented genealogical data.",
    "terms.section4.p2":
      "The user uses the site at their own risk. The author is not liable for any damages resulting from the use of information contained on the site.",
    "terms.section5.title": "5. Final Provisions",
    "terms.section5.p1":
      "The author reserves the right to make changes to these terms. Any changes will be published on this page.",
    "terms.section5.p2":
      "For matters not covered by these terms, or to submit comments or request data correction, please contact us via the email address provided in the footer.",

    "privacy.title": "Privacy Policy",
    "privacy.lastUpdated": "Last updated: May 24, 2024",
    "privacy.section1.title": "1. Data Administrator",
    "privacy.section1.p1":
      "The administrator of personal data within this private project is the author of the site. Contact is possible via the email address provided in the footer.",
    "privacy.section2.title": "2. What Data is Collected?",
    "privacy.section2.p1":
      "The site collects and presents genealogical data, which may include names, surnames, dates, and places of birth, marriage, and death. This data pertains to both deceased and living individuals, to the extent necessary to show family relationships.",
    "privacy.section2.p2":
      "The site does not actively collect data about its visitors. The only data that may be stored in the user's browser (using `localStorage`) are preferences for the theme (light/dark) and selected language. This data is anonymous and serves only to improve user experience.",
    "privacy.section3.title": "3. Data of Living Persons",
    "privacy.section3.p1":
      "The author is aware of the sensitivity of data concerning living persons. This data is published solely in a genealogical context to show full family relationships. The birth dates of living individuals are intentionally incomplete or omitted.",
    "privacy.section3.p2":
      "Any living person whose data appears on the site has the right to request its removal, anonymization, or correction. For this purpose, please contact us by email.",
    "privacy.section4.title": "4. Cookies",
    "privacy.section4.p1":
      "This site does not use traditional cookies to track users. We use the browser's `localStorage` mechanism to store interface settings (theme, language), which does not involve tracking activity.",
    "privacy.section5.title": "5. Data Sharing",
    "privacy.section5.p1":
      "The data collected on this site is not and will not be shared with third parties for commercial purposes. The sole purpose of the project is to preserve and share family history.",

    paths: {
      home: "/",
      tree: "/tree",
      index: "/person-index",
      gallery: "/gallery",
      sources: "/sources",
      familyBase: "/family",
      terms: "/terms-of-service",
      privacy: "/privacy-policy",
    },
  },
};

const initialState: LanguageProviderState = {
  language: "pl",
  setLanguage: () => null,
  t: () => "",
  p: () => "",
};

const LanguageProviderContext =
  createContext<LanguageProviderState>(initialState);

export function LanguageProvider({
  children,
  defaultLanguage = "pl",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(
    () =>
      (localStorage.getItem("genealogy-language") as Language) ||
      defaultLanguage
  );

  const [location, setLocation] = useLocation();

  const t = (
    key: string,
    replacements?: Record<string, string | number>
  ): string => {
    let translation = (translations[language] as any)[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach((rKey) => {
        translation = translation.replace(
          `{${rKey}}`,
          String(replacements[rKey])
        );
      });
    }
    return translation;
  };

  const p = (key: string): string => {
    return (translations[language].paths as any)[key] || "/";
  };

  const handleSetLanguage = (newLanguage: Language) => {
    if (language !== newLanguage) {
      localStorage.setItem("genealogy-language", newLanguage);
      setLanguage(newLanguage);

      const currentPathKey = Object.keys(translations[language].paths).find(
        (key) =>
          (translations[language].paths as any)[key] === location.split("?")[0]
      );

      if (currentPathKey) {
        const newPath = (translations[newLanguage].paths as any)[
          currentPathKey
        ];
        setLocation(newPath || "/");
      } else {
        setLocation(translations[newLanguage].paths.home);
      }
    }
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
    p,
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
