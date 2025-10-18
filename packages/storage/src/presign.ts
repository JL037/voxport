import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageDriver, PresignGetInput, PresignPutInput, PresignResult } from "./types";
import { createS3Client, type S3ClientOptions } from "./s3Client";

export function createS3Driver(opts: S3ClientOptions & { bucket: string }): StorageDriver {
  const s3 = createS3Client(opts);
  const bucket = opts.bucket;

  return {
    async presignPut({ key, contentType, expiresSec = 900 }: PresignPutInput): Promise<PresignResult> {
      const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
      const url = await getSignedUrl(s3, cmd, { expiresIn: expiresSec });
      return { url };
    },
    async presignGet({ key, expiresSec = 900 }: PresignGetInput): Promise<PresignResult> {
      const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
      const url = await getSignedUrl(s3, cmd, { expiresIn: expiresSec });
      return { url };
    }
  };
}
