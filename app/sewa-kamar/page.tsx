import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/penyewa/Navbar";
import SewaKamarForm from "@/components/penyewa/sewa-kamar/SewaKamarForm";
import { getKamar } from "@/lib/fetchKamar";
import { getUserIdFromSession, getUserName } from "@/lib/getUser"
import { formatToRupiah } from "@/utils/formatToRupiah";

const page = async () => {
  const user_id = await getUserIdFromSession();
  const userName = await getUserName();
  const kamarList = await getKamar();

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
                {kamarList.map(kamar => {
                  return (
                    <li key={String(kamar._id)} className="border shadow-lg transition-all duration-300 ease-in-out border-gray-400 self-start rounded-2xl p-4 flex flex-col">
                      <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                        <h3 className="font-bold text-3xl">Kamar {kamar.nomor_unit}</h3>
                        {
                          kamar.status_ketersediaan ?
                          <p className="py-2 px-4 bg-green-100 rounded-2xl text-green-500 font-semibold border border-green-300">Tersedia</p> :
                          <p className="py-2 px-4 bg-red-100 rounded-2xl text-red-500 font-semibold border border-red-300">Terisi</p>
                        }
                      </div>
                      <p className="mt-4 text-gray-400">Harga sewa :</p>
                      <p className="font-bold text-blue-600 text-4xl">{formatToRupiah(kamar.harga_sewa)}<span className="text-[1rem] font-normal text-gray-400">/bulan</span></p>
                      <p className="mt-4 text-gray-400">Pemilik :</p>
                      <p className="font-semibold text-gray-500">{Object(kamar.managed_by).nama}</p>
                      <SewaKamarForm
                        nomor_unit={kamar.nomor_unit}
                        pemilik={Object(kamar.managed_by).nama}
                        penyewa_id={String(user_id)}
                        kamar_id={String(kamar._id)}
                      />
                    </li>
                  );
                })}
              </div>
            </ul>
          </section>
      </main>
    </div>
  )
}

export default page