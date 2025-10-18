export type RpcParams = Record<string, unknown>;
export type RpcInput = unknown;
export type RpcResult = unknown;

export type RpcHandler = (params: RpcParams, input?: RpcInput) => Promise<RpcResult>;

export type RpcRoute = {
  nsid: string;   // e.g. "app.voxport.series.create"
  handler: RpcHandler;
};
