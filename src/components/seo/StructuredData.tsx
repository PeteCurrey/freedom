import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Amplios",
    "url": "https://amplios.co.uk",
    "logo": "https://amplios.co.uk/icon.svg",
    "sameAs": [
      "https://facebook.com/ampliosuk",
      "https://instagram.com/ampliosuk",
      "https://youtube.com/ampliosuk"
    ],
    "description": "The UK's definitive resource hub for serious self-build motorhome and campervan conversions."
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  authorName: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": article.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Amplios",
      "logo": {
        "@type": "ImageObject",
        "url": "https://amplios.co.uk/icon.svg"
      }
    },
    "datePublished": article.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}
