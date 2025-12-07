"use client"
import { batalSewa } from "@/actions/batalSewa";
import { bayar } from "@/actions/bayar";
import { useRef, useState } from "react";

export function TagihanForm ({
  tagihan_id,
  payer_id,
  jumlah_bayar,
  verified_by,
  kamar_id
} : {
  tagihan_id: string;
  payer_id: string;
  jumlah_bayar: number;
  verified_by: string;
  kamar_id: string;
}) {
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [displayBatalSewa, setDisplayBatalSewa] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  
  return (
    <>
      <button onClick={() => setFormIsVisible(true)} className="mt-4 cursor-pointer py-2 px-4 bg-blue-600 font-semibold text-white rounded-2xl hover:scale-102 active:scale-98 transition-all duration-300 ease-in-out">Bayar tagihan</button>
      <button onClick={() => setDisplayBatalSewa(true)} className="mt-4 cursor-pointer py-2 px-4 bg-white font-semibold text-blue-600 border border-blue-600 rounded-2xl hover:scale-102 active:scale-98 transition-all duration-300 ease-in-out">Batal sewa</button>
      {formIsVisible &&
        <div ref={overlayRef} className="backdrop-blur-xs absolute inset-0 flex justify-center items-center" onClick={e => {if (e.target === overlayRef.current) {setFormIsVisible(false); setPaymentMethod('transfer')}}}>
          {false ?
            <div>
              memek
            </div>
            :
            <form action={bayar}>
              <div className="bg-white text-gray-700 p-6 rounded-2xl min-w-xl max-w-xl shadow-2xl border border-gray-300">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-2xl">Bayar tagihan</h3>
                  </div>
                    <button onClick={() => {setFormIsVisible(false); setPaymentMethod('transfer')}} className="hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out text-white bg-blue-600 p-2 px-4 rounded-2xl font-semibold border border-gray-400 shadow-lg cursor-pointer">Tutup</button>
                </div>
                <fieldset className="p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-500">Metode pembayaran</label>
                    <div className="flex items-center gap-2">
                      <input
                        type='radio'
                        id="metode_pembayaran"
                        value='true'
                        name="metode_pembayaran"
                        className="shadow-lg"
                        required
                        defaultChecked
                        onChange={() => setPaymentMethod('transfer')}
                      />
                      <label htmlFor="metode_pembayaran" className="text-gray-400">Transfer</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type='radio'
                        id="metode_pembayaran"
                        value='false'
                        name="metode_pembayaran"
                        className="shadow-lg"
                        required
                        onChange={() => setPaymentMethod('cash')}
                      />
                      <label htmlFor="metode_pembayaran" className="text-gray-400">Cash</label>
                    </div>
                  </div>
                  {paymentMethod === 'transfer' && (
                    <div className="flex flex-col gap-4 p-4 border border-blue-400 rounded-2xl bg-blue-50 shadow-inner">
                      <h4 className="font-bold text-blue-600 text-lg">Langkah Pembayaran Transfer</h4>
                      <div className=" text-gray-600 space-y-2">
                          <p>Silakan lakukan transfer ke detail rekening berikut:</p>
                          <div className="font-mono bg-white p-3 rounded-2xl border border-gray-400 text-sm">
                              <span className="font-bold">BANK BCA:</span> 123-456-7890<br/>
                              <span className="font-bold">A.N.:</span> PT. KOSMAYA INDONESIA
                          </div>
                      </div>
                      
                      {/* Input Bukti Transfer */}
                      <div className="flex flex-col gap-2">
                          <label htmlFor="bukti_transfer" className="text-gray-600 font-medium">Unggah Bukti Transfer <span className="text-red-500">*</span></label>
                          <input 
                              type="file" 
                              id="bukti_transfer"
                              name="bukti_transfer"
                              className="p-2  text-gray-400 border border-gray-400 rounded-2xl cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border file:border-blue-400 file:text-sm file:font-semibold file:bg-white file:text-blue-400"
                              required
                          />
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'cash' && (
                    <div className="flex flex-col gap-3 p-4 border border-green-400 rounded-xl bg-green-50 shadow-inner">
                      <h4 className="font-bold text-green-600 text-lg">Instruksi Pembayaran Tunai</h4>
                      <p className=" text-gray-700">
                          Pembayaran cash/tunai harus diserahkan langsung kepada pemilik kos di lokasi.
                      </p>
                      <p className=" font-medium text-gray-700">
                          Pastikan Anda menghubungi pemilik kos ini terlebih dahulu untuk melakukan pembayaran secara cash/tunai.
                      </p>
                    </div>
                  )}
                  <label className="absolute" htmlFor="tagihan_id"></label>
                  <input className="absolute" type="hidden" name="tagihan_id" id="tagihan_id" hidden readOnly value={tagihan_id} />
                  <label className="absolute" htmlFor="payer_id"></label>
                  <input className="absolute" type="hidden" name="payer_id" id="payer_id" hidden readOnly value={payer_id} />
                  <label className="absolute" htmlFor="jumlah_bayar"></label>
                  <input className="absolute" type="hidden" name="jumlah_bayar" id="jumlah_bayar" hidden readOnly value={jumlah_bayar} />
                  <label className="absolute" htmlFor="verified_by"></label>
                  <input className="absolute" type="hidden" name="verified_by" id="verified_by" hidden readOnly value={verified_by} />
                  <button className="hover:scale-102 active:scale-100 transition-all duration-300 ease-in-out bg-blue-600 text-white border-gray-400 font-semibold p-3 mt-4 border cursor-pointer shadow-lg  rounded-2xl">Bayar</button>
                </fieldset>
              </div>
            </form>
          }
        </div>
      }
      {displayBatalSewa && 
        <div ref={overlayRef} className="backdrop-blur-xs absolute inset-0 flex justify-center items-center" onClick={e => {if (e.target === overlayRef.current) {setDisplayBatalSewa(false)}}}>
          <section className="bg-white text-gray-700 p-6 rounded-2xl min-w-xl shadow-2xl border border-gray-300">
          <h3 className="font-bold text-2xl">Apa anda yakin ingin membatalkan sewa ini?</h3>
          <div className="flex items-center mt-6 gap-6">
            <button onClick={() => {
              setDisplayBatalSewa(false)
            }} className="bg-blue-600 text-white grow basis-0 cursor-pointer hover:scale-105  active:scale-100 transition-all duration-300 ease-in-out border border-gray-400 rounded-2xl py-2 shadow-lg font-semibold text-lg">
              Tidak
            </button>
            <button onClick={()=>batalSewa(payer_id, kamar_id)} className="basis-0 grow cursor-pointer hover:scale-105  active:scale-100 transition-all duration-300 ease-in-out border border-blue-600 text-blue-600 rounded-2xl py-2 shadow-lg font-semibold text-lg">
              Ya
            </button>
          </div>
      </section>
        </div>
      }
    </>
  );
}