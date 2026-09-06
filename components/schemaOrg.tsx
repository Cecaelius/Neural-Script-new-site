"use client";

import { useEffect } from 'react';

export default function SchemaOrg() {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://neuralscript.tech/#organization",
      name: "Neural Script",
      url: "https://neuralscript.tech/",
      logo: "https://neuralscript.tech/favicon.ico",
      description: "Neural Script delivers AI, machine learning, agentic AI, software, web and mobile solutions that help businesses design, build, deploy and evolve.",
    };

    // Website Schema
    const websiteSchema = {
      "@context": "httpsschema.org",
      "@type": "WebSite",
      "@id": "https://neuralscript.tech/#website",
      url: "https://neuralscript.tech/",
      name: "Neural Script",
      publisher: {
        "@id": "https://neuralscript.tech/#organization",
      },
    };

    // Fix the Website schema context URL (typo)
    websiteSchema["@context"] = "https://schema.org";

    // Add Organization script
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    // Add Website script
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(websiteScript);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(orgScript);
      document.head.removeChild(websiteScript);
    };
  }, []);

  return null;
}