import {createAuthClient} from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000/api/auth",
    fetchOptions: {
      credentials: "include"
    },
    plugins: [
      adminClient()
    ]

})
export const getUserSession = async () => {
  const { data, error } = await authClient.getSession();
  if (!error) return data;
  throw error;
};
// const getUserSession = async () => {
//   const { data: session, error } = await authClient.getSession();
//   if (!error){
//     if(!session) throw new Error("User is not authenticated!")
//     return {session, isAuthenticated: !!session};}
//   console.log("error in authClient", error)
//   throw error;
// };