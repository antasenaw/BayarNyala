"use client"

import { deleteSession } from "@/lib/session"


const LogoutButton = () => {
  return (
    <button onClick={deleteSession} className="py-2 px-4 bg-blue-600 rounded-2xl  cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out border border-gray-400 text-white font-semibold">Logout</button>
  )
}

export default LogoutButton