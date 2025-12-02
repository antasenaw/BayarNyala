"use server"
// import "server-only"
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { getUserById } from "./fetchUser";

export async function getUserIdFromSession() {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session) return null;
  
  const userId = session.id

  return userId as string;
}

export async function getUserbyIdHandler() {
  const userId = await getUserIdFromSession();
  if (!userId) return null;

  const user = await getUserById(userId);
  if (!user) return null;
  
  return user;
}

export async function getUserName() {
  const user = await getUserbyIdHandler();
  if (!user) return null;
  return user.user?.nama;
}

export async function getUserRole() {
  const user = await getUserbyIdHandler();
  if (!user) return null;
  return user.user?.role;
}

