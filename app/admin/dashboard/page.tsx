import Navbar from "@/components/admin/Navbar"

const page = () => {
  return (
    <div className="h-full w-full bg-white flex">
      <Navbar />
      <main className="flex flex-col grow">
        <div className="p-8">
          <h2 className="font-extrabold text-2xl text-blue-800">Dashboard</h2>
        </div>
        <section className="grid grid-cols-2">
          <div className="p-8 pt-0 pr-0">
            <h3 className="mb-4 font-bold text-blue-800 text-xl">Status kamar</h3>
            <div className="text-gray-600 border border-gray-300 shadow-xl p-2 px-4 rounded-2xl">
              <p className="flex gap-2 items-center py-2 px-4 border-b border-b-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>14 Terisi</p>
              <p className="flex gap-2 items-center py-2 px-4 border-b border-b-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>7 Kosong</p>
              <p className="flex gap-2 items-center py-2 px-4 border-b border-b-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>10 Sudah bayar</p>
              <p className="flex gap-2 items-center py-2 px-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>4 Belum bayar</p>
            </div>
          </div>
          <div className="p-8 pt-0">
            <h3 className="mb-4 font-bold text-blue-800 text-xl">Pembayaran terbaru</h3>
            <div className="text-gray-600 rounded-2xl flex flex-col gap-4 max-h-45.5 border-b border-gray-300 overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-center justify-between p-2 px-4 border border-gray-300 shadow-lg rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500 bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>
                <div>
                  <p>Yusuf</p>
                  <p className="text-gray-400 text-sm">28 January 2025</p>
                </div>
                <p className="text-green-300 font-semibold">+Rp. 500,000</p>
              </div>
              <div className="flex items-center justify-between p-2 px-4 border border-gray-300 shadow-lg rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500 bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>
                <div>
                  <p>Yusuf</p>
                  <p className="text-gray-400 text-sm">28 January 2025</p>
                </div>
                <p className="text-green-300 font-semibold">+Rp. 500,000</p>
              </div>
              <div className="flex items-center justify-between p-2 px-4 border border-gray-300 shadow-lg rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500 bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>
                <div>
                  <p>Yusuf</p>
                  <p className="text-gray-400 text-sm">28 January 2025</p>
                </div>
                <p className="text-green-300 font-semibold">+Rp. 500,000</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-8">
          <h3 className="font-bold text-blue-800 text-xl">Aktivitas bulanan</h3>
        </section>
      </main>
    </div>
  )
}

export default page