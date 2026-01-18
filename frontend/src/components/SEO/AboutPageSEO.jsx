import React from "react";
import { Helmet } from "react-helmet";

export default function AboutPageSEO() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://graphura.in/about#aboutpage",
        "url": "https://graphura.in/about",
        "name": "About Graphura | Where Hackathons Meet Esports",
        "description":
          "Graphura redefines hackathons into competitive, game-driven arenas where innovation, skills, and teamwork level you up for the real world.",
        "inLanguage": "en-IN",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://graphura.in/#website",
          "url": "https://graphura.in",
          "name": "Graphura"
        },
        "about": {
          "@id": "https://graphura.in/#organization"
        }
      },

      {
        "@type": "Organization",
        "@id": "https://graphura.in/#organization",
        "name": "Graphura",
        "url": "https://graphura.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://graphura.in/logo.png",
          "width": 600,
          "height": 600
        },
        "description":
          "Graphura is a competitive hackathon platform that blends esports-style competition with real-world problem solving, teamwork, and innovation.",
        "slogan": "Where Hackathons Meet Esports",
        "areaServed": "Worldwide",
        "sameAs": [
          "https://instagram.com/graphura.in",
          "https://linkedin.com/company/graphura",
          "https://twitter.com/graphura"
        ],
        "knowsAbout": [
          "Hackathons",
          "Competitive Coding",
          "Design Challenges",
          "Esports-style Competitions",
          "Skill Development",
          "Team Collaboration",
          "Live Leaderboards",
          "Mentorship Programs",
          "Innovation Challenges"
        ]
      },

      {
        "@type": "ItemList",
        "@id": "https://graphura.in/about#features",
        "name": "Graphura Platform Features",
        "description": "Core features that define the Graphura hackathon experience",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Squad Battles",
            "description": "Team-based competitive hackathons inspired by esports formats"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Live Leaderboards",
            "description": "Real-time rankings that reflect performance instantly"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Reward Loot Drops",
            "description": "Prizes, swag, recognition, and career opportunities"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Clutch Mentorship",
            "description": "Expert guidance during critical moments of competition"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Real Mission Design",
            "description": "Industry-relevant challenges instead of dummy tasks"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Fame System",
            "description": "Badges, titles, trophies, and spotlight recognition"
          }
        ]
      },

      {
        "@type": "BreadcrumbList",
        "@id": "https://graphura.in/about#breadcrumb",
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
            "name": "About",
            "item": "https://graphura.in/about"
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>About Graphura | Where Hackathons Meet Esports</title>
      <meta
        name="description"
        content="Graphura redefines hackathons into competitive, game-driven arenas where innovation, skills, and teamwork level you up for the real world."
      />
      <link rel="canonical" href="https://graphura.in/about" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="About Graphura | Where Hackathons Meet Esports" />
      <meta property="og:description" content="Competitive hackathons designed like esports arenas for real-world skill building." />
      <meta property="og:url" content="https://graphura.in/about" />
      <meta property="og:image" content="https://graphura.in/about_img/hero.webp" />
      <meta property="og:site_name" content="Graphura" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="About Graphura | Where Hackathons Meet Esports" />
      <meta name="twitter:description" content="Competitive hackathons designed like esports arenas for real-world skill building." />
      <meta name="twitter:image" content="https://graphura.in/about_img/hero.webp" />
      <meta name="twitter:site" content="@graphura" />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#03594E" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}