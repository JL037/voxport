import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = "auto"; // R2 uses `auto`
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID ?? "";
const BUCKET = process.env.R2_BUCKET ?? "";
const ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

export const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? ""
  }
});

export async function presignPut(key: string, contentType = "audio/mpeg") {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return { url, key }; 
}
