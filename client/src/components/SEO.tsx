
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/hooks/useLanguage';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title,
  description,
  keywords,
  image,
  url 
}: SEOProps) {
  const { language } = useLanguage();
  
  const defaultTitle = language === 'pl' 
    ? 'Korzenie rodu Gierczak i Ofiara - Genealogia'
    : 'Roots of Gierczak and Ofiara Families - Genealogy';
    
  const defaultDescription = language === 'pl'
    ? 'Odkryj fascynującą historię rodów Gierczak i Ofiara z okolic Radomia. Interaktywne drzewo genealogiczne, galeria rodzinna i źródła historyczne.'
    : 'Discover the fascinating history of the Gierczak and Ofiara families from the Radom area. Interactive family tree, family gallery and historical sources.';

  const siteTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="language" content={language} />
    </Helmet>
  );
}
