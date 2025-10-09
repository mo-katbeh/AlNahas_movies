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
// export const getUserSession = async () => {
//   const { data, error } = await authClient.getSession();
//   if (!error) return data;
//   throw error;
// };
export const getUserSession = async () => {
  const { data: session, error } = await authClient.getSession();
  if (!error){
    return {session, isAuthenticated: !!session};}
  console.log("error in authClient", error)
  throw error;
};