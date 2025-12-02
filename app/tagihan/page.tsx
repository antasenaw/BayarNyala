import LogoutButton from "@/components/admin/LogoutButton"
import Navbar from "@/components/penyewa/Navbar";
import { getUserName } from "@/lib/getUser"

const page = async () => {
  const userName = await getUserName();
  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="flex items-center gap-4 mt-4 mx-4">
        <Navbar />
        <div className="flex gap-4 items-center border py-2 px-4 rounded-2xl border-gray-300 shadow-lg">
          <p className="">{userName}</p>
          <LogoutButton/>
        </div>
      </div>
      <main>
        <div className="p-8">
          <h1 className="font-extrabold text-2xl text-blue-800">Kelola tagihan</h1>
        </div>
      </main>
    </div>
  )
}

export default page