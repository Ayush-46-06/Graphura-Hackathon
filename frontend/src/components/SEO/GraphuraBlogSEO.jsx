import React from 'react';
import { Helmet } from 'react-helmet';

export default function GraphuraBlogSEO() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Graphura Hackathon Blogs",
    "headline": "Graphura Hackathon Blogs - Build, Compete, Win",
    "url": "https://graphura.in/blog",
    "description": "Drop in. Team up. Build fast. Outplay the competition. A survival-of-the-smartest hackathon where only the top creators claim victory. Explore articles on branding, digital marketing, UI/UX, graphic design, software development and business growth strategies.",
    "inLanguage": "en-IN",
    "publisher": {
      "@type": "Organization",
      "name": "Graphura India Private Limited",
      "url": "https://graphura.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://graphura.in/logo.png",
        "width": "600",
        "height": "60"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Patudi",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122503",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@graphura.in",
        "availableLanguage": ["English", "Hindi"]
      },
      "sameAs": [
        "https://instagram.com/graphura.in",
        "https://linkedin.com/company/graphura"
      ]
    },
    "blogPost": [],
    "about": [
      {
        "@type": "Thing",
        "name": "Hackathon"
      },
      {
        "@type": "Thing",
        "name": "Branding"
      },
      {
        "@type": "Thing",
        "name": "Digital Marketing"
      },
      {
        "@type": "Thing",
        "name": "Software Development"
      },
      {
        "@type": "Thing",
        "name": "UI/UX Design"
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Graphura Hackathon Blogs - Build, Compete, Win</title>
      <meta name="title" content="Graphura Hackathon Blogs | Branding, Marketing & Software Development" />
      <meta 
        name="description" 
        content="Drop in. Team up. Build fast. Outplay the competition. A survival-of-the-smartest hackathon where only the top creators claim victory. Explore expert articles on branding, digital marketing, UI/UX, graphic design, software development and business growth strategies from Graphura India Private Limited, Patudi, Gurugram, Haryana." 
      />
      <meta 
        name="keywords" 
        content="hackathon blog, branding blog, digital marketing tips, UI UX design blog, software development articles, business growth insights, creative design trends, marketing strategy blog, Graphura blog, Graphura hackathon" 
      />
      <meta name="author" content="Graphura India Private Limited" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://graphura.in/blog" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://graphura.in/blog" />
      <meta property="og:title" content="Graphura Hackathon Blogs | Build, Compete, Win" />
      <meta 
        property="og:description" 
        content="Drop in. Team up. Build fast. Outplay the competition. A survival-of-the-smartest hackathon where only the top creators claim victory. Explore expert articles on branding, digital marketing, UI/UX, graphic design, and software development." 
      />
      <meta property="og:image" content="https://graphura.in/logo.png" />
      <meta property="og:site_name" content="Graphura India Private Limited" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://graphura.in/blog" />
      <meta property="twitter:title" content="Graphura Hackathon Blogs | Build, Compete, Win" />
      <meta 
        property="twitter:description" 
        content="Drop in. Team up. Build fast. Outplay the competition. A survival-of-the-smartest hackathon where only the top creators claim victory. Explore expert articles on branding, digital marketing, UI/UX, graphic design, and software development." 
      />
      <meta property="twitter:image" content="https://graphura.in/logo.png" />

      {/* Additional Meta Tags */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Gurugram" />
      <meta name="language" content="English" />
      <meta name="contact" content="support@graphura.in" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdSchema)}
      </script>
    </Helmet>
  );
}