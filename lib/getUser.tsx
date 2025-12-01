"use server"
// import "server-only"
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { getUserById } from "./fetchUser";

export async function getUserIdFromSession() {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session) return null;

  // console.log(session);
  
  const userId = session.id

  // const { buffer } = await session.id;
  // const byteValues = Object.values(buffer);
  // const idBuffer = Buffer.from(byteValues);
  // const userId = idBuffer.toString('hex');

  return userId as string;
}

export async function getUser() {
  const userId = await getUserIdFromSession();
  if (!userId) return null;

  const user = await getUserById(userId);
  if (!user) return null;
  
  return user;
}

export async function getUserName() {
  const user = await getUser();
  if (!user) return null;
  return user.user?.nama;
}

