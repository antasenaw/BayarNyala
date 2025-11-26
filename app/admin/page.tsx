import Navbar from "@/components/admin/Navbar";

export const page = () => {
  return (
    <div className="h-full w-full bg-white flex">
      <Navbar admin={true}/>
    </div>
  )
}

export default page;