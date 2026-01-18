import React from 'react';
import { Helmet } from 'react-helmet';

export default function HackathonSEO({ hackathons = [] }) {
  const totalHackathons = hackathons.length || 46;
  
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Graphura Hackathons",
    "url": "https://graphura.in/hackathons",
    "description": "Browse and join the best coding hackathons. Connect with developers, win prizes, and launch your career with competitions in coding, design, AI/ML, blockchain, web development, and mobile apps.",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Hackathon Listings",
      "description": "Live hackathons available for participation",
      "numberOfItems": totalHackathons,
      "itemListElement": hackathons.slice(0, 10).map((hackathon, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": hackathon.title,
          "url": `https://graphura.in/hackathons/${hackathon._id}`,
          "description": hackathon.description,
          "image": hackathon.image,
          "startDate": hackathon.startDate,
          "endDate": hackathon.endDate
        }
      }))
    },
    "publisher": {
      "@type": "Organization",
      "name": "Graphura India Private Limited",
      "url": "https://graphura.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://graphura.in/logo.png"
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
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://graphura.in/hackathons?search={search_term}"
      },
      "query-input": "required name=search_term"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://graphura.in"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Hackathons",
          "item": "https://graphura.in/hackathons"
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Hackathons - Build the Future | Graphura India</title>
      <meta name="title" content="Coding Hackathons & Competitions | Join Live Challenges - Graphura" />
      <meta 
        name="description" 
        content={`Discover ${totalHackathons}+ live hackathons in coding, design, AI/ML, blockchain, web development & mobile apps. Free and paid competitions. Connect with developers, win prizes, and launch your career.`}
      />
      <meta 
        name="keywords" 
        content="hackathons, coding competitions, developer challenges, AI ML hackathon, blockchain hackathon, web development competition, mobile app hackathon, design hackathon, programming contests, tech competitions, Graphura hackathons, India hackathons" 
      />
      <meta name="author" content="Graphura India Private Limited" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://graphura.in/hackathons" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://graphura.in/hackathons" />
      <meta property="og:title" content="Join Live Hackathons - Build the Future | Graphura" />
      <meta 
        property="og:description" 
        content={`Browse ${totalHackathons}+ live coding hackathons. Categories: coding, design, AI/ML, blockchain, web development & mobile apps. Free and paid events. Join now and win prizes!`}
      />
      <meta property="og:image" content="https://graphura.in/hackathon-hero.png" />
      <meta property="og:site_name" content="Graphura India Private Limited" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://graphura.in/hackathons" />
      <meta property="twitter:title" content="Join Live Hackathons - Build the Future | Graphura" />
      <meta 
        property="twitter:description" 
        content={`Browse ${totalHackathons}+ live coding hackathons. Categories: coding, design, AI/ML, blockchain, web development & mobile apps. Free and paid events.`}
      />
      <meta property="twitter:image" content="https://graphura.in/hackathon-hero.png" />

      {/* Additional Meta Tags */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Gurugram" />
      <meta name="language" content="English" />
      <meta name="contact" content="support@graphura.in" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Event-specific Meta */}
      <meta property="event:type" content="hackathon" />
      <meta property="event:categories" content="Coding, Design, AI/ML, Blockchain, Web Development, Mobile Apps" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLdSchema)}
      </script>
    </Helmet>
  );
}

// Individual Hackathon Detail Page SEO Component
export function HackathonDetailSEO({ hackathon }) {
  const individualHackathonSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": hackathon.title,
    "description": hackathon.description,
    "image": hackathon.image,
    "startDate": hackathon.startDate,
    "endDate": hackathon.endDate,
    "eventStatus": hackathon.status === "ongoing" 
      ? "https://schema.org/EventScheduled" 
      : hackathon.status === "completed" 
      ? "https://schema.org/EventCompleted" 
      : "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": `https://graphura.in/hackathons/${hackathon._id}`
    },
    "organizer": {
      "@type": "Organization",
      "name": "Graphura India Private Limited",
      "url": "https://graphura.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://graphura.in/logo.png"
      }
    },
    "offers": {
      "@type": "Offer",
      "price": hackathon.isPaid ? "Paid" : "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "validThrough": hackathon.lastEnrollmentDate
    },
    "performer": {
      "@type": "PerformanceRole",
      "roleName": hackathon.participationType
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Designers, Students"
    },
    "keywords": hackathon.tags?.join(", ") || ""
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{hackathon.title} | Graphura Hackathons</title>
      <meta name="title" content={`${hackathon.title} - Join the Challenge | Graphura`} />
      <meta name="description" content={hackathon.description} />
      <meta name="keywords" content={hackathon.tags?.join(", ")} />
      <meta name="author" content="Graphura India Private Limited" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`https://graphura.in/hackathons/${hackathon._id}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="event" />
      <meta property="og:url" content={`https://graphura.in/hackathons/${hackathon._id}`} />
      <meta property="og:title" content={hackathon.title} />
      <meta property="og:description" content={hackathon.description} />
      <meta property="og:image" content={hackathon.image} />
      <meta property="og:site_name" content="Graphura India Private Limited" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://graphura.in/hackathons/${hackathon._id}`} />
      <meta property="twitter:title" content={hackathon.title} />
      <meta property="twitter:description" content={hackathon.description} />
      <meta property="twitter:image" content={hackathon.image} />

      {/* Event Meta */}
      <meta property="event:start_date" content={hackathon.startDate} />
      <meta property="event:end_date" content={hackathon.endDate} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(individualHackathonSchema)}
      </script>
    </Helmet>
  );
}

// Usage Example:
// In Hackathon.jsx (listing page):
// import HackathonSEO from './HackathonSEO';
// <HackathonSEO hackathons={data} />

// In HackathonDetail.jsx (individual page):
// import { HackathonDetailSEO } from './HackathonSEO';
// <HackathonDetailSEO hackathon={hackathonData} />