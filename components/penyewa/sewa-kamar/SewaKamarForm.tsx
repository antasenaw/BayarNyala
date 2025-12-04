"use client";

import { sewa } from "@/actions/sewa";
import { useRef, useState } from "react";

const SewaKamarForm = ({ nomor_unit, pemilik, penyewa_id, kamar_id }: { nomor_unit: string, pemilik: string, penyewa_id: string, kamar_id: string }) => {
  const [formDisplay, setFormDisplay] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <button onClick={() => setFormDisplay(!formDisplay)} className="mt-4 cursor-pointer bg-blue-600 py-2 px-4 rounded-2xl font-semibold text-white border border-gray-400 hover:scale-102 active:scale-98 transition-all duration-300 ease-in-out">Sewa</button>
      {
        formDisplay &&
        <>
          <div ref={overlayRef} className="backdrop-blur-xs absolute inset-0 flex justify-center items-center" onClick={e => e.target === overlayRef.current && setFormDisplay(!formDisplay)}>
            <form action={sewa} className="bg-white text-gray-700 p-6 rounded-2xl min-w-xl shadow-2xl border border-gray-300">
              <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-2xl">Sewa kamar {nomor_unit}</h3>
                <h4 className="text-gray-400">Pemilik: <span className="font-semibold">{pemilik}</span></h4>
              </div>
                <button onClick={() => setFormDisplay(!formDisplay)} className="hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out text-white bg-blue-600 p-2 px-4 rounded-2xl font-semibold border border-gray-400 shadow-lg cursor-pointer">Tutup</button>
              </div>
              <fieldset className="p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nomor_hp" className="text-gray-500">Nomor telepon</label>
                  <input
                    type="text"
                    id="nomor_hp"
                    name="nomor_hp"
                    className="border border-gray-400 p-3 shadow-lg rounded-2xl"
                    placeholder="Masukkan nomor telepon"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="alamat" className="text-gray-500">Alamat</label>
                  <input
                    type="text"
                    id="alamat"
                    name="alamat"
                    className="border border-gray-400 p-3 shadow-lg rounded-2xl"
                    placeholder="Masukkan alamat"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="tanggal_mulai" className="text-gray-500">Tanggal mulai</label>
                  <input
                    type="date"
                    id="tanggal_mulai"
                    name="tanggal_mulai"
                    className="border text-gray-400 border-gray-400 p-3 shadow-lg rounded-2xl"
                    placeholder=""
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="tanggal_selesai" className="text-gray-500">Lama sewa (bulan)</label>
                  <input
                    type="number"
                    id="tanggal_selesai"
                    name="tanggal_selesai"
                    className="border border-gray-400 p-3 shadow-lg rounded-2xl"
                    placeholder="Masukkan lama sewa dalam bulan"
                    required
                  />
                </div>
                <label htmlFor="penyewa_id"></label>
                <input type="hidden" name="penyewa_id" id="penyewa_id" hidden readOnly value={penyewa_id} />
                <label htmlFor="kamar_id"></label>
                <input type="hidden" name="kamar_id" id="kamar_id" hidden readOnly value={kamar_id} />
                <button
                  type="submit"
                  className="hover:scale-102 active:scale-100 transition-all duration-300 ease-in-out bg-blue-600 text-white font-semibold p-3 mt-4 border cursor-pointer shadow-lg border-gray-400 rounded-2xl"
                >
                  Sewa kamar
                </button>
              </fieldset>
            </form>
          </div>
        </>
      }
    </>
  );
};

export default SewaKamarForm;