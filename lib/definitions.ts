import * as z from 'zod'
 
export const SignupFormSchema = z.object({
  email: z.email({ error: 'Masukkan email yang valid.' }).trim(),
  password: z
    .string()
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

  export type SessionPayload = {
    nama: string
    role: string
    expiresAt: Date
  }