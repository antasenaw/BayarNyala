"use server"
// import "server-only"
import { cookies } from "next/headers";
import { decrypt } from "./session";

export default async function getUserIdFromSession() {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session) return null;

  const { buffer } = await session.id;
  const byteValues = Object.values(buffer);
  const idBuffer = Buffer.from(byteValues);
  const userId = idBuffer.toString('hex');

  return userId;
}  
