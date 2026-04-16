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
    "name": "DIY Motorhomes",
    "url": "https://diymotorhomes.co.uk",
    "logo": "https://diymotorhomes.co.uk/icon.svg",
    "sameAs": [
      "https://facebook.com/diymotorhomes",
      "https://instagram.com/diymotorhomes",
      "https://youtube.com/diymotorhomes"
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
      "name": "DIY Motorhomes",
      "logo": {
        "@type": "ImageObject",
        "url": "https://diymotorhomes.co.uk/icon.svg"
      }
    },
    "datePublished": article.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}
