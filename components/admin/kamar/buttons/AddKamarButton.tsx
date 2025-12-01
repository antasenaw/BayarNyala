"use client"
import { useState } from "react"
import InputKamarForm from "../forms/AddKamarForm";
import { IKamarInput } from "@/models/Kamar";
import { APIResponse } from "@/lib/fetchKamar";

const AddKamarButton = ({
  postKamarHandler,
} : {
  postKamarHandler: (newKamarData: IKamarInput) => Promise<APIResponse>,
}) => {
  const [displayInputKamarForm, setDisplayInputKamarForm] = useState(false);

  return (
    <>
      <button 
        onClick={() => setDisplayInputKamarForm(!displayInputKamarForm)}
        className="p-2 px-4 border border-gray-400 cursor-pointer shadow-lg font-semibold rounded-2xl text-blue-600 bg-white hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out"
      >
        Tambah kamar
      </button>
      {displayInputKamarForm &&
        <InputKamarForm
          setDisplayInputKamarForm={setDisplayInputKamarForm}
          displayInputKamarForm={displayInputKamarForm}
          postKamarHandler={postKamarHandler}
        />
      }
    </>
  )
}

export default AddKamarButton