import KamarStatus from "@/components/admin/dashboard/KamarStatus"
import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/admin/Navbar"

const page = () => {
  return (
    <div className="h-full w-full bg-white flex">
      <Navbar />
      <main className="flex flex-col grow">
        <div className="p-8 flex items-center justify-between">
          <h2 className="font-extrabold text-2xl text-blue-800">Dashboard</h2>
          <LogoutButton></LogoutButton>
        </div>
        <section className="flex mx-8 gap-8 mb-8 flex-wrap">
          <KamarStatus />
          <div className="basis-0 grow">
            <h3 className="mb-4 font-bold text-blue-600 text-xl">Pembayaran terbaru</h3>
            <div className="text-gray-600 rounded-2xl flex flex-col gap-4 max-h-[11.3375rem] border p-3 border-gray-400 overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center justify-between p-2 px-4 border border-gray-300 shadow-lg rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500 bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>
                <div>
                  <p className="">Yusuf</p>
                  <p className="text-gray-400 text-sm">28 January 2025</p>
                </div>
                <p className="text-green-400 font-semibold">+Rp. 500,000</p>
              </div>
              <div className="flex items-center justify-between p-2 px-4 border border-gray-300 shadow-lg rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500 bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>
                <div>
                  <p>Yusuf</p>
                  <p className="text-gray-400 text-sm">28 January 2025</p>
                </div>
                <p className="text-green-400 font-semibold">+Rp. 500,000</p>
              </div>
              <div className="flex items-center justify-between p-2 px-4 border border-gray-300 shadow-lg rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500 bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>
                <div>
                  <p>Yusuf</p>
                  <p className="text-gray-400 text-sm">28 January 2025</p>
                </div>
                <p className="text-green-400 font-semibold">+Rp. 500,000</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-8">
          <h3 className="font-bold text-blue-600 text-xl">Aktivitas bulanan</h3>
        </section>
      </main>
    </div>
  )
}

export default page