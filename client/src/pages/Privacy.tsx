import { useLanguage } from "@/hooks/useLanguage";

export default function Privacy() {
  const { t } = useLanguage();

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
    <div className="bg-white dark:bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-serif heritage-gradient-text text-center mb-8">
          {t("privacy.title")}
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          {t("privacy.lastUpdated")}
        </p>

        {renderSection("section1")}
        {renderSection("section2")}
        {renderSection("section3")}
        {renderSection("section4")}
        {renderSection("section5")}
      </div>
    </div>
  );
}
