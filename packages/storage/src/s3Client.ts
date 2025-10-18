import { S3Client } from "@aws-sdk/client-s3";

export type S3ClientOptions = {
  region: string;
  endpoint?: string;            // Cloudflare R2 -> https://<accountid>.r2.cloudflarestorage.com
  forcePathStyle?: boolean;     // R2 requires true
  credentials?: { accessKeyId: string; secretAccessKey: string };
};

export const createS3Client = (opts: S3ClientOptions) =>
  new S3Client({
    region: opts.region,
    endpoint: opts.endpoint,
    forcePathStyle: opts.forcePathStyle ?? !!opts.endpoint,
    credentials: opts.credentials
  });
