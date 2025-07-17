import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, BookOpen, Users, Images } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export default function Home() {
  const { t, p } = useLanguage();

  const seoTitle = t("home.seo_title");

  const handleScrollToAbout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <SEO
        title={seoTitle}
        isHomePage={true}
        schema={{ type: "website", data: {} }}
      />

      <section className="heritage-bg py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold heritage-text mb-6">
              {t("home.title")}
              <br />
              <span className="heritage-gradient-text">
                {t("home.subtitle")}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {t("home.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="btn-heritage-burgundy px-8 py-3 text-lg"
              >
                <Link href={p("tree")}>
                  <Eye className="w-5 h-5 mr-2" />
                  {t("home.cta.tree")}
                </Link>
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 text-lg heritage-border heritage-text dark:hover:bg-heritage-cream"
                onClick={handleScrollToAbout}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t("home.cta.history")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-16 lg:py-24 bg-stone-50 dark:bg-background-alt"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-6">
                {t("home.about.title")}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                  {t("home.about.p1")}
                </p>
                <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                  {t("home.about.p2")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  asChild
                  className="btn-heritage-burgundy px-6 py-3 transition-all"
                >
                  <Link href={`${p("familyBase")}/gierczak`}>
                    <Users className="w-5 h-5 mr-2" />
                    {t("family.gierczak")}
                  </Link>
                </Button>
                <Button
                  asChild
                  className="btn-heritage-teal px-6 py-3 transition-all"
                >
                  <Link href={`${p("familyBase")}/ofiara`}>
                    <Users className="w-5 h-5 mr-2" />
                    {t("family.ofiara")}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:pl-8">
              <img
                src="/images/boc.avif"
                alt="Stary dokument genealogiczny z zapisami rodzinnymi"
                className="rounded-xl shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white dark:bg-gradient-s-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold heritage-text mb-6">
              {t("home.branches.title")}
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto">
              {t("home.branches.subtitle")}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-80">
                <img
                  src="/images/jaszowice.avif"
                  alt="Chata w Jaszowicach"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-1">
                    {t("family.gierczak")}
                  </h3>
                  <p className="text-white/90 text-sm">
                    Jaszowice, Mleczków, Gulinek, Dąbrówka Nagórna, Klwaty,
                    Radom
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                  {t("home.branches.gierczak.desc")}
                </p>
                <Button
                  asChild
                  className="w-full btn-heritage-burgundy transition-all"
                >
                  <Link href={`${p("familyBase")}/gierczak`}>
                    <Users className="w-4 h-4 mr-2" />
                    {t("home.branches.gierczak.cta")}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-80">
                <img
                  src="/images/gulinek.avif"
                  alt="Wieś Ludwików - miejsce pochodzenia rodu Ofiarów"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-1">
                    {t("family.ofiara")}
                  </h3>
                  <p className="text-white/90 text-sm">
                    Wola Gutowska, Ludwików, Gulinek
                  </p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
                  {t("home.branches.ofiara.desc")}
                </p>
                <Button
                  asChild
                  className="w-full btn-heritage-teal transition-all"
                >
                  <Link href={`${p("familyBase")}/ofiara`}>
                    <Users className="w-4 h-4 mr-2" />
                    {t("home.branches.ofiara.cta")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-stone-50 dark:bg-background-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-semibold heritage-text mb-4">
              {t("home.explore.title")}
            </h2>
            <p className="text-stone-600 dark:text-stone-300">
              {t("home.explore.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={p("tree")}>
                <CardContent className="p-6">
                  <Eye className="w-12 h-12 heritage-burgundy mx-auto mb-4" />
                  <h3 className="font-semibold heritage-text mb-2">
                    {t("home.explore.tree.title")}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {t("home.explore.tree.desc")}
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={p("index")}>
                <CardContent className="p-6">
                  <Users className="w-12 h-12 heritage-teal mx-auto mb-4" />
                  <h3 className="font-semibold heritage-text mb-2">
                    {t("home.explore.index.title")}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {t("home.explore.index.desc")}
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={p("gallery")}>
                <CardContent className="p-6">
                  <Images className="w-12 h-12 heritage-burgundy mx-auto mb-4" />
                  <h3 className="font-semibold heritage-text mb-2">
                    {t("home.explore.gallery.title")}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {t("home.explore.gallery.desc")}
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
