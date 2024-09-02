/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_PORT: number;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
