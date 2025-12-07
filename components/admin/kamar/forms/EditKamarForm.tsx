"use client"
import { APIResponse } from "@/lib/fetchKamar";
import { getUserIdFromSession } from "@/lib/getUser";
import { IKamar, IKamarInput } from "@/models/Kamar";
import { useRouter } from "next/navigation";
import { useRef, FormEvent } from "react";

const EditKamarForm = ({
  data,
  kamarId,
  displayEditForm,
  editKamarHandler,
  setDisplayEditForm,
} : {
  kamarId: string;
  editKamarHandler: ({
    kamarId,
    updateData
  } : {
    kamarId: string,
    updateData: IKamarInput
  }) => Promise<APIResponse>
  data?: IKamar
  displayEditForm: boolean,
  setDisplayEditForm: React.Dispatch<React.SetStateAction<boolean>>,
}) => {

  const overlayRef = useRef<HTMLDivElement | null>(null); 
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) return;

    try {
      const rawData = Object.fromEntries(new FormData(formRef.current).entries());
      const userId = await getUserIdFromSession();
      if (!userId) return '';

      const updateData: IKamarInput = {
          nomor_unit: String(rawData.nomor_unit),
          harga_sewa: parseInt(String(rawData.harga_sewa), 10),
          status_ketersediaan: (rawData.status_ketersediaan) === 'true',
          managed_by: userId
      };
      
      const response = await editKamarHandler({ kamarId, updateData });

      if (response) {
        formRef.current.reset();
        setDisplayEditForm(false);
        router.refresh();
      }
      
    } catch (error) {
      console.error("Gagal menambahkan kamar:", error);
    }  
  }

  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && setDisplayEditForm(!displayEditForm)} className={`absolute items-center justify-center inset-0 backdrop-blur-xs flex`}>
      <section className="bg-white text-gray-700 p-6 rounded-2xl min-w-xl shadow-2xl border text-start border-gray-300">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-2xl">Edit kamar</h3>
          <button onClick={() => setDisplayEditForm(!displayEditForm)} className="hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out text-white bg-blue-600 p-2 px-4 rounded-2xl font-semibold border border-gray-400 shadow-lg cursor-pointer">Tutup</button>
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
              defaultValue={data?.nomor_unit}
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
              defaultValue={data?.harga_sewa}
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label className="text-gray-500">Tersedia sekarang</label>
            <div className="flex items-center gap-2">
              <label htmlFor="status_ketersediaan" className="text-gray-500">Ya</label>
              <input
                type='radio'
                id="status_ketersediaan"
                value='true'
                name="status_ketersediaan"
                className="shadow-lg"
                required
                defaultChecked={data?.status_ketersediaan}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="status_ketersediaan" className="text-gray-500">Tidak</label>
              <input
                type='radio'
                id="status_ketersediaan"
                value='false'
                name="status_ketersediaan"
                className="shadow-lg"
                required
                defaultChecked={!data?.status_ketersediaan}
              />
            </div>
          </div> */}
          <button
            type="submit"
            className="hover:scale-102 active:scale-100 transition-all duration-300 ease-in-out bg-blue-600 text-white font-semibold p-3 mt-4 border cursor-pointer shadow-lg border-gray-400 rounded-2xl"
          >
            Edit kamar
          </button>
        </form>
      </section>
    </div>
  );
}

export default EditKamarForm