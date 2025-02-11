/// <reference types="@rsbuild/core/types" />

declare const MINIO_URI: string

interface ImportMetaEnv {
    readonly MINIO_URI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
