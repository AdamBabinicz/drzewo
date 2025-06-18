import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PersonCard from '@/components/ui/PersonCard';
import PersonModal from '@/components/ui/PersonModal';
import { Person } from '@shared/schema';
import { MapPin, Users, Eye } from 'lucide-react';
import { useState } from 'react';
import SEO from '@/components/SEO';
import genealogyData from '@/data/genealogy.json';
import { Link } from 'wouter';

export default function FamilyBranchView() {
  const [, params] = useRoute('/rod/:family');
  const family = params?.family as 'gierczak' | 'ofiara';

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: allPeople = [] } = useQuery({
    queryKey: ['/api/people'],
    queryFn: () => Promise.resolve(genealogyData.people as Person[]),
  });

  const familyPeople = allPeople.filter(person => person.family === family);

  const familyInfo = {
    gierczak: {
      name: 'Ród Gierczaków',
      description: 'Rodzina Gierczak (vel Gerczak) pochodząca z okolic Jaszowic. Pierwsze wzmianki o rodzinie datują się na XVIII wiek. Zajmowali się głównie rolnictwem i rzemiosłem.',
      places: ['Jaszowice', 'Gulinek'],
      color: 'heritage-burgundy',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400'
    },
    ofiara: {
      name: 'Ród Ofiarów',
      description: 'Rodzina Ofiara wywodząca się z Ludwikowa i okolicznych miejscowości. Działalność rodziny koncentrowała się wokół rolnictwa i drobnego handlu.',
      places: ['Ludwików', 'Cerekiew'],
      color: 'heritage-teal',
      imageUrl: 'https://pixabay.com/get/gc06fc77a8a983246516b4657991585fc4b8d7476aa870249367ba9b649a62d92690f8e86076d1c06b694884c35186592b30240b85a2a0a81e612984e1f61b4c3_1280.jpg'
    }
  };

  const currentFamily = familyInfo[family];

  if (!family || !currentFamily) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold heritage-text mb-4">Nieznana rodzina</h1>
          <p className="text-stone-600">Wybierz prawidłową gałąź rodzinną.</p>
        </div>
      </div>
    );
  }

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title={currentFamily.name}
        description={`${currentFamily.description} Poznaj historię i członków ${currentFamily.name.toLowerCase()}.`}
      />

      <div className="min-h-screen bg-stone-50">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80">
          <img
            src={currentFamily.imageUrl}
            alt={`Miejsca związane z ${currentFamily.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {currentFamily.name}
              </h1>
              <p className="text-xl md:text-2xl">
                {currentFamily.places.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Description */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold heritage-text mb-4">
                      Historia rodu
                    </h2>
                    <p className="text-stone-600 leading-relaxed mb-6">
                      {currentFamily.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-stone-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Główne miejscowości:
                      </div>
                      <div className="flex space-x-2">
                        {currentFamily.places.map(place => (
                          <span key={place} className="bg-stone-100 px-2 py-1 rounded">
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 mb-4`}>
                      <Users className={`w-12 h-12 ${currentFamily.color}`} />
                    </div>
                    <p className="text-2xl font-bold heritage-text">{familyPeople.length}</p>
                    <p className="text-stone-600">osób w bazie</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Members List */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-semibold heritage-text">
                Członkowie rodziny
              </h2>
              <Button asChild className={`btn-${currentFamily.color.replace('heritage-', '')}`}>
                <Link href="/drzewo">
                  <Eye className="w-4 h-4 mr-2" />
                  Zobacz w drzewie
                </Link>
              </Button>
            </div>

            {familyPeople.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyPeople
                  .sort((a, b) => {
                    const birthYearA = a.birthDate ? parseInt(a.birthDate) : 0;
                    const birthYearB = b.birthDate ? parseInt(b.birthDate) : 0;
                    return birthYearA - birthYearB;
                  })
                  .map(person => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      onClick={() => handlePersonClick(person)}
                    />
                  ))
                }
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold heritage-text mb-2">
                    Brak danych
                  </h3>
                  <p className="text-stone-600">
                    Nie znaleziono osób z tej gałęzi rodziny w bazie danych.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Key Places */}
          <div>
            <h2 className="font-serif text-3xl font-semibold heritage-text mb-6">
              Kluczowe miejsca
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {genealogyData.places
                .filter(place => currentFamily.places.includes(place.name))
                .map(place => (
                  <Card key={place.name} className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={place.imageUrl}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="font-serif text-xl font-semibold text-white">
                          {place.name}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-stone-600">{place.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Person Modal */}
        <PersonModal
          person={selectedPerson}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onPersonClick={handlePersonClick}
          allPeople={allPeople}
        />
      </div>
    </>
  );
}
```

```
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PersonCard from '@/components/ui/PersonCard';
import PersonModal from '@/components/ui/PersonModal';
import { Person } from '@shared/schema';
import { MapPin, Users, Eye } from 'lucide-react';
import { useState } from 'react';
import SEO from '@/components/SEO';
import genealogyData from '@/data/genealogy.json';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

export default function FamilyBranchView() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [, params] = useRoute('/rod/:family');
  const family = params?.family as 'gierczak' | 'ofiara';

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: allPeople = [] } = useQuery({
    queryKey: ['/api/people'],
    queryFn: () => Promise.resolve(genealogyData.people as Person[]),
  });

  const familyPeople = allPeople.filter(person => person.family === family);

  const familyInfo = {
    gierczak: {
      name: 'Ród Gierczaków',
      description: 'Rodzina Gierczak (vel Gerczak) pochodząca z okolic Jaszowic. Pierwsze wzmianki o rodzinie datują się na XVIII wiek. Zajmowali się głównie rolnictwem i rzemiosłem.',
      places: ['Jaszowice', 'Gulinek'],
      color: 'heritage-burgundy',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400'
    },
    ofiara: {
      name: 'Ród Ofiarów',
      description: 'Rodzina Ofiara wywodząca się z Ludwikowa i okolicznych miejscowości. Działalność rodziny koncentrowała się wokół rolnictwa i drobnego handlu.',
      places: ['Ludwików', 'Cerekiew'],
      color: 'heritage-teal',
      imageUrl: 'https://pixabay.com/get/gc06fc77a8a983246516b4657991585fc4b8d7476aa870249367ba9b649a62d92690f8e86076d1c06b694884c35186592b30240b85a2a0a81e612984e1f61b4c3_1280.jpg'
    }
  };

  const currentFamily = familyInfo[family];

  if (!family || !currentFamily) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold heritage-text mb-4">Nieznana rodzina</h1>
          <p className="text-stone-600">Wybierz prawidłową gałąź rodzinną.</p>
        </div>
      </div>
    );
  }

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  return (
    <>
      <SEO
        title={currentFamily.name}
        description={`${currentFamily.description} Poznaj historię i członków ${currentFamily.name.toLowerCase()}.`}
      />

      <div className="min-h-screen bg-stone-50">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80">
          <img
            src={currentFamily.imageUrl}
            alt={`Miejsca związane z ${currentFamily.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {currentFamily.name}
              </h1>
              <p className="text-xl md:text-2xl">
                {currentFamily.places.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Description */}
          <div className="mb-12">
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-serif text-2xl font-semibold heritage-text mb-4">
                      Historia rodu
                    </h2>
                    <p className="text-stone-600 leading-relaxed mb-6">
                      {currentFamily.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-stone-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Główne miejscowości:
                      </div>
                      <div className="flex space-x-2">
                        {currentFamily.places.map(place => (
                          <span key={place} className="bg-stone-100 px-2 py-1 rounded">
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 mb-4`}>
                      <Users className={`w-12 h-12 ${currentFamily.color}`} />
                    </div>
                    <p className="text-2xl font-bold heritage-text">{familyPeople.length}</p>
                    <p className="text-stone-600">osób w bazie</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Members List */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl font-semibold heritage-text">
                Członkowie rodziny
              </h2>
              <Button asChild className={`btn-${currentFamily.color.replace('heritage-', '')}`}>
                <Link href="/drzewo">
                  <Eye className="w-4 h-4 mr-2" />
                  Zobacz w drzewie
                </Link>
              </Button>
            </div>

            {familyPeople.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyPeople
                  .sort((a, b) => {
                    const birthYearA = a.birthDate ? parseInt(a.birthDate) : 0;
                    const birthYearB = b.birthDate ? parseInt(b.birthDate) : 0;
                    return birthYearA - birthYearB;
                  })
                  .map(person => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      onClick={() => handlePersonClick(person)}
                    />
                  ))
                }
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold heritage-text mb-2">
                    Brak danych
                  </h3>
                  <p className="text-stone-600">
                    Nie znaleziono osób z tej gałęzi rodziny w bazie danych.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Key Places */}
          <div>
            <h2 className="font-serif text-3xl font-semibold heritage-text mb-6">
              Kluczowe miejsca
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {genealogyData.places
                .filter(place => currentFamily.places.includes(place.name))
                .map(place => (
                  <Card key={place.name} className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={place.imageUrl}
                        alt={place.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="font-serif text-xl font-semibold text-white">
                          {place.name}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-stone-600">{place.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>

        {/* Person Modal */}
        <PersonModal
          person={selectedPerson}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onPersonClick={handlePersonClick}
          allPeople={allPeople}
        />
      </div>
    </>
  );
}
```

```
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PersonCard from '@/components/ui/PersonCard';
import PersonModal from '@/components/ui/PersonModal';
import { Person } from '@shared/schema';
import { MapPin, Users, Eye } from 'lucide-react';
import { useState } from 'react';
import SEO from '@/components/SEO';
import genealogyData from '@/data/genealogy.json';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

export default function FamilyBranchView() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [, params] = useRoute('/rod/:family');
  const family = params?.family as 'gierczak' | 'ofiara';

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: allPeople = [] } = useQuery({
    queryKey: ['/api/people'],
    queryFn: () => Promise.resolve(genealogyData.people as Person[]),
  });

  const familyPeople = allPeople.filter(person => person.family === family);

  const familyInfo = {
    gierczak: {
      name: 'Ród Gierczaków',
      description: 'Rodzina Gierczak (vel Gerczak) pochodząca z okolic Jaszowic. Pierwsze wzmianki o rodzinie datują się na XVIII wiek. Zajmowali się głównie rolnictwem i rzemiosłem.',
      places: ['Jaszowice', 'Gulinek'],
      color: 'heritage-burgundy',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400'
    },
    ofiara: {
      name: 'Ród Ofiarów',
      description: 'Rodzina Ofiara wywodząca się z Ludwikowa i okolicznych miejscowości. Działalność rodziny koncentrowała się wokół rolnictwa i drobnego handlu.',
      places: ['Ludwików', 'Cerekiew'],
      color: 'heritage-teal',
      imageUrl: 'https://pixabay.com/get/gc06fc77a8a983246516b4657991585fc4b8d7476aa870249367ba9b649a62d92690f8e86076d1c06b694884c35186592b30240b85a2a0a81e612984e1f61b4c3_1280.jpg'
    }
  };

    const currentFamily = familyInfo[family];

    if (!family || !currentFamily) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold heritage-text mb-4">Nieznana rodzina</h1>
                    <p className="text-stone-600">Wybierz prawidłową gałąź rodzinną.</p>
                </div>
            </div>
        );
    }

    const handlePersonClick = (person: Person) => {
        setSelectedPerson(person);
        setModalOpen(true);
    };

    return (
        <>
            <SEO
                title={currentFamily.name}
                description={`${currentFamily.description} Poznaj historię i członków ${currentFamily.name.toLowerCase()}.`}
            />

            <div className="min-h-screen bg-stone-50">
                {/* Hero Section */}
                <div className="relative h-64 md:h-80">
                    <img
                        src={currentFamily.imageUrl}
                        alt={`Miejsca związane z ${currentFamily.name}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                                {currentFamily.name}
                            </h1>
                            <p className="text-xl md:text-2xl">
                                {currentFamily.places.join(', ')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Description */}
                    <div className="mb-12">
                        <Card>
                            <CardContent className="p-8">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h2 className="font-serif text-2xl font-semibold heritage-text mb-4">
                                            Historia rodu
                                        </h2>
                                        <p className="text-stone-600 leading-relaxed mb-6">
                                            {currentFamily.description}
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm text-stone-600">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                Główne miejscowości:
                                            </div>
                                            <div className="flex space-x-2">
                                                {currentFamily.places.map(place => (
                                                    <span key={place} className="bg-stone-100 px-2 py-1 rounded">
                                                        {place}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 mb-4`}>
                                            <Users className={`w-12 h-12 ${currentFamily.color}`} />
                                        </div>
                                        <p className="text-2xl font-bold heritage-text">{familyPeople.length}</p>
                                        <p className="text-stone-600">osób w bazie</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Members List */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-serif text-3xl font-semibold heritage-text">
                                Członkowie rodziny
                            </h2>
                            <Button asChild className={`btn-${currentFamily.color.replace('heritage-', '')}`}>
                                <Link href="/drzewo">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Zobacz w drzewie
                                </Link>
                            </Button>
                        </div>

                        {familyPeople.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {familyPeople
                                    .sort((a, b) => {
                                        const birthYearA = a.birthDate ? parseInt(a.birthDate) : 0;
                                        const birthYearB = b.birthDate ? parseInt(b.birthDate) : 0;
                                        return birthYearA - birthYearB;
                                    })
                                    .map(person => (
                                        <PersonCard
                                            key={person.id}
                                            person={person}
                                            onClick={() => handlePersonClick(person)}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <Users className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold heritage-text mb-2">
                                        Brak danych
                                    </h3>
                                    <p className="text-stone-600">
                                        Nie znaleziono osób z tej gałęzi rodziny w bazie danych.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Key Places */}
                    <div>
                        <h2 className="font-serif text-3xl font-semibold heritage-text mb-6">
                            Kluczowe miejsca
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {genealogyData.places
                                .filter(place => currentFamily.places.includes(place.name))
                                .map(place => (
                                    <Card key={place.name} className="overflow-hidden">
                                        <div className="relative h-48">
                                            <img
                                                src={place.imageUrl}
                                                alt={place.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4">
                                                <h3 className="font-serif text-xl font-semibold text-white">
                                                    {place.name}
                                                </h3>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <p className="text-stone-600">{place.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Person Modal */}
                <PersonModal
                    person={selectedPerson}
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onPersonClick={handlePersonClick}
                    allPeople={allPeople}
                />
            </div>
        </>
    );
}
```