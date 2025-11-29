"use server";

import { FormState, SignupFormSchema } from "@/lib/definitions";
import connectDB from "@/lib/mongodb";
import { createSession } from "@/lib/session";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const loginAction = async (state: FormState | undefined , formData: FormData) => {
  
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data;

  await connectDB();

  const user = await User.findOne({ email: email}).select('+password_hash');

  if (!user) {
    return {
      errors: {
        email: ["Email tidak terdaftar"],
      },
    };
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isPasswordValid) {
    return {
      errors: {
        password: ["Password salah"],
      },
    };
  }
  
  createSession(user.nama, user.role);
  redirect('/admin/dashboard');
  
    return {
      message: "Login berhasil",
    };
};