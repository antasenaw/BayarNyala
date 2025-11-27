"use client"
import { APIResponse } from "@/lib/fetchKamar";
import { useState } from "react";
import DeleteKamarForm from "../forms/DeleteKamarForm";

const DeleteKamarButton = ({
  kamarId,
  deleteKamarHandler,
} : {
  kamarId: string;
  deleteKamarHandler: (kamarId: string) => Promise<APIResponse>;
}) => {

  const [displayDeleteForm, setDisplayDeleteForm] = useState(false);

  const deleteKamar = async () => {
    await deleteKamarHandler(kamarId);
  }

  return (
    <>
      <button onClick={() => {
        setDisplayDeleteForm(!displayDeleteForm);
      }} className="flex items-center hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out gap-2 cursor-pointer text-red-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/></svg>Hapus</button>
      {displayDeleteForm &&
        <DeleteKamarForm 
          setDeleteForm={setDisplayDeleteForm}
          deleteForm={displayDeleteForm}
          deleteKamar={deleteKamar}
        />
      }
    </>
  )
}

export default DeleteKamarButton