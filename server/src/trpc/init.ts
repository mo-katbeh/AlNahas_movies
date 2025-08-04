import { initTRPC } from '@trpc/server';
import type { Context } from '../context';

// Initialize tRPC with context type
const t = initTRPC.context<Context>().create();

// Export base router and procedures
export const router = t.router;
export const publicProcedure = t.procedure;