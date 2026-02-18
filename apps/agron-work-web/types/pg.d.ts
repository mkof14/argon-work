declare module "pg" {
  export class Pool {
    constructor(config?: unknown);
    query<T = { [key: string]: unknown }>(
      text: string,
      params?: unknown[]
    ): Promise<{ rows: T[] }>;
  }
}
