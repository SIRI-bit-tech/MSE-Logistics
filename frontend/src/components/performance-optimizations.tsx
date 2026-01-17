'use client'

import { useEffect } from 'react'

export default function PerformanceOptimizations() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical images only if they exist
      const logoLink = document.createElement('link')
      logoLink.rel = 'preload'
      logoLink.href = '/mse-logo.png'
      logoLink.as = 'image'
      document.head.appendChild(logoLink)
    }

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      // Intersection Observer for images
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement
              if (img.dataset.src) {
                img.src = img.dataset.src
                img.classList.remove('lazy')
                imageObserver.unobserve(img)
              }
            }
          })
        })

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach((img) => {
          imageObserver.observe(img)
        })
      }
    }

    // Service Worker registration for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        try {
          await navigator.serviceWorker.register('/sw.js')
        } catch (error) {
          // Service worker registration failed, continue without it
        }
      }
    }

    preloadCriticalResources()
    lazyLoadResources()
    registerServiceWorker()

    // Cleanup
    return () => {
      // Cleanup observers if needed
    }
  }, [])

  return null
}