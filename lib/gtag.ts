export const GA_ID = 'G-PZG0MNKW36'

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void
  }
}

export function pageview(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', GA_ID, { page_path: url })
}

export function event(action: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, params)
}
