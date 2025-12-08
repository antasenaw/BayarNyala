import AddKamarButton from "@/components/admin/kamar/buttons/AddKamarButton";
import KamarList from "@/components/admin/kamar/KamarList";
import LogoutButton from "@/components/admin/LogoutButton";
import Navbar from "@/components/admin/Navbar"
import { getKamar, deleteKamar, getKamarById, editKamar } from "@/lib/fetchKamar"
import { getUserName } from "@/lib/getUser";
import { IKamarInput } from "@/models/Kamar";
import { revalidatePath } from "next/cache";


const Page = async () => {
  const kamarList = await getKamar();
  
  const deleteKamarHandler = async (kamarId: string) => {
    "use server"
    const response = await deleteKamar(kamarId);
    if (response.success) revalidatePath('/admin/kamar', 'page');
    return response;
  }

  const getKamarByIdHandler = async (kamarId: string) => {
    "use server"
    const response = await getKamarById(kamarId);
    if (response.success) revalidatePath('/admin/kamar', 'page')
    return response;
  }

  const editKamarHandler = async ({ kamarId, updateData }: { kamarId: string, updateData: IKamarInput }) => {
    "use server"
    const res = await editKamar(kamarId, updateData);
    if (res) revalidatePath('/admin/kamar', 'page');
    return res;
  }

  const userName = await getUserName();

  return (
    <div className="h-screen max-h-screen w-full relative bg-white flex flex-col p-4 pb-8">
      <div className="shrink-0 flex items-center gap-4">
        <Navbar />
        <div className="flex gap-4 items-center border py-2 px-4 rounded-2xl border-gray-300 shadow-lg">
          <p className="">{userName}</p>
          <LogoutButton/>
        </div>
      </div>
      <main className="flex-1 flex flex-col mt-8 mx-4 min-h-0">
          <section className="flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="flex shrink-0 border bg-blue-600 border-gray-400 rounded-2xl p-3 shadow-xl justify-between">
              <input type="text" className="border border-gray-400 bg-white p-2 px-4 rounded-2xl shadow-lg" placeholder="Cari kamar" />
              <AddKamarButton/>
            </div>
            <KamarList
              kamarList={kamarList}
              deleteKamarHandler={deleteKamarHandler}
              getKamarByIdHandler={getKamarByIdHandler}
              editKamarHandler={editKamarHandler}
            />
          </section>
      </main>
    </div>
  );
}

export default Page