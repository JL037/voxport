export type PresignPutInput = {
  key: string;
  contentType: string;
  expiresSec?: number; // default 900
};

export type PresignGetInput = {
  key: string;
  expiresSec?: number; // default 900
};

export type PresignResult = { url: string; fields?: Record<string, string> };

export interface StorageDriver {
  presignPut(input: PresignPutInput): Promise<PresignResult>;
  presignGet(input: PresignGetInput): Promise<PresignResult>;
}
