"use client"

import { signup } from "@/actions/signup"
import Link from "next/link"
import { useActionState } from "react"

const Page = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <main className="flex items-center justify-center h-full w-full bg-white">
      <section className="bg-white text-black p-6 rounded-2xl min-w-xl shadow-2xl border border-gray-300">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Daftar</h1>
          <Link href='/login' className="text-blue-600 hover:underline">Saya sudah memiliki akun</Link>
        </div>
        <form action={action} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-500">Nama lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-400 p-3 shadow-xl rounded-2xl"
              placeholder="Masukkan nama lengkap"
            />
            {state?.errors?.nama && <p className="text-red-500">{state.errors.nama}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-500">Alamat email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="border border-gray-400 p-3 shadow-xl rounded-2xl"
              placeholder="Masukkan email"
            />
            {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-500">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              className="border border-gray-400 p-3 shadow-xl rounded-2xl"
              placeholder="Masukkan password"
            />
            {state?.errors?.password && (
              <div className="text-red-500">
                <p>Password harus:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <label className="text-gray-500">Daftar sebagai:</label>
          <div className="flex items-center gap-2 text-gray-600">
            <input
              type="radio" 
              name="role" 
              id="role"
              value="Penyewa"
              required
              defaultChecked
            />
            <label htmlFor="role">Penyewa kos</label>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <input
              type="radio" 
              name="role" 
              id="role"
              value="Admin"
              required
            />
            <label htmlFor="role">Pemilik kos</label>
          </div>
          <button type="submit" disabled={pending} className={`${pending ? 'bg-white text-blue-600 border-blue-600' : 'bg-blue-600 text-white border-gray-400'} border font-semibold p-3 mt-4 cursor-pointer shadow-xl rounded-2xl hover:scale-102 active:scale-98 transition-all duration-300 ease-in-out`}>{pending ? 'Loading...' : 'Daftar'}</button>
        </form>
      </section>
    </main>
  )
}

export default Page