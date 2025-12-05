"use client"

import { verifikasi } from "@/actions/verifikasi"
import { IRiwayatPembayaran } from "@/models/RiwayatPembayaran"

const VerifikasiButton = ({
  pembayaranId,
  currentData,
  tagihanId,
  kamarId
} : { 
  pembayaranId: string, 
  currentData: IRiwayatPembayaran 
  tagihanId: string,
  kamarId: string
}) => {

  return (
    <div className="flex gap-4 items-center">
      <button
        className="py-2 px-4 mt-4 basis-0 grow border border-gray-400 cursor-pointer bg-blue-600 rounded-2xl text-white font-semibold hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
        onClick={() => {
          verifikasi(pembayaranId, currentData, tagihanId, kamarId);
        }}
      >Verifikasi</button>
      <button className="py-2 px-4 mt-4 basis-0 grow border border-blue-600 cursor-pointer bg-white rounded-2xl text-blue-600 font-semibold hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Tolak</button>
    </div>   
  )
}

export default VerifikasiButton