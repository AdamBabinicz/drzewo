import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, BookOpen, Users, Images } from 'lucide-react';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <section className="heritage-bg py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold heritage-text mb-6">
              Historia Rodów<br />
              <span className="heritage-burgundy">Gierczak i Ofiara</span>
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Odkryj fascynującą historię dwóch rodów z okolic Radomia. Prześledzij losy pokoleń, poznaj ich historie i zobacz, jak przeplatały się ich życiowe ścieżki.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-heritage-burgundy px-8 py-3 text-lg">
                <Link href="/drzewo">
                  <Eye className="w-5 h-5 mr-2" />
                  Zobacz Interaktywne Drzewo
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-3 text-lg heritage-border heritage-text hover:bg-stone-100">
                <Link href="#about">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Poznaj Historię
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-6">
                Początki Rodów
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Historia rodzin Gierczak i Ofiara sięga głęboko w przeszłość okolic radomskich. Te dwa rody, związane z Jaszowicami i Ludwikowem, tworzą fascynującą opowieść o życiu na ziemiach polskich na przestrzeni wieków.
                </p>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Dzięki zachowanym metryka, aktom kościelnym i przekazom rodzinnym, możemy prześledzić losy pokoleń, poznać ich zawody, miejsca zamieszkania i najważniejsze wydarzenia z ich życia.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild className="btn-heritage-teal px-6 py-3">
                  <Link href="/rod/gierczak">
                    <Users className="w-5 h-5 mr-2" />
                    Ród Gierczaków
                  </Link>
                </Button>
                <Button asChild className="btn-heritage-burgundy px-6 py-3">
                  <Link href="/rod/ofiara">
                    <Users className="w-5 h-5 mr-2" />
                    Ród Ofiarów
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:pl-8">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Stary dokument genealogiczny z zapisami rodzinnymi"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Family Branches Preview */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-6">
              Gałęzie Rodzinne
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Poznaj historię i pochodzenie każdego z rodów
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Gierczak Family Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                  alt="Stary kościół w Jaszowicach"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-1">Ród Gierczaków</h3>
                  <p className="text-white/90 text-sm">Jaszowice, Gulinek</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Rodzina Gierczak (vel Gerczak) pochodząca z okolic Jaszowic. Pierwsze wzmianki o rodzinie datują się na XVIII wiek. Zajmowali się głównie rolnictwem i rzemiosłem.
                </p>
                <Button asChild className="w-full btn-heritage-burgundy">
                  <Link href="/rod/gierczak">
                    <Users className="w-4 h-4 mr-2" />
                    Poznaj Wszystkich Gierczaków
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Ofiara Family Card */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src="https://pixabay.com/get/gc06fc77a8a983246516b4657991585fc4b8d7476aa870249367ba9b649a62d92690f8e86076d1c06b694884c35186592b30240b85a2a0a81e612984e1f61b4c3_1280.jpg"
                  alt="Wieś Ludwików - miejsce pochodzenia rodu Ofiarów"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-1">Ród Ofiarów</h3>
                  <p className="text-white/90 text-sm">Ludwików, Cerekiew</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Rodzina Ofiara wywodząca się z Ludwikowa i okolicznych miejscowości. Działalność rodziny koncentrowała się wokół rolnictwa i drobnego handlu.
                </p>
                <Button asChild className="w-full btn-heritage-teal">
                  <Link href="/rod/ofiara">
                    <Users className="w-4 h-4 mr-2" />
                    Poznaj Wszystkich Ofiarów
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold heritage-text mb-4">
              Rozpocznij Eksplorację
            </h2>
            <p className="text-stone-600">
              Wybierz jeden ze sposobów poznawania historii rodzin
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/drzewo">
                <CardContent className="p-6">
                  <Eye className="w-12 h-12 heritage-burgundy mx-auto mb-4" />
                  <h3 className="font-semibold heritage-text mb-2">Drzewo Genealogiczne</h3>
                  <p className="text-sm text-stone-600">Interaktywne drzewo z wszystkimi członkami rodzin</p>
                </CardContent>
              </Link>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/indeks-osob">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 heritage-teal mx-auto mb-4" />
                  <h3 className="font-semibold heritage-text mb-2">Indeks Osób</h3>
                  <p className="text-sm text-stone-600">Alfabetyczna lista wszystkich osób w bazie</p>
                </CardContent>
              </Link>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/galeria">
                <CardContent className="p-6">
                  <Images className="w-12 h-12 heritage-burgundy mx-auto mb-4" />
                  <h3 className="font-semibold heritage-text mb-2">Galeria</h3>
                  <p className="text-sm text-stone-600">Zdjęcia, dokumenty i miejsca związane z rodzinami</p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
