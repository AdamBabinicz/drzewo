import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Network, Users, Sun, Moon, Languages, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.tree'), href: "/drzewo" },
    { name: t('nav.index'), href: "/indeks-osob" },
    { name: t('nav.gallery'), href: "/galeria" },
    { name: t('nav.sources'), href: "/zrodla" },
  ];

  const familyLinks = [
    { name: t('family.gierczak'), href: "/rod/gierczak" },
    { name: t('family.ofiara'), href: "/rod/ofiara" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b heritage-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="font-serif text-lg md:text-xl font-semibold heritage-gradient-text flex items-center">
              <Network className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Korzenie rodu Gierczak i Ofiara</span>
              <span className="sm:hidden">Genealogia</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive(item.href)
                      ? "heritage-burgundy bg-heritage-cream"
                      : "heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-heritage-cream/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Family Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-heritage-cream/50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md inline-flex items-center">
                  {t('nav.families')} <Users className="ml-1 w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="heritage-card">
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

            {/* Theme & Language Controls */}
            <div className="flex items-center space-x-2 border-l pl-4 heritage-border">
              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="heritage-card">
                  <DropdownMenuItem onClick={() => setLanguage('pl')} className={language === 'pl' ? 'heritage-burgundy font-medium' : ''}>
                    Polski
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'heritage-burgundy font-medium' : ''}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="heritage-card">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    {language === 'pl' ? 'Jasny' : 'Light'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    {language === 'pl' ? 'Ciemny' : 'Dark'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Languages className="mr-2 h-4 w-4" />
                    {language === 'pl' ? 'System' : 'System'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'pl' ? 'en' : 'pl')}
              className="h-8 px-2 text-xs heritage-text"
            >
              {language.toUpperCase()}
            </Button>

            {/* Mobile Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-8 w-8 px-0"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="heritage-text">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 heritage-card">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-3 text-base font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? "heritage-burgundy bg-heritage-cream"
                          : "heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-heritage-cream/50"
                      } rounded-lg`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="elegant-separator">
                    <span>{t('nav.families')}</span>
                  </div>
                  {familyLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-6 py-3 text-base font-medium heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-heritage-cream/50 rounded-lg transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}