import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  Network,
  Users,
  Sun,
  Moon,
  Languages,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// ZMIANA 1: Dodaj `SheetDescription` do importów
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription, // <-- Dodany import
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t, p } = useLanguage();

  const navigation = [
    { name: t("nav.home"), href: p("home") },
    { name: t("nav.tree"), href: p("tree") },
    { name: t("nav.index"), href: p("index") },
    { name: t("nav.gallery"), href: p("gallery") },
    { name: t("nav.sources"), href: p("sources") },
  ];

  const familyLinks = [
    { name: t("family.gierczak"), href: `${p("familyBase")}/gierczak` },
    { name: t("family.ofiara"), href: `${p("familyBase")}/ofiara` },
  ];

  const isActive = (href: string) => location === href;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location === p("home")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b heritage-border fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href={p("home")}
            className="flex-shrink-0"
            onClick={handleLogoClick}
          >
            <h2 className="font-serif text-lg md:text-xl font-semibold heritage-gradient-text flex items-center">
              <Network className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">{t("nav.title")}</span>
              <span className="sm:hidden">{t("nav.title.mobile")}</span>
            </h2>
          </Link>

          {/* ... reszta kodu bez zmian ... */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={
                    item.href === p("home") ? handleLogoClick : undefined
                  }
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    isActive(item.href)
                      ? "heritage-burgundy bg-heritage-cream"
                      : "heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-heritage-cream/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger className="heritage-text hover:text-[hsl(var(--heritage-burgundy))] hover:bg-heritage-cream/50 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md inline-flex items-center">
                  {t("nav.families")} <Users className="ml-1 w-3 h-3" />
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
            <div className="flex items-center space-x-2 border-l pl-4 heritage-border">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                    <Globe className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="heritage-card">
                  <DropdownMenuItem onClick={() => setLanguage("pl")}>
                    Polski
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    {language === "pl" ? "Jasny" : "Light"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    {language === "pl" ? "Ciemny" : "Dark"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Languages className="mr-2 h-4 w-4" />
                    {language === "pl" ? "System" : "System"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
              className="h-8 px-2 text-xs heritage-text"
            >
              {language.toUpperCase()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
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
                <SheetHeader className="mb-4 text-left">
                  <SheetTitle>{t("nav.title")}</SheetTitle>
                  {/* ZMIANA 2: Dodaj komponent opisu */}
                  <SheetDescription>{t("nav.description")}</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4">
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
                    <span>{t("nav.families")}</span>
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
