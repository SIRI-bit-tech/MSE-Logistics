export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mediterranean Shipping Express",
  "alternateName": "MSE",
  "url": "https://mediterraneanshippingexpress.com",
  "logo": "https://mediterraneanshippingexpress.com/mse-logo.png",
  "description": "Global logistics and shipping company offering ocean freight, intermodal transport, warehousing, and supply chain solutions worldwide.",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-555-0199",
    "contactType": "customer service",
    "email": "support@mse.com",
    "availableLanguage": ["English"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressRegion": "Global"
  },
  "sameAs": [
    "https://www.linkedin.com/company/mediterranean-shipping-express",
    "https://twitter.com/MSEShipping",
    "https://www.facebook.com/MSEShipping"
  ],
  "serviceArea": {
    "@type": "Place",
    "name": "Worldwide"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Shipping and Logistics Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ocean Freight",
          "description": "Full container load (FCL) and less than container load (LCL) ocean freight services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Intermodal Transport",
          "description": "Seamless multi-modal transportation combining ocean, rail, and road transport"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Warehousing",
          "description": "Secure storage and distribution services with inventory management"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Supply Chain Management",
          "description": "End-to-end supply chain optimization and management solutions"
        }
      }
    ]
  }
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mediterranean Shipping Express",
  "url": "https://mediterraneanshippingexpress.com",
  "description": "Global logistics and shipping platform with real-time tracking",
  "publisher": {
    "@type": "Organization",
    "name": "Mediterranean Shipping Express"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://mediterraneanshippingexpress.com/track?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export const breadcrumbStructuredData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})