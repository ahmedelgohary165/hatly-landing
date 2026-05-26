/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPERATOR_PASSWORD?: string;
  readonly VITE_OPERATOR_ENTRY_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
