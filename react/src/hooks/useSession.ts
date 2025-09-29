import { trpc } from "../../utils/trpc";

export function useSession(){
    const {data: session, isLoading} =trpc.auth.getSession.useQuery()
    return { session, isLoading}
}