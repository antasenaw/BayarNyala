import Navbar from "@/components/admin/Navbar"

const page = () => {
  return (
    <div className="h-full w-full bg-white flex">
      <Navbar />
      <main className="grow">
        <h2 className="font-extrabold text-2xl p-8 pb-4 text-blue-800">Kelola kamar</h2>
          <section className="mx-8">
            <div className="flex bg-blue-500 mb-8 rounded-2xl p-2 px-4">
              <input type="text" className="border border-gray-400 bg-white p-2 px-4 rounded-2xl" placeholder="Cari kamar" />
            </div>
          <div className="rounded-2xl border border-gray-400 ">
            <div className="grid grid-cols-6 p-2 px-4 bg-blue-500 rounded-t-2xl">
              <p className="">No</p>
              <p className="">Nomor kamar</p>
              <p className="">Status kamar</p>
              <p className="">Tipe kamar</p>
              <p className="">Harga sewa</p>
              <p className="">Aksi</p>
            </div>
            <div className="grid grid-cols-6 p-2 px-4">
              <p className="">1</p>
              <p className="">212</p>
              <p className="">Tersedia</p>
              <p className="">Tipe 1</p>
              <p className="">Rp. 500,000</p>
              <p className="">Aksi</p>
            </div>
          </div>
          </section>
        </main>
    </div>
  )
}

export default page