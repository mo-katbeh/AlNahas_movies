import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../server/src/trpc/mainRouter';

export const trpc = createTRPCReact<AppRouter>();
