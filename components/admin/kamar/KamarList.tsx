import { IKamar, IKamarInput } from "@/models/Kamar";
import { APIResponse } from "@/lib/fetchKamar";
import DeleteKamarButton from "./buttons/DeleteKamarButton";
import EditKamarButton from "./buttons/EditKamarButton";
import { formatToRupiah } from "@/utils/formatToRupiah";

const KamarList = ({
  kamarList,
  deleteKamarHandler,
  getKamarByIdHandler,
  editKamarHandler
} : {
  kamarList: IKamar[],
  deleteKamarHandler: (kamarId: string) => Promise<APIResponse>,
  getKamarByIdHandler: (kamarId: string) => Promise<APIResponse>,
  editKamarHandler: ({ kamarId, updateData }: { kamarId: string, updateData: IKamarInput }) => Promise<APIResponse>
}) => {
  return (
    <ul className="flex-1 overflow-y-auto mt-4 border border-gray-400 rounded-2xl p-4">
      <div className=" grid grid-cols-4 gap-4">
        {kamarList.map(kamar => {
          return (
            <li key={String(kamar._id)} className="border shadow-lg transition-all duration-300 ease-in-out border-gray-400 self-start rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between items-center border-b border-gray-400 pb-4">
                <h3 className="font-bold text-3xl">{kamar.nomor_unit}</h3>
                {
                  kamar.status_ketersediaan ?
                  <p className="py-2 px-4 bg-green-100 rounded-2xl text-green-500 font-semibold border border-green-300">Tersedia</p> :
                  <p className="py-2 px-4 bg-red-100 rounded-2xl text-red-500 font-semibold border border-red-300">Terisi</p>
                }
              </div>
              <p className="mt-4 text-gray-400">Harga sewa :</p>
              <p className="font-bold text-blue-600 text-4xl">{formatToRupiah(kamar.harga_sewa)}<span className="text-[1rem] font-normal text-gray-400">/bulan</span></p>
              {/* <p className="mt-4 text-gray-400">Pemilik :</p>
              <p className="font-semibold text-gray-500">{Object(kamar.managed_by).nama}</p> */}
              {/* <button className="mt-4 cursor-pointer bg-blue-600 py-2 px-4 rounded-2xl font-semibold text-white border border-gray-400 hover:scale-102 active:scale-98 transition-all duration-300 ease-in-out">Sewa</button> */}
            <div className="flex mt-4 gap-4">
              <EditKamarButton
                  kamarId={String(kamar._id)}
                  getKamarByIdHandler={getKamarByIdHandler}
                  editKamarHandler={editKamarHandler}
                />
                <DeleteKamarButton 
                  kamarId={String(kamar._id)}
                  deleteKamarHandler={deleteKamarHandler}
                />
            </div>
            </li>
          );
        })}
        
      </div>
    </ul>
  )
}

export default KamarList