import AddKamarButton from "@/components/admin/kamar/buttons/AddKamarButton";
import KamarList from "@/components/admin/kamar/KamarList";
import Navbar from "@/components/admin/Navbar"
import { getKamar, postKamar, deleteKamar, getKamarById, editKamar } from "@/lib/fetchKamar"
import { IKamar } from "@/models/Kamar";
import { revalidatePath } from "next/cache";

const Page = async () => {
  const kamarList = await getKamar();

  const postKamarHandler = async (newKamarData: IKamar) => {
    "use server"
    const response = await postKamar(newKamarData);
    if (response) revalidatePath('/admin/kamar', 'page');
    return response
  }

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

  const editKamarHandler = async ({ kamarId, updateData }: { kamarId: string, updateData: IKamar }) => {
    "use server"
    const res = await editKamar(kamarId, updateData);
    if (res) revalidatePath('/admin/kamar', 'page');
    return res;
  }

  return (
    <div className="h-full w-full bg-white flex">
      <Navbar />
        <main className="grow relative">
          <h2 className="font-extrabold text-2xl m-8 mb-4 text-blue-800">Kelola kamar</h2>
            <section className="mx-8">
              <div className="flex border bg-blue-400 border-gray-400 mb-8 rounded-2xl p-3 shadow-xl justify-between">
                <input type="text" className="border border-gray-400 bg-white p-2 px-4 rounded-2xl shadow-lg" placeholder="Cari kamar" />
                <AddKamarButton postKamarHandler={postKamarHandler}/>
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