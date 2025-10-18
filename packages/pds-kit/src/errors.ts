export class RpcError extends Error {
  constructor(message: string, public code = "RPC_ERROR", public status = 400) {
    super(message);
  }
}

export class NotFoundError extends RpcError {
  constructor(message = "Not Found") {
    super(message, "NOT_FOUND", 404);
  }
}

export class ValidationError extends RpcError {
  constructor(message = "Invalid input") {
    super(message, "INVALID_INPUT", 422);
  }
}
