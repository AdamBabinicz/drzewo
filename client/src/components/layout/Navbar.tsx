import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Network, Users, Images, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Strona Główna", href: "/" },
    { name: "Drzewo Interaktywne", href: "/drzewo" },
    { name: "Indeks Osób", href: "/indeks-osob" },
    { name: "Galeria", href: "/galeria" },
    { name: "Źródła", href: "/zrodla" },
  ];

  const familyLinks = [
    { name: "Gierczakowie", href: "/rod/gierczak" },
    { name: "Ofiarowie", href: "/rod/ofiara" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="bg-white shadow-sm border-b heritage-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-serif text-xl font-semibold heritage-burgundy flex items-center">
              <Network className="w-5 h-5 mr-2" />
              Korzenie rodu Gierczak i Ofiara
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "heritage-burgundy"
                      : "heritage-text hover:text-[hsl(var(--heritage-burgundy))]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Family Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="heritage-text hover:text-[hsl(var(--heritage-burgundy))] px-3 py-2 text-sm font-medium transition-colors inline-flex items-center">
                  Rody <Users className="ml-1 w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {familyLinks.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="cursor-pointer">
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="heritage-text">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? "heritage-burgundy bg-stone-100"
                          : "heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-stone-50"
                      } rounded-md`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4">
                    <h3 className="px-3 py-2 text-sm font-semibold heritage-text">Rody</h3>
                    {familyLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-6 py-2 text-base font-medium heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-stone-50 rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
