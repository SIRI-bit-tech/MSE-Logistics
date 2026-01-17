import Script from 'next/script'

interface StructuredDataProps {
  data: object
  id?: string
}

// Hardened JSON serialization that escapes HTML-unsafe characters
function safeJsonStringify(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/'/g, '\\u0027')
}

export default function StructuredData({ data, id = 'structured-data-default' }: StructuredDataProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonStringify(data)
      }}
    />
  )
}