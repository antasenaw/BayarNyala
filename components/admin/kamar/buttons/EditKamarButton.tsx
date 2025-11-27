"use client"
import { APIResponse } from "@/lib/fetchKamar";
import { useState } from "react";
import { IKamar } from "@/models/Kamar";
import EditKamarForm from "../forms/EditKamarForm";

const EditKamarButton = ({
  kamarId,
  getKamarByIdHandler,
  editKamarHandler,

} : {
  kamarId: string;
  getKamarByIdHandler: (kamarId: string) => Promise<APIResponse>,
  editKamarHandler: ({
    kamarId,
    updateData
  } : {
    kamarId: string,
    updateData: IKamar
  }) => Promise<APIResponse>,
}) => {

  const [ displayEditForm, setDisplayEditForm ] = useState(false);
  const [kamarData, setKamarData ] = useState<IKamar | undefined>(undefined);

  const getKamarById = async () => {
    const response = await getKamarByIdHandler(kamarId);
    const { data } = await response;
    setKamarData(data);
    setDisplayEditForm(!displayEditForm)
  }

  return (
    <>
      <button onClick={getKamarById} className="hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out flex items-center gap-2 cursor-pointer text-blue-900"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>Edit</button>
      {displayEditForm &&
        <EditKamarForm
          data={kamarData}
          displayEditForm={displayEditForm}
          setDisplayEditForm={setDisplayEditForm}
          kamarId={kamarId}
          editKamarHandler={editKamarHandler}
        />
      }  
    </>
  )
}

export default EditKamarButton