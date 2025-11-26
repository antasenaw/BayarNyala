import Navbar from "@/components/admin/Navbar"

const page = () => {
  return (
    <div className="h-full w-full bg-white flex">
      <Navbar />
      <main>
        <div className="p-8">
          <h1 className="font-extrabold text-2xl text-blue-800">Kelola penyewa</h1>
        </div>
      </main>
    </div>
  )
}

export default page