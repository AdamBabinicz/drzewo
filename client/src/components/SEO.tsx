import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = "Korzenie rodu Gierczak i Ofiara",
  description = "Cyfrowe archiwum i interaktywne drzewo genealogiczne rodów Gierczak i Ofiara z okolic Radomia. Odkryj fascynującą historię pokoleń i poznaj swoje korzenie.",
  keywords = "genealogia, drzewo genealogiczne, Gierczak, Ofiara, Radom, rodzina, historia, przodkowie",
  image = "/og-image.jpg",
  url = typeof window !== 'undefined' ? window.location.href : ""
}: SEOProps) {
  const fullTitle = title === "Korzenie rodu Gierczak i Ofiara" ? title : `${title} | Korzenie rodu Gierczak i Ofiara`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Korzenie rodu Gierczak i Ofiara" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Polish" />
      <meta name="author" content="Projekt genealogiczny Gierczak i Ofiara" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
