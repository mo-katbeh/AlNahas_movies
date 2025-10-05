import {createAuthClient} from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { trpc } from "./trpc"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000/api/auth",
    fetchOptions: {
      credentials: "include"
    },
    plugins: [
      adminClient()
    ]

})
export const useAuthentication =()=>{
 const {data: userSession} = trpc.auth.getUserSession.useQuery()
 return{ userSession, isAuthenticated: !!userSession}

}
export const useAuthenticatedUser = () => {
  const { userSession } = useAuthentication()

  if (!userSession) {
    throw new Error("User is not authenticated!")
  }

  return userSession
}