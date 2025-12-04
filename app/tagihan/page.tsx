import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/penyewa/Navbar";
import { TagihanForm } from "@/components/penyewa/tagihan/TagihanForm";
import { getTagihan } from "@/lib/fetchTagihan";
import { getUserName } from "@/lib/getUser"
import { formatToRupiah } from "@/utils/formatToRupiah";
import { isoDateConvert } from "@/utils/isoDateConvert";

const page = async () => {
  const userName = await getUserName();
  const tagihanList = await getTagihan();
  // console.log(tagihanList);

  return (
    <div className="h-screen max-h-screen w-full bg-white flex flex-col p-4 pb-8">
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
              <div className=" grid grid-cols-4 gap-4">
                {tagihanList.map(tagihan => {
                  return (
                    <li key={String(tagihan._id)} className="border shadow-lg transition-all duration-300 ease-in-out border-gray-400 self-start rounded-2xl p-4 flex flex-col">
                      <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                        <h3 className="font-bold text-2xl">Tagihan: Kamar {Object(tagihan.kamar_id).nomor_unit}</h3>
                        {
                          tagihan.status_pembayaran === 'Lunas' ?
                          <p className="py-2 px-4 bg-green-100 rounded-2xl text-green-500 font-semibold border border-green-300">{tagihan.status_pembayaran}</p> :
                          <p className="py-2 px-4 bg-red-100 rounded-2xl text-red-500 font-semibold border border-red-300">{tagihan.status_pembayaran}</p>
                        }
                      </div>
                      <p className="mt-4 text-gray-400">Jumlah tagihan :</p>
                      <p className="font-bold text-blue-600 text-4xl">{formatToRupiah(tagihan.jumlah_tagihan)}</p>
                      <p className="mt-4 text-gray-400">Tenggat pembayaran :</p>
                      <p className="font-semibold text-red-500">{isoDateConvert(tagihan.tenggat_bayar)}</p>
                      <TagihanForm />
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