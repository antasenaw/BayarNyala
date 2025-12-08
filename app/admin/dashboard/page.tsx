import KamarStatus from "@/components/admin/dashboard/KamarStatus"
import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/admin/Navbar"
import { getPembayaran } from "@/lib/fetchPembayaran"
import { getUserName } from "@/lib/getUser"
import { formatToRupiah } from "@/utils/formatToRupiah"
import { isoDateConvert } from "@/utils/isoDateConvert"

const page = async () => {
  const userName = await getUserName();
  const pembayaranList = await getPembayaran();
  // console.log(pembayaranList)

  return (
    <div className="h-full w-full bg-white flex flex-col gap-8">
    <div className="flex items-center gap-4 mt-4 mx-4">
      <Navbar />
      <div className="flex gap-4 items-center border py-2 px-4 rounded-2xl border-gray-300 shadow-lg">
        <p>{userName}</p>
        <LogoutButton/>
      </div>
    </div>
      <main className="flex flex-col grow mx-8 gap-8">
        <section className="flex gap-8 max-md:flex-col">
          <KamarStatus />
          <div className="basis-0 grow flex flex-col min-h-full">
            <h3 className="mb-4 font-bold text-blue-600 text-xl">Pembayaran terbaru</h3>
            <ul className="text-gray-600 rounded-2xl flex flex-col basis-0 grow gap-4 border p-3 border-gray-400 overflow-y-auto shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {pembayaranList.map(pembayaran => {
                return (
                    <li key={String(pembayaran._id)} className="flex items-center justify-between p-2 px-4 border border-gray-300 shadow-lg rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-yellow-500 bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>
                      <div className="flex flex-col items-center">
                        <p className="">{Object(pembayaran.payer_id).nama}</p>
                        <p className="text-gray-400 text-sm">{isoDateConvert(pembayaran.created_at)}</p>
                      </div>
                      {pembayaran.status_verifikasi ?
                        <p className="text-green-500 border py-1 rounded-2xl bg-green-100 px-2 border-green-300 font-semibold text-sm">Sudah diverifikasi</p> :
                        <p className="text-red-500 border py-1 rounded-2xl bg-red-100 px-2 border-red-300 font-semibold text-sm">Belum diverifikasi</p>
                      }
                      <p className="text-blue-600 font-semibold">{formatToRupiah(pembayaran.jumlah_bayar)}</p>
                    </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page