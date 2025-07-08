export const getDynamicText = (
  field: { pl: string; en: string } | string | null | undefined,
  locale: string
) => {
  if (!field) return null;
  if (typeof field === "object" && field !== null && "pl" in field) {
    return field[locale as keyof typeof field] || field.pl;
  }
  return field;
};

// Uniwersalna funkcja do formatowania dat i notatek
export const formatDate = (
  dateString: string | null | undefined,
  locale: string
) => {
  if (!dateString || dateString === "?") return "?";

  const translations: { [key: string]: { pl: string; en: string } } = {
    "ok.": { pl: "ok.", en: "c." },
    przed: { pl: "przed", en: "before" },
    po: { pl: "po", en: "after" },
    between: { pl: "między", en: "between" },
  };

  const parts = dateString.split(" ");
  const keyword = parts[0];

  if (Object.prototype.hasOwnProperty.call(translations, keyword)) {
    const translationSet = translations[keyword];
    const translatedKeyword =
      locale === "en" ? translationSet.en : translationSet.pl;

    if (keyword === "between" && parts.length === 4 && parts[2] === "and") {
      const year1 = parts[1];
      const year2 = parts[3];
      return locale === "pl"
        ? `między ${year1} a ${year2}`
        : `between ${year1} and ${year2}`;
    }

    const restOfString = parts.slice(1).join(" ");
    return `${translatedKeyword} ${restOfString}`;
  }

  if (
    /^\d{4}$/.test(dateString) ||
    /^\d{4}s$/.test(dateString) ||
    /^\d{4} \?$/.test(dateString) ||
    /^\d{4}xx$/.test(dateString)
  )
    return dateString;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};
