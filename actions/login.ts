"use server"

import { LoginFormSchema, LoginFormState } from "@/lib/definitions";
import connectDB from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { IUser } from "@/models/User";

export async function login(state: LoginFormState, formData: FormData) {
  const inputForm = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedFields = LoginFormSchema.safeParse(inputForm)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {email, password} = validatedFields.data;

  await connectDB();

  const user: IUser = await User.findOne({email: email}).select('+password_hash');
  
  if (!user) return {
    errors: {
      email: ['Email tidak terdaftar.']
    },
  }

  const isPasswordValid = await bcrypt.compare (
    password,
    user.password_hash
  )

  if (!isPasswordValid) return {errors: {password: ['Password salah.']}}

  await createSession(String(user._id), user.role);
  if (user.role === 'Admin') {
    redirect('/admin/dashboard');
  } else {
    redirect('/dashboard')
  }
}