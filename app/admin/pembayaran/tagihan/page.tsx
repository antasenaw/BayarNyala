
import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/admin/Navbar"
import TagihanButton from "@/components/admin/pembayaran/TagihanButton";
import UserName from "@/components/admin/pembayaran/UserName";
import { getTagihan } from "@/lib/fetchTagihan";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { isoDateConvert } from "@/utils/isoDateConvert";

const Page = async () => {
  const tagihanList = await getTagihan();

  return (
    <div className="h-screen max-h-screen w-full relative bg-white flex flex-col p-4 pb-8">
      <div className="shrink-0 flex items-center gap-4">
        <Navbar />
        <div className="flex gap-4 items-center border py-2 px-4 rounded-2xl border-gray-300 shadow-lg">
          <UserName />
          <LogoutButton/>
        </div>
      </div>
      <main className="flex-1 flex flex-col mt-8 mx-4 min-h-0">
          <section className="flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="flex shrink-0 border bg-blue-600 border-gray-400 rounded-2xl p-3 shadow-xl justify-between">
              <input type="text" className="border border-gray-400 bg-white p-2 px-4 rounded-2xl shadow-lg" placeholder="Cari kamar" />
              <TagihanButton 
                tagihan={true}
              />
            </div>
            <ul className="flex-1 overflow-y-auto mt-4 border border-gray-400 rounded-2xl p-4">
              <div className={`${tagihanList.length === 0 ? '' : 'grid grid-cols-3 gap-4'}`}>
                {tagihanList.length === 0 ? <p className="text-center text-gray-500">Belum ada tagihan</p> : tagihanList.map(async tagihan => {
                  return (
                    <li key={String(tagihan._id)} className="border h-full shadow-lg transition-all duration-300 ease-in-out border-gray-400 self-start rounded-2xl p-4 flex flex-col">
                      <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                        <div>
                          <h3 className="font-bold text-2xl">Tagihan: Kamar {Object(tagihan.kamar_id).nomor_unit}</h3>
                          <h4 className="text-gray-400">Penyewa: <span className="text-gray-500 font-semibold">{Object(tagihan.penyewa_id).nama}</span></h4>
                        </div>
                        {
                          tagihan.status_pembayaran === 'Lunas' ?
                          <p className="py-2 px-4 bg-green-100 rounded-2xl text-green-500 font-semibold border border-green-300">{tagihan.status_pembayaran}</p> :
                          tagihan.status_pembayaran === 'Menunggu Verifikasi' ?
                          <p className="py-2 px-4 bg-blue-100 rounded-2xl text-blue-500 font-semibold border border-blue-300">{tagihan.status_pembayaran}</p> :
                          <p className="py-2 px-4 bg-red-100 rounded-2xl text-red-500 font-semibold border border-red-300">{tagihan.status_pembayaran}</p>
                        }
                      </div>
                      <p className="mt-4 text-gray-400">Jumlah tagihan :</p>
                      <p className="font-bold text-blue-600 text-4xl">{formatToRupiah(tagihan.jumlah_tagihan)}</p>
                      <p className="mt-4 text-gray-400">Tenggat pembayaran :</p>
                      <p className="font-semibold text-red-500">{isoDateConvert(tagihan.tenggat_bayar)}</p>
                      {/* {tagihan.status_pembayaran !== 'Belum Lunas' &&
                        <>
                          <p className="mt-4 text-gray-400">Dibayar pada :</p>
                          <p className="font-semibold text-blue-500">{isoDateConvert(tagihan.updated_at)}</p>
                        </>
                      } */}
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