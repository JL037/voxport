// packages/pds-kit/src/index.ts
import { XrpcClient } from "@atproto/xrpc";
import { Lexicons } from "@atproto/lexicon";

const lex = new Lexicons(); // TODO: add VoxPort + com.atproto lexicons later

export function createClient(pdsUrl: string) {
  return new XrpcClient({ service: pdsUrl }, lex);
}

export type RpcHandler = (params: any, input: any) => Promise<any>;
