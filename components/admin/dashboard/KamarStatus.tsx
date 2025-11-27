import { getKamar } from '@/lib/fetchKamar'
import { IKamar } from '@/models/Kamar';

const KamarStatus = async () => {
  const kamarList = await getKamar();

  return (
    <div className="p-0 pt-0 pr-0 basis-0 grow rounded-2xl">
      <h3 className="mb-4 font-bold text-blue-600 text-xl">Status kamar</h3>
      <div className="text-gray-600 border rounded-2xl border-gray-400 shadow-xl p-2 px-4">
        <p className="flex gap-2 items-center py-2 px-4 border-b border-b-gray-300"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>
          {kamarList.filter((kamar: IKamar) => !kamar.status_ketersediaan).length} Terisi
        </p>
        <p className="flex gap-2 items-center py-2 px-4 border-b border-b-gray-300"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>
          {kamarList.filter((kamar: IKamar) => kamar.status_ketersediaan).length} Tersedia
        </p>
        <p className="flex gap-2 items-center py-2 px-4 border-b border-b-gray-300"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>
          null Sudah bayar
        </p>
        <p className="flex gap-2 items-center py-2 px-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>
          null Belum bayar
        </p>
      </div>
    </div>
  )
}

export default KamarStatus