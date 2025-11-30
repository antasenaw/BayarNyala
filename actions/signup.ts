"use server"

import { SignupFormSchema, SignupFormState } from "@/lib/definitions"
import { postUser } from "@/lib/fetchUser";
import { NewUserData } from "@/lib/fetchUser";
import { createSession } from "@/lib/session";

export async function signup (state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    nama: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const newUser: NewUserData = {
    ...validatedFields.data,
    role: 'Penyewa'
  }

  const response = await postUser(newUser);

  if (!response.user) {
    return {
        errors: {
          email: [response.Message],
        }
    }
  }
  
  await createSession(response.user.role);
}