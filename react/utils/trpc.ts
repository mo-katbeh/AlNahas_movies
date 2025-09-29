import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../server/src/trpc/routers/mainRouter';

export const trpc = createTRPCReact<AppRouter>();
// export const utils = trpc.useUtils();
// export const getUserSession = async ()=>{
//     return await trpc.auth.getSession.useQuery()
// }