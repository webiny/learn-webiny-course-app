// Type definitions for import.meta.glob
// This enables TypeScript support for Vite/Next.js glob imports

interface ImportMeta {
  glob<T = any>(
    pattern: string,
    options?: {
      eager?: boolean
      import?: string
      query?: string | Record<string, string | number | boolean>
      as?: string
    }
  ): Record<string, () => Promise<T>>
}

