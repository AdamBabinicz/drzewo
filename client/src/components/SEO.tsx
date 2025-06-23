import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/useLanguage";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description,
  image = "/pokol.avif",
  url = window.location.href,
}: SEOProps) {
  const { language, t } = useLanguage();

  const defaultTitle = t("home.title");
  const defaultDescription = t("home.description");

  const siteTitle = title ? `${title} - ${defaultTitle}` : defaultTitle;
  const siteDescription = description || defaultDescription;

  return (
    <Helmet>
      <html lang={language} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Genealogia Gierczak i Ofiara" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
