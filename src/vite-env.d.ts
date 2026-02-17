/// <reference types="vite/client" />

declare module '*.css' {
  const href: string
  export default href
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
