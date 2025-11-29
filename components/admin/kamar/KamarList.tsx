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
    <div className="rounded-2xl border border-gray-400 text-gray-600 shadow-xl">
      <div className={`text-center text-white font-semibold flex p-3 border border-gray-400 bg-blue-400 rounded-2xl m-2 ${kamarList.length === 0 || 'mb-0'} shadow-xl`}>
        <p className="text-gray-300 basis-0 grow-[0.1]">No</p>
        <p className="basis-0 grow">Nomor kamar</p>
        <p className="basis-0 grow">Status kamar</p>
        <p className="basis-0 grow">Harga sewa</p>
        <p className="basis-0 grow">Aksi</p>
      </div>
      <div className="max-h-[44.55rem] overflow-y-auto rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {kamarList.map((kamar: IKamar, i: number) => {
          return (
            <div key={String(kamar._id)} className="text-center flex p-3 border border-gray-400 m-2 shadow-lg rounded-2xl">
              <p className="text-gray-400 basis-0 grow-[0.1]">{i+1}</p>
              <p className="basis-0 grow">{kamar.nomor_unit}</p>
              <p className="basis-0 grow">{kamar.status_ketersediaan ? 'Tersedia' : 'Terisi'}</p>
              <p className="basis-0 grow">{formatToRupiah(kamar.harga_sewa)}</p>
              <div className="basis-0 grow justify-center flex gap-8">
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
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default KamarList