
import BuktiButton from "@/components/admin/pembayaran/BuktiButton";
import VerifikasiButton from "@/components/admin/pembayaran/VerifikasiButton";
import { getKamarById } from "@/lib/fetchKamar";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { isoDateConvert } from "@/utils/isoDateConvert";

import { getPembayaran } from "@/lib/fetchPembayaran";

const PembayaranList = async () => {
  const pembayaranList = await getPembayaran();

  return (
    <>

    <div className={`${pembayaranList.length === 0 ? '' : 'grid grid-cols-3 gap-4'}`}>
      {pembayaranList.length === 0 ? <p className="text-center text-gray-500">Belum ada pembayaran</p> : pembayaranList.map(async pembayaran => {
        // console.log(Object(pembayaran.tagihan_id).kamar_id);
        const nomor_unit = await getKamarById(Object(pembayaran.tagihan_id).kamar_id)
        // console.log(nomor_unit);
        return (
          <li key={String(pembayaran._id)} className="border shadow-lg h-full transition-all duration-300 ease-in-out border-gray-400 self-start rounded-2xl p-4 flex flex-col">
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
            <p className="font-semibold text-blue-500">{isoDateConvert(pembayaran.created_at)}</p>
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
          {!pembayaran.status_verifikasi &&
            <VerifikasiButton
              pembayaranId={pembayaran._id.toString()}
              currentData={pembayaran}
              tagihanId={Object(pembayaran.tagihan_id)._id}
              kamarId={Object(pembayaran.tagihan_id).kamar_id}
            />                   
          }  
          </li>
        )
      })}
      </div>
    </>
  )
}

export default PembayaranList