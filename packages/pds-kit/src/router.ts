import type { RpcHandler, RpcRoute } from "./types";

export class RpcRouter {
  private routes = new Map<string, RpcHandler>();

  add(route: RpcRoute) {
    if (this.routes.has(route.nsid)) throw new Error(`Duplicate nsid: ${route.nsid}`);
    this.routes.set(route.nsid, route.handler);
    return this;
  }

  has(nsid: string) {
    return this.routes.has(nsid);
  }

  async handle(nsid: string, params: Record<string, unknown> = {}, input?: unknown) {
    const handler = this.routes.get(nsid);
    if (!handler) throw new Error(`No handler registered for ${nsid}`);
    return handler(params, input);
  }
}
