
export function createContext() {
  return {}; // optionally pass DB instance or user info here
}
export type Context = ReturnType<typeof createContext>;