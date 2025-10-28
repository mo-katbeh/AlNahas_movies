import { z } from "zod"

export const signUpSchema =  z.object({
    userName: z.string().min(3, {error: "Name must be more than 3 characters"}),
    email: z.email({error: "This email not valid"}),
    password: z.string().min(8, {error: "Password must be at least 8 characters"}), 
    confirmPassword: z.string().min(8, {error: "Password must be at least 8 characters"}), 
}).superRefine(({ password, confirmPassword}, ctx)=>{
    if(confirmPassword !== password){
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        })
    }
})

export const loginSchema = z.object({
    email: z.email({error: "This email not valid"}),
    password: z.string().min(8, {error: "Password must be at least 8 characters"}), 
    
})

export type LoginSchema = z.infer<typeof loginSchema>
export type SignUpSchema = z.infer<typeof signUpSchema>