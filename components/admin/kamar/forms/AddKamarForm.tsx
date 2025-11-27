"use client"
import { useRef, FormEvent } from "react";
import { IKamar } from "@/models/Kamar";
import { APIResponse } from "@/lib/fetchKamar";
import { useRouter } from "next/navigation";

const InputKamarForm = ({
  displayInputKamarForm,
  setDisplayInputKamarForm,
  postKamarHandler 
} : {
  displayInputKamarForm: boolean;
  setDisplayInputKamarForm: React.Dispatch<React.SetStateAction<boolean>>;
  postKamarHandler: (newKamarData: IKamar) => Promise<APIResponse>;
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    try {
      const rawData = Object.fromEntries(new FormData(formRef.current).entries());

      const newKamarData: IKamar = {
          nomor_unit: String(rawData.nomor_unit),
          harga_sewa: parseInt(String(rawData.harga_sewa), 10),
          status_ketersediaan: (rawData.status_ketersediaan) === 'true',
          managed_by: '6924ad994524bee457cab0a4'
      };
      
      const response = await postKamarHandler(newKamarData);

      if (response) {
        formRef.current.reset();
        setDisplayInputKamarForm(false);
        router.refresh();
      }
      
    } catch (error) {
      console.error("Gagal menambahkan kamar:", error);
    }  
  }

  return (
    <div ref={overlayRef} className="backdrop-blur-xs absolute inset-0 flex justify-center items-center" onClick={e => e.target === overlayRef.current && setDisplayInputKamarForm(!displayInputKamarForm)}>
      <section className="bg-white text-gray-700 p-6 rounded-2xl min-w-xl shadow-2xl border border-gray-300">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl">Tambah kamar</h3>
          <button onClick={() => setDisplayInputKamarForm(!displayInputKamarForm)} className="text-white bg-blue-400 p-2 px-4 rounded-2xl font-semibold border border-gray-400 shadow-lg cursor-pointer">Tutup</button>
        </div>
        <form
          ref={formRef}
          onSubmit = {handleFormSubmit}
          className="p-6 flex flex-col gap-4"
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
              <label htmlFor="status_ketersediaan" className="text-gray-500 text-center">Ya</label>
              <input
                type='radio'
                id="status_ketersediaan"
                value='true'
                name="status_ketersediaan"
                className="shadow-lg"
                required
                defaultChecked
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="status_ketersediaan" className="text-gray-500 text-center">Tidak</label>
              <input
                type='radio'
                id="status_ketersediaan"
                value='false'
                name="status_ketersediaan"
                className="shadow-lg"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-400 text-white font-semibold p-3 mt-4 border cursor-pointer shadow-lg border-gray-400 rounded-2xl"
          >
            Tambah kamar
          </button>
        </form>
      </section>
    </div>
  )
}

export default InputKamarForm