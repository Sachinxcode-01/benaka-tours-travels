export function assertNever(x: never): never {
  throw new Error(`Unexpected value encountered: ${JSON.stringify(x)}`);
}
