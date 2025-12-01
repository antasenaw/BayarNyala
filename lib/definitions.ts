import * as z from 'zod';
 
export const SignupFormSchema = z.object({
  nama: z
    .string()
    .min(2, { error: 'Nama harus memiliki setidaknya 2 karakter.' })
    .trim(),
  email: z.email({ error: 'Masukkan email yang valid.' }).trim(),
  password: z
    .string()
    .min(8, { error: 'Memiliki setidaknya 8 karakter' })
    .regex(/[a-zA-Z]/, { error: 'Memiliki setidaknya 1 huruf.' })
    .regex(/[0-9]/, { error: 'Memiliki setidaknya 1 angka.' })
    .trim(),
  role: z
    .string()
    .trim(),
})
 
export type SignupFormState =
  | {
      errors?: {
        nama?: string[]
        email?: string[]
        password?: string[]
        role?: string[]
      }
      message?: string
    }
  | undefined

export const LoginFormSchema = z.object({
  email: z
    .email({ error: 'Masukkan email yang valid.' })
    .trim(),
  password: z
    .string()
    .nonempty({error: 'Masukkan password anda'})
    .trim(),
})
 
export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
  id: string
  role: string,
  expiresAt: Date,
}