import Link from "next/link"

const page = () => {
  return (
    <main className="flex items-center justify-center h-full w-full bg-white">
      <section className="bg-white text-black p-6 rounded-2xl min-w-xl shadow-2xl border border-gray-300">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Masuk</h1>
          <Link href='/signup' className="text-blue-600 hover:underline">Saya tidak memiliki akun</Link>
        </div>
        <form className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-600">Alamat email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="border border-gray-400 p-3 shadow-xl rounded-2xl"
              placeholder="Masukkan email"
            />
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
          </div>
          <button type="submit" id="submit" name="submit" className="bg-blue-800 text-white font-semibold p-3 mt-4 cursor-pointer shadow-xl rounded-2xl">Masuk</button>
        </form>
      </section>
    </main>
  )
}

export default page