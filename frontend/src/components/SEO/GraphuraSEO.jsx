import React from 'react';
import { Helmet } from 'react-helmet';

export default function GraphuraSEO() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Graphura India Private Limited",
        "url": "https://graphura.in",
        "logo": "https://graphura.in/logo.png",
        "description": "Graphura India Private Limited is a Branding, Digital Marketing and Custom Software Development company offering educational hackathons and skill development programs for students and professionals.",
        "email": "support@graphura.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Patudi, Gurugram",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://instagram.com/graphura.in",
          "https://linkedin.com/company/graphura"
        ]
      },
      {
        "@type": "Website",
        "url": "https://graphura.in",
        "name": "Graphura India Private Limited",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://graphura.in/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://graphura.in"
          }
        ]
      },
      {
        "@type": "EducationalOrganization",
        "name": "Graphura India Private Limited",
        "url": "https://graphura.in",
        "description": "Offering interactive modules, unrestricted training, and industry-focused skill development programs through hackathons and challenges.",
        "educationalProgramMode": "Online",
        "teaches": [
          "Sales & Marketing",
          "UI/UX Design",
          "Content Strategy",
          "Human Resources",
          "Video Editing",
          "Graphic Design",
          "Digital Marketing",
          "Data Science & Analytics"
        ]
      },
      {
        "@type": "ItemList",
        "name": "Hackathon Categories",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Sales & Marketing Faceoffs"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "UI/UX Design Quests"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Content Strategy Challenges"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Human Resources Hack Battles"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Video Editing Showdowns"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Graphic Design Combat"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Digital Marketing Ops"
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "Data Science & Analytics Missions"
          }
        ]
      },
      {
        "@type": "Service",
        "serviceType": "Branding & Identity Design",
        "provider": {
          "@type": "Organization",
          "name": "Graphura India Private Limited"
        }
      },
      {
        "@type": "Service",
        "serviceType": "Digital Marketing & Growth Strategy",
        "provider": {
          "@type": "Organization",
          "name": "Graphura India Private Limited"
        }
      },
      {
        "@type": "Service",
        "serviceType": "Custom Software & Mobile App Development",
        "provider": {
          "@type": "Organization",
          "name": "Graphura India Private Limited"
        }
      },
      {
        "@type": "Event",
        "name": "Graphura Hackathons",
        "description": "Skill-building hackathons and challenges across multiple domains including design, marketing, data science, and more.",
        "organizer": {
          "@type": "Organization",
          "name": "Graphura India Private Limited"
        },
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does Graphura India Private Limited do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Graphura India Private Limited provides Branding, Digital Marketing, Website Design, Custom Software Development solutions, and educational hackathons for skill development across various domains."
            }
          },
          {
            "@type": "Question",
            "name": "What types of hackathons does Graphura offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Graphura offers hackathons in Sales & Marketing, UI/UX Design, Content Strategy, Human Resources, Video Editing, Graphic Design, Digital Marketing, and Data Science & Analytics."
            }
          },
          {
            "@type": "Question",
            "name": "What are the benefits of Graphura's educational programs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Graphura provides interactive modules, unrestricted training, sector industry-minded learning, and on-the-go research opportunities to help develop your potential with flexible education."
            }
          },
          {
            "@type": "Question",
            "name": "Do you work with international clients?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Graphura works with clients across India, the UK, UAE, Europe and other global regions and supports time-zone aligned communication and secure international billing."
            }
          },
          {
            "@type": "Question",
            "name": "How can I contact Graphura?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact us through our website at https://graphura.in or via email at support@graphura.in."
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Graphura India | Hackathons, Skill Development & Software Solutions</title>
      <meta name="title" content="Graphura India | Hackathons, Skill Development & Software Solutions" />
      <meta 
        name="description" 
        content="Join Graphura's hackathons and skill development programs. Compete in Design, Marketing, Data Science challenges. Professional services in Branding, Digital Marketing & Software Development." 
      />
      <meta 
        name="keywords" 
        content="hackathons, skill development, UI/UX design, digital marketing, data science, video editing, graphic design, content strategy, branding, software development, Graphura, India, UK" 
      />
      <meta name="author" content="Graphura India Private Limited" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://graphura.in" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://graphura.in" />
      <meta property="og:title" content="Graphura India | Hackathons, Skill Development & Software Solutions" />
      <meta 
        property="og:description" 
        content="Join Graphura's hackathons and skill development programs. Compete in Design, Marketing, Data Science challenges. Professional services in Branding, Digital Marketing & Software Development." 
      />
      <meta property="og:image" content="https://graphura.in/logo.png" />
      <meta property="og:site_name" content="Graphura India Private Limited" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://graphura.in" />
      <meta property="twitter:title" content="Graphura India | Hackathons, Skill Development & Software Solutions" />
      <meta 
        property="twitter:description" 
        content="Join Graphura's hackathons and skill development programs. Compete in Design, Marketing, Data Science challenges. Professional services in Branding, Digital Marketing & Software Development." 
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