"use client"

import Image from "next/image";
import { useRef, useState } from "react";

const BuktiButton = ({
  nomor_unit,
  penyewa,
  imageUrl
} : {
  nomor_unit: string,
  penyewa: string,
  imageUrl: string
}) => {

  const [displayBukti, setDisplayBukti] = useState(false); 
  const overlayRef = useRef<HTMLDivElement | null>(null);
  return (
  <>
    <button onClick={() => setDisplayBukti(true)} className="font-semibold rounded-2xl text-blue-600 cursor-pointer hover:underline">
      Lihat bukti transfer
    </button>
    {
      displayBukti &&
      <div ref={overlayRef} className="backdrop-blur-xs absolute inset-0 flex justify-center items-center" onClick={e => {if (e.target === overlayRef.current) {setDisplayBukti(false);}}}>
        <div className="bg-white text-gray-700 p-6 rounded-2xl flex flex-col max-h-[calc(100vh-4rem)] my-4 min-w-xl max-w-xl shadow-2xl border border-gray-300">
          <div className="flex shrink-0 justify-between items-center">
            <div>
              <h3 className="font-bold text-2xl">Bukti pembayaran</h3>
              <h4 className="text-gray-400">Kamar yang disewa: <span className="font-semibold text-gray-500">{nomor_unit}</span></h4>
              <h4 className="text-gray-400">Penyewa: <span className="font-semibold text-gray-500">{penyewa}</span></h4>
            </div>
              <button onClick={() => {setDisplayBukti(false);}} className="hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out text-white bg-blue-600 p-2 px-4 rounded-2xl font-semibold border border-gray-400 shadow-lg cursor-pointer">Tutup</button>
          </div>
          <div className="border mt-4 grow overflow-y-auto border-gray-400 rounded-2xl">
              {/* CONTAINER KHUSUS UNTUK IMAGE: Relatif dan W-Full */}
              <div className="relative w-full h-auto"> 
                  <Image
                      src={imageUrl}
                      alt={`bukti pembayaran kamar ${nomor_unit} oleh ${penyewa}`}
                      // 💡 PERBAIKAN KRITIS 1: Hapus Width/Height TETAP 
                      // Jika Anda tidak menggunakan layout="fill" dan ingin gambar diskalakan di dalam container scroll, 
                      // Anda harus mengizinkannya mengambil dimensi aslinya.
                      // Jika Anda harus menyertakan width/height (karena Next.js 13+ mengharapkannya):
                      width={1920} // Tetapkan nilai aslinya
                      height={0} // Tetapkan nilai aslinya
                      
                      // 💡 PERBAIKAN KRITIS 2: Tambahkan CSS Scaling
                      // Class CSS ini MENDORONG gambar untuk tidak melebihi lebar containernya (w-full).
                      className="w-full h-auto object-contain" 
                  />
              </div>
          </div>
        </div>
      </div>
    }
  </>
  )
}

export default BuktiButton