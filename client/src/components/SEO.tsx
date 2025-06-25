import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/useLanguage";

type SchemaType = "website" | "article" | "breadcrumbs";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  schema?: {
    type: SchemaType;
    data?: any;
  };
  isHomePage?: boolean; // <-- NOWA WŁAŚCIWOŚĆ
}

const siteUrl = "https://rodowekorzenie.netlify.app";
const siteName = "Korzenie rodu Gierczak i Ofiara";
const defaultImage = `${siteUrl}/pokol.avif`;
const logoUrl = `${siteUrl}/android-chrome-512x512.png`;

export default function SEO({
  title,
  description,
  image = defaultImage,
  path,
  schema,
  isHomePage = false,
}: SEOProps) {
  const { language, t } = useLanguage();

  const defaultTitle = t("home.title") || siteName;
  const defaultDescription =
    t("home.description") ||
    "Cyfrowe archiwum i interaktywne drzewo genealogiczne rodów Gierczak i Ofiara z okolic Radomia.";

  const pageTitle = title
    ? isHomePage
      ? title
      : `${title} - ${siteName}`
    : defaultTitle;

  const pageDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${path || window.location.pathname}`;

  const generateSchema = () => {
    if (!schema) return null;

    let schemaData: object | null = null;
    const { type, data } = schema;

    switch (type) {
      case "website":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/indeks-osob?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };
        break;
      case "article":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
          headline: data.headline,
          description: data.description,
          image: data.image || image,
          author: {
            "@type": "Person",
            name: data.author || "Administrator Strony",
          },
          publisher: {
            "@type": "Organization",
            name: siteName,
            logo: {
              "@type": "ImageObject",
              url: logoUrl,
            },
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified || data.datePublished,
        };
        break;
      case "breadcrumbs":
        schemaData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${siteUrl}${item.path}`,
          })),
        };
        break;
    }

    if (!schemaData) return null;

    return (
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    );
  };

  return (
    <Helmet>
      <html lang={language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />

      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={canonicalUrl} />

      {generateSchema()}
    </Helmet>
  );
}
