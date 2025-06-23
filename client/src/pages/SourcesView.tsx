import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, FileText, Mail, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import { useLanguage } from "@/hooks/useLanguage";

export default function SourcesView() {
  const { t } = useLanguage();

  const sources = [
    {
      categoryKey: "sources.section.stateArchives.title",
      itemKeys: [
        "sources.section.stateArchives.item1",
        "sources.section.stateArchives.item2",
        "sources.section.stateArchives.item3",
      ],
    },
    {
      categoryKey: "sources.section.churchSources.title",
      itemKeys: [
        "sources.section.churchSources.item1",
        "sources.section.churchSources.item2",
        "sources.section.churchSources.item3",
        "sources.section.churchSources.item4",
      ],
    },
    {
      categoryKey: "sources.section.familyAccounts.title",
      itemKeys: [
        "sources.section.familyAccounts.item1",
        "sources.section.familyAccounts.item2",
        "sources.section.familyAccounts.item3",
        "sources.section.familyAccounts.item4",
      ],
    },
    {
      categoryKey: "sources.section.literature.title",
      itemKeys: [
        "sources.section.literature.item1",
        "sources.section.literature.item2",
        "sources.section.literature.item3",
      ],
    },
  ];

  return (
    <>
      <SEO title={t("sources.title")} description={t("sources.subtitle")} />

      <div className="bg-background">
        <div className="heritage-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FileText className="w-16 h-16 heritage-gold mx-auto mb-4" />
            <h2 className="font-serif text-4xl md:text-5xl font-bold heritage-text mb-4">
              {t("sources.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("sources.subtitle")}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="mb-12 bg-stone-50 dark:bg-background-alt">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <BookOpen className="w-8 h-8 heritage-burgundy flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-2xl font-semibold heritage-text mb-4">
                    {t("sources.about.title")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {t("sources.about.p1")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("sources.about.p2")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white dark:bg-gradient-dark-brown rounded-lg p-4 sm:p-8">
            <div className="mb-12">
              <h2 className="font-serif text-3xl font-semibold heritage-text mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                {t("sources.archive.title")}
              </h2>

              <div className="space-y-6">
                {sources.map((source, index) => (
                  <Card key={index} className="heritage-card">
                    <CardHeader>
                      <CardTitle className="heritage-text text-lg">
                        {t(source.categoryKey)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {source.itemKeys.map((itemKey, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-heritage-gold rounded-full flex-shrink-0 mt-2"></div>
                            <span className="text-muted-foreground">
                              {t(itemKey)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator className="my-12" />

            <Card className="heritage-card">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 heritage-burgundy mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold heritage-text mb-4">
                  {t("sources.contact.title")}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t("sources.contact.desc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground">
                  <a
                    href="mailto:puaro@vp.pl"
                    className="flex items-center hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    [puaro@vp.pl]
                  </a>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {t("footer.contact.location")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
