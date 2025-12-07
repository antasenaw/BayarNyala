import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/admin/Navbar"
import { getSewa } from "@/lib/fetchSewa"
import { getUserName } from "@/lib/getUser"
import { isoDateConvert } from "@/utils/isoDateConvert"

const page = async () => {
  const userName = await getUserName();
  const sewaList = await getSewa();
  console.log(sewaList);

  return (
    <div className="h-screen max-h-screen w-full relative bg-white flex flex-col p-4 pb-8">
      <div className="shrink-0 flex items-center gap-4">
        <Navbar />
        <div className="flex gap-4 items-center border py-2 px-4 rounded-2xl border-gray-300 shadow-lg">
          <p className="">{userName}</p>
          <LogoutButton/>
        </div>
      </div>
      <main className="flex-1 flex flex-col mt-8 mx-4 min-h-0">
          <section className="flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="flex shrink-0 border bg-blue-600 border-gray-400 rounded-2xl p-3 shadow-xl justify-between">
              <input type="text" className="border border-gray-400 bg-white p-2 px-4 rounded-2xl shadow-lg" placeholder="Cari kamar" />
            </div>
            <ul className="flex-1 overflow-y-auto mt-4 border border-gray-400 rounded-2xl p-4">
              <div className={`${sewaList.length === 0 ? '' : 'grid grid-cols-3 gap-4'}`}>
                {sewaList.length === 0 ? <p className="text-center text-gray-500">Belum ada penyewaan</p> : sewaList.map(async sewa => {
                  // console.log(Object(pembayaran.tagihan_id).kamar_id);
                  // const nomor_unit = await getKamarById(Object(pembayaran.tagihan_id).kamar_id)
                  // console.log(nomor_unit);
                  return (
                    <li key={String(sewa._id)} className="border shadow-lg transition-all duration-300 ease-in-out border-gray-400 self-start rounded-2xl p-4 flex flex-col">
                      <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                        <div>
                          <h3 className="font-bold text-2xl">Penyewaan: Kamar {Object(sewa.kamar_id).nomor_unit}</h3>
                          <h4 className="text-gray-400">Penyewa: <span className="text-gray-500 font-semibold">{Object(sewa.penyewa_id).nama}</span></h4>
                        </div>
                        {
                          sewa.status === 'aktif' ?
                          <p className="py-2 px-4 bg-green-100 rounded-2xl text-green-500 font-semibold border border-green-300">Aktif</p> :
                          sewa.status === 'menunggu pembayaran' ?
                          <p className="py-2 px-4 bg-red-100 rounded-2xl text-red-500 font-semibold border border-red-300">Menunggu pembayaran</p>:
                          <p className="py-2 px-4 bg-gray-100 rounded-2xl text-gray-500 font-semibold border border-gray-300">Selesai</p>
                        }
                      </div>
                      {/* <p className="mt-4 text-gray-400">Tanggal mulai :</p>
                      <p className="font-bold text-blue-600 text-4xl">{}</p> */}
                      <p className="mt-4 text-gray-400">Tanggal mulai :</p>
                      <p className="font-semibold text-gray-500">{isoDateConvert(sewa.tanggal_mulai)}</p>
                      <p className="mt-4 text-gray-400">Tanggal selesai :</p>
                      <p className="font-semibold text-gray-500">{isoDateConvert(sewa.tanggal_selesai)}</p>
                      {/* <div className="flex gap-4 items-center">
                        <button className="py-2 px-4 mt-4 basis-0 grow border border-gray-400 cursor-pointer bg-blue-600 rounded-2xl text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Verifikasi</button>
                        <button className="py-2 px-4 mt-4 basis-0 grow border border-blue-600 cursor-pointer bg-white rounded-2xl text-blue-600 font-semibold hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Tolak</button>
                      </div>                       */}
                    </li>
                  )
                })}
              </div>
            </ul>
          </section>
      </main>
    </div>
  )
}

export default page