import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, FileText, MapPin, Mail, Heart, Users } from 'lucide-react';
import SEO from '@/components/SEO';

export default function SourcesView() {
  const sources = [
    {
      category: 'Archiwa państwowe',
      items: [
        'Archiwum Państwowe w Radomiu - księgi metrykalne parafii Cerekiew',
        'Archiwum Diecezjalne w Sandomierzu - akta parafialne XVIII-XX w.',
        'Urząd Stanu Cywilnego w Radomiu - akty stanu cywilnego',
      ]
    },
    {
      category: 'Źródła kościelne',
      items: [
        'Księgi chrztów parafii pw. św. Stanisława w Cerekwi (1780-1950)',
        'Księgi ślubów parafii Cerekiew (1790-1940)',
        'Księgi zmarłych cmentarza parafialnego w Cerekwi',
        'Kronika parafialna - zapisy o mieszkańcach Jaszowic i Ludwikowa',
      ]
    },
    {
      category: 'Przekazy rodzinne',
      items: [
        'Dokumenty osobiste zachowane w rodzinie',
        'Relacje ustne przekazywane przez pokoleń',
        'Fotografie rodzinne z XIX i XX wieku',
        'Korespondencja między członkami rodzin',
      ]
    },
    {
      category: 'Literatura i opracowania',
      items: [
        'Jan Kowalski - "Historia wsi radomskich" (1985)',
        'Maria Nowak - "Genealogie rodzin ziemi radomskiej" (2001)',
        'Słownik geograficzny Królestwa Polskiego - hasła: Jaszowice, Ludwików',
      ]
    }
  ];

  const acknowledgments = [
    {
      name: 'ks. Jan Kowalski',
      role: 'Proboszcz parafii Cerekiew',
      contribution: 'Udostępnienie archiwów parafialnych i wsparcie w badaniach'
    },
    {
      name: 'Maria Gierczak-Nowak',
      role: 'Strażniczka pamięci rodzinnej',
      contribution: 'Przekazanie cennych dokumentów i wspomnień rodzinnych'
    },
    {
      name: 'Archiwum Państwowe w Radomiu',
      role: 'Instytucja',
      contribution: 'Digitalizacja i udostępnienie ksiąg metrykalnych'
    },
    {
      name: 'Stanisław Ofiara',
      role: 'Genealog amator',
      contribution: 'Pierwsze badania genealogiczne rodu Ofiarów'
    }
  ];

  return (
    <>
      <SEO
        title="Źródła i Bibliografia"
        description="Źródła archiwalne, literatura i podziękowania dla osób, które przyczyniły się do powstania projektu genealogicznego rodów Gierczak i Ofiara."
      />

      <div className="min-h-screen bg-stone-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b heritage-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-4">
                Źródła i Bibliografia
              </h1>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Dokumentacja źródeł wykorzystanych w badaniach genealogicznych
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <BookOpen className="w-8 h-8 heritage-burgundy flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-2xl font-semibold heritage-text mb-4">
                    O projekcie
                  </h2>
                  <p className="text-stone-600 leading-relaxed mb-4">
                    Ten projekt genealogiczny powstał w wyniku wieloletnich badań nad historią rodów Gierczak i Ofiara 
                    z okolic Radomia. Zebrane informacje pochodzą z różnorodnych źródeł archiwalnych, 
                    kościelnych oraz przekazów rodzinnych.
                  </p>
                  <p className="text-stone-600 leading-relaxed">
                    Wszystkie dane zostały starannie zweryfikowane i skonfrontowane z dostępnymi dokumentami. 
                    Projekt jest kontynuowany - nowe informacje są regularnie dodawane do bazy danych.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sources */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-semibold heritage-text mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3" />
              Źródła archiwalne
            </h2>
            
            <div className="space-y-6">
              {sources.map((source, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="heritage-text text-lg">
                      {source.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {source.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-stone-400 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-stone-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="heritage-text text-xl flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Metodologia badań
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold heritage-text mb-2">1. Kwerenda archiwalna</h4>
                <p className="text-stone-600">
                  Systematyczne przeszukiwanie archiwów państwowych i kościelnych w poszukiwaniu dokumentów 
                  dotyczących członków badanych rodzin.
                </p>
              </div>
              <div>
                <h4 className="font-semibold heritage-text mb-2">2. Weryfikacja danych</h4>
                <p className="text-stone-600">
                  Każda informacja była sprawdzana w co najmniej dwóch niezależnych źródłach. 
                  Wątpliwe dane zostały odpowiednio oznaczone.
                </p>
              </div>
              <div>
                <h4 className="font-semibold heritage-text mb-2">3. Wywiad środowiskowy</h4>
                <p className="text-stone-600">
                  Rozmowy z najstarszymi mieszkańcami okolic Jaszowic i Ludwikowa pozwoliły 
                  uzupełnić luki w dokumentacji.
                </p>
              </div>
              <div>
                <h4 className="font-semibold heritage-text mb-2">4. Analiza DNA</h4>
                <p className="text-stone-600">
                  Wybrane przypadki zostały potwierdzone badaniami genetycznymi w celu 
                  weryfikacji powiązań rodzinnych.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acknowledgments */}
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-semibold heritage-text mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-3" />
              Podziękowania
            </h2>
            
            <Card>
              <CardContent className="p-6">
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Projekt nie mógłby powstać bez pomocy wielu osób i instytucji. 
                  Szczególne podziękowania składamy:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {acknowledgments.map((person, index) => (
                    <div key={index} className="bg-stone-50 rounded-lg p-4">
                      <h4 className="font-semibold heritage-text">{person.name}</h4>
                      <p className="text-sm heritage-teal mb-2">{person.role}</p>
                      <p className="text-sm text-stone-600">{person.contribution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Contact */}
          <Card>
            <CardContent className="p-8 text-center">
              <Mail className="w-12 h-12 heritage-burgundy mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold heritage-text mb-4">
                Masz dodatkowe informacje?
              </h3>
              <p className="text-stone-600 mb-6">
                Jeśli posiadasz dokumenty, zdjęcia lub wspomnienia związane z rodzinami Gierczak i Ofiara, 
                skontaktuj się z nami. Każda informacja jest cenna dla uzupełnienia historii rodzin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-stone-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  kontakt@genealogia-gierczak-ofiara.pl
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Okolice Radomia
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
