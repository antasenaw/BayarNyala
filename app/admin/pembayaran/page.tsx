import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/admin/Navbar"
import PembayaranList from "@/components/admin/pembayaran/PembayaranList";
import TagihanButton from "@/components/admin/pembayaran/TagihanButton";
import UserName from "@/components/admin/pembayaran/UserName";

const Page = async () => {
  return (
    <div className="h-screen max-h-screen w-full relative bg-white flex flex-col p-4 pb-8">
      <div className="shrink-0 flex items-center gap-4">
        <Navbar />
        <div className="flex gap-4 items-center border py-2 px-4 rounded-2xl border-gray-300 shadow-lg">
          <UserName />
          <LogoutButton/>
        </div>
      </div>
      <main className="flex-1 flex flex-col mt-8 mx-4 min-h-0">
          <section className="flex-1 flex flex-col overflow-hidden min-h-0">
            <div className="flex shrink-0 border bg-blue-600 border-gray-400 rounded-2xl p-3 shadow-xl justify-between">
              <input type="text" className="border border-gray-400 bg-white p-2 px-4 rounded-2xl shadow-lg" placeholder="Cari kamar" />
              <TagihanButton />
            </div>
            <ul className="flex-1 overflow-y-auto mt-4 border border-gray-400 rounded-2xl p-4">
                <PembayaranList />
            </ul>
          </section>
      </main>
    </div>
  )
}

export default Page