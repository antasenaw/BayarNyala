
import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/admin/Navbar"
import BuktiButton from "@/components/admin/pembayaran/BuktiButton";
import VerifikasiButton from "@/components/admin/pembayaran/VerifikasiButton";
import { getKamarById } from "@/lib/fetchKamar";
import { getPembayaran } from "@/lib/fetchPembayaran";
import { getUserName } from "@/lib/getUser"
import { formatToRupiah } from "@/utils/formatToRupiah";
import { isoDateConvert } from "@/utils/isoDateConvert";

const Page = async () => {
  const userName = await getUserName();
  const pembayaranList = await getPembayaran();
  // console.log(pembayaranList)
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
              <div className=" grid grid-cols-3 gap-4">
                {pembayaranList.map(async pembayaran => {
                  // console.log(Object(pembayaran.tagihan_id).kamar_id);
                  const nomor_unit = await getKamarById(Object(pembayaran.tagihan_id).kamar_id)
                  // console.log(nomor_unit);
                  return (
                    <li key={String(pembayaran._id)} className="border shadow-lg transition-all duration-300 ease-in-out border-gray-400 self-start rounded-2xl p-4 flex flex-col">
                      <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                        <div>
                          <h3 className="font-bold text-2xl">Pembayaran: Kamar {nomor_unit.data?.nomor_unit}</h3>
                          <h4 className="text-gray-400">Penyewa: <span className="text-gray-500 font-semibold">{Object(pembayaran.payer_id).nama}</span></h4>
                        </div>
                        {
                          pembayaran.status_verifikasi ?
                          <p className="py-2 px-4 bg-green-100 rounded-2xl text-green-500 font-semibold border border-green-300">Sudah diverifikasi</p> :
                          <p className="py-2 px-4 bg-red-100 rounded-2xl text-red-500 font-semibold border border-red-300">Belum diverifikasi</p>
                        }
                      </div>
                      <p className="mt-4 text-gray-400">Jumlah dibayar :</p>
                      <p className="font-bold text-blue-600 text-4xl">{formatToRupiah(pembayaran.jumlah_bayar)}</p>
                      <p className="mt-4 text-gray-400">Tanggal dibayar :</p>
                      <p className="font-semibold text-gray-500">{isoDateConvert(pembayaran.created_at)}</p>
                      <p className="mt-4 text-gray-400">Metode pembayaran :</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold flex items-center gap-2 text-gray-500">{pembayaran.metode_pembayaran}</p>
                        {
                          pembayaran.metode_pembayaran === 'Transfer' &&
                          <BuktiButton 
                            nomor_unit={String(nomor_unit.data?.nomor_unit)}
                            penyewa={Object(pembayaran.payer_id).nama}
                            imageUrl={String(pembayaran.bukti_transfer_path)}
                          />
                        }
                      </div>
                      <VerifikasiButton
                        pembayaranId={pembayaran._id.toString()}
                        currentData={pembayaran}
                        tagihanId={Object(pembayaran.tagihan_id)._id}
                        kamarId={Object(pembayaran.tagihan_id).kamar_id}
                      />                   
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

export default Page