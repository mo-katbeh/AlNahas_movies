// import { useQuery } from "@tanstack/react-query"
// import { getUserSession } from "../../utils/trpc"

// export const useAuthentication =()=>{
//      const { data: userSession } = useQuery(["auth", "getSession"], getUserSession, {
//     staleTime: 5000,
//   });

//   return { userSession, isAuthenticated: !!userSession };
// }