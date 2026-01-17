import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  noindex?: boolean
}

export default function SEO({
  title = "Mediterranean Shipping Express - Global Logistics Platform",
  description = "Track your shipments globally with real-time updates. Mediterranean Shipping Express offers ocean freight, intermodal transport, warehousing, and supply chain solutions worldwide.",
  keywords = "shipping, logistics, ocean freight, container shipping, supply chain, warehousing, intermodal transport, Mediterranean shipping, global logistics, cargo tracking",
  canonical,
  ogImage = "/mse-logo.png",
  ogType = "website",
  noindex = false
}: SEOProps) {
  const fullTitle = title.includes("Mediterranean Shipping Express") 
    ? title 
    : `${title} | Mediterranean Shipping Express`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`https://mediterraneanshippingexpress.com${ogImage}`} />
      <meta property="og:site_name" content="Mediterranean Shipping Express" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://mediterraneanshippingexpress.com${ogImage}`} />
      <meta name="twitter:creator" content="@MSEShipping" />
      
      {/* Additional SEO */}
      <meta name="author" content="Mediterranean Shipping Express" />
      <meta name="publisher" content="Mediterranean Shipping Express" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Head>
  )
}