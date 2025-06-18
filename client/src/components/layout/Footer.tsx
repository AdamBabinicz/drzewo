import { Network, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-semibold mb-4 flex items-center">
              <Network className="w-5 h-5 mr-2" />
              Korzenie rodu
            </h3>
            <p className="text-white/80 leading-relaxed">
              Cyfrowe archiwum i interaktywne drzewo genealogiczne rodów Gierczak i Ofiara z okolic Radomia.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Nawigacja</h4>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/" className="hover:text-white transition-colors">Strona Główna</Link></li>
              <li><Link href="/drzewo" className="hover:text-white transition-colors">Drzewo Interaktywne</Link></li>
              <li><Link href="/rod/gierczak" className="hover:text-white transition-colors">Ród Gierczaków</Link></li>
              <li><Link href="/rod/ofiara" className="hover:text-white transition-colors">Ród Ofiarów</Link></li>
              <li><Link href="/galeria" className="hover:text-white transition-colors">Galeria</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="text-white/80 space-y-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                [kontakt@genealogia.pl]
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Okolice Radomia
              </p>
              <div className="pt-4">
                <p className="text-sm">Projekt genealogiczny<br />zachowujący pamięć o przodkach</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 Korzenie rodu Gierczak i Ofiara. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
