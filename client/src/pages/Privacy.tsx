import { useLanguage } from "@/hooks/useLanguage";
import SEO from "@/components/SEO";

export default function Privacy() {
  const { t, language, p } = useLanguage();

  const dateFormatter = new Intl.DateTimeFormat(language, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentDate = dateFormatter.format(new Date());

  const renderSection = (sectionKey: string) => (
    <div className="space-y-3">
      <h2 className="text-2xl font-serif heritage-text mt-8 mb-4 border-b border-heritage-gray pb-2">
        {t(`privacy.${sectionKey}.title`)}
      </h2>
      {Array.from({ length: 5 })
        .map((_, i) => `privacy.${sectionKey}.p${i + 1}`)
        .filter((key) => t(key) !== key)
        .map((key) => (
          <p
            key={key}
            className="text-stone-700 dark:text-stone-300 leading-relaxed"
          >
            {t(key)}
          </p>
        ))}
    </div>
  );

  return (
    <>
      <SEO title={t("privacy.title")} path={p("privacy")} />
      <div className="bg-white dark:bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-4xl font-serif heritage-gradient-text text-center mb-4">
            {t("privacy.title")}
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {t("privacy.lastUpdated", { date: currentDate })}
          </p>

          {renderSection("section1")}
          {renderSection("section2")}
          {renderSection("section3")}
          {renderSection("section4")}
          {renderSection("section5")}
        </div>
      </div>
    </>
  );
}
