"use server"

import { SignupFormSchema, SignupFormState } from "@/lib/definitions"
import { postUser } from "@/lib/fetchUser";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signup (state: SignupFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    nama: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role')
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const response = await postUser(validatedFields.data);

  if (!response.user) {
    return {
        errors: {
          email: [response.Message],
        }
    }
  }
  
  await createSession(String(response.user._id), response.user.role);
  redirect('/dashboard');
}