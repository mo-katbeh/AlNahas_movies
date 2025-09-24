import {z} from "zod"

export const signUpSchema =  z.object({
    userName: z.string().min(3, {error: "Name must be more than 3 characters"}),
    email: z.email({error: "This email not valid"}),
    password: z.string().min(8, {error: "Password must be at least 8 characters"}), //refine
    confirmPassword: z.string(),
})

export type SignUpSchema = z.infer<typeof signUpSchema>