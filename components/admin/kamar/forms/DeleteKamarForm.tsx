"use client"
import React, { useRef } from "react"

const DeleteKamarForm = ({
  setDeleteForm,
  deleteForm,
  deleteKamar,
} : {
  setDeleteForm: React.Dispatch<React.SetStateAction<boolean>>;
  deleteForm: boolean;
  deleteKamar: () => Promise<void>
}) => {

  const overlayRef = useRef<HTMLDivElement | null>(null); 

  return (
    <div ref={overlayRef} onClick={e => e.target === overlayRef.current && setDeleteForm(!deleteForm)} className="absolute inset-0 backdrop-blur-xs flex justify-center items-center">
      <section className="bg-white text-gray-700 p-6 rounded-2xl min-w-xl shadow-2xl border border-gray-300">
          <h3 className="font-bold text-2xl">Apa anda yakin ingin menghapus kamar ini?</h3>
          <div className="flex items-center mt-6 gap-6">
            <button onClick={() => {
              setDeleteForm(!deleteForm)
            }} className="bg-blue-400 text-white grow basis-0 cursor-pointer hover:scale-105  active:scale-100 transition-all duration-300 ease-in-out border border-gray-400 rounded-2xl py-2 shadow-lg font-semibold text-lg">
              Tidak
            </button>
            <button onClick={deleteKamar} className="basis-0 grow cursor-pointer hover:scale-105  active:scale-100 transition-all duration-300 ease-in-out border border-blue-400 rounded-2xl py-2 shadow-lg font-semibold text-lg">
              Ya
            </button>
          </div>
      </section>
    </div>
  )
}

export default DeleteKamarForm