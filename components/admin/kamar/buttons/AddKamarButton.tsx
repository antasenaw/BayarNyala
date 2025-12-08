"use client"
import { useState, useRef, useActionState } from "react"
import { addKamar } from "@/actions/addKamar";
import { SpinnerSVG } from "../../Navbar";

const AddKamarButton = () => {
  const [displayInputKamarForm, setDisplayInputKamarForm] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  
  
  const actionWrapper = async (prev: unknown, formData: FormData) => {
    const res = await addKamar(prev, formData);
    if (res && res.success) {
      setDisplayInputKamarForm(false);
    }
    return res;
  }

  const [data, action, pending] = useActionState(actionWrapper, null);

  return (
    <>
      <button 
        onClick={() => {
          setDisplayInputKamarForm(true);
        }}
        className="p-2 px-4 border border-gray-400 flex items-center justify-center gap-2 cursor-pointer shadow-lg font-semibold rounded-2xl text-blue-600 bg-white hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out"
      >Tambah kamar</button>

      {displayInputKamarForm &&
        <div ref={overlayRef} className="backdrop-blur-xs absolute inset-0 flex justify-center items-center" onClick={e => e.target === overlayRef.current && setDisplayInputKamarForm(!displayInputKamarForm)}>
          <section className="bg-white text-gray-700 p-6 rounded-2xl min-w-xl shadow-2xl border border-gray-300">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-2xl">Tambah kamar</h3>
              <button onClick={() => setDisplayInputKamarForm(!displayInputKamarForm)} className="hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out text-white bg-blue-600 p-2 px-4 rounded-2xl font-semibold border border-gray-400 shadow-lg cursor-pointer">Tutup</button>
            </div>
            <form
              className="p-6 flex flex-col gap-4"
              action={action}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="nomor_unit" className="text-gray-500">Nomor unit</label>
                <input
                  type="text"
                  id="nomor_unit"
                  name="nomor_unit"
                  className="border border-gray-400 p-3 shadow-lg rounded-2xl"
                  placeholder="Masukkan nomor unit"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="harga_sewa" className="text-gray-500">Harga sewa</label>
                <input
                  type="text"
                  id="harga_sewa"
                  name="harga_sewa"
                  className="border border-gray-400 p-3 shadow-lg rounded-2xl"
                  placeholder="Masukkan harga sewa"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500">Tersedia sekarang</label>
                <div className="flex items-center gap-2">
                  <input
                    type='radio'
                    id="status_ketersediaan"
                    value='true'
                    name="status_ketersediaan"
                    className="shadow-lg"
                    required
                    defaultChecked
                  />
                  <label htmlFor="status_ketersediaan" className="text-gray-500 text-center">Ya</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type='radio'
                    id="status_ketersediaan"
                    value='false'
                    name="status_ketersediaan"
                    className="shadow-lg"
                    required
                  />
                  <label htmlFor="status_ketersediaan" className="text-gray-500 text-center">Tidak</label>
                </div>
              </div>
              <button
                type="submit"
                className="hover:scale-102 flex items-center justify-center gap-2 active:scale-100 transition-all duration-300 ease-in-out bg-blue-600 text-white font-semibold p-3 mt-4 border cursor-pointer shadow-lg border-gray-400 rounded-2xl"
              >
                {pending ?
                  <>Menambahkan kamar {SpinnerSVG}</> :
                  <>Tambah kamar</>
                }
              </button>
            </form>
          </section>
        </div> 
      }
    </>
  )
}

export default AddKamarButton