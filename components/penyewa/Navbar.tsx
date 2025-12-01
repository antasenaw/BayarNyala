"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = ({admin}:{admin?:boolean}) => {
  const pathname = usePathname();
  const home = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16"><path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/><path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/></svg>
  const kamar = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16"><path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/></svg>
  const penyewa = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/></svg>
  const pembayaran = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/></svg>

  return (
    <header className="flex grow items-center border py-2 px-4 rounded-2xl border-gray-300 shadow-lg justify-between">
        <div className="flex font-extrabold text-2xl items-center gap-2 text-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>
          <h1 className="">BayarNyala</h1>
        </div>
        <nav className="text-blue-600">
          <ul className="flex gap-4 font-semibold">
            <li className={`relative group flex py-2 px-4 rounded-2xl items-center gap-2 ${pathname === '/admin/dashboard' ? 'text-white bg-blue-600' : 'bg-white text-blue-600'} hover:scale-105 active:scale-95 hover:text-white hover:bg-blue-600 transition-all ease-in-out duration-300`}>
              {/* <div className={`${pathname === '/admin/dashboard' || 'opacity-0 top-100 bottom-100' } top-2 bottom-2 group-hover:opacity-100 group-hover:top-2 group-hover:bottom-2 absolute bg-blue-600 inset-0 right-51 rounded-2xl transition-all ease-in-out duration-400`}/> */}
              <Link href={`${admin ? 'admin' : '.'}/dashboard`} className="flex gap-2 items-center">{home}Dashboard</Link>
            </li>
            <li className={`relative group flex py-2 px-4 rounded-2xl items-center gap-2 ${pathname === '/admin/kamar' ? 'text-white bg-blue-600' : 'bg-white text-blue-600'} hover:scale-105 active:scale-95 hover:text-white hover:bg-blue-600 transition-all ease-in-out duration-300`}>
              {/* <div className={`${pathname === '/admin/kamar' || 'opacity-0 top-100 bottom-100' } top-2 bottom-2 group-hover:opacity-100 group-hover:top-2 group-hover:bottom-2 absolute bg-blue-600 inset-0 right-51 rounded-2xl transition-all ease-in-out duration-400`}/> */}
              <Link href={`${admin ? 'admin' : '.'}/kamar`} className="flex gap-2 items-center">{kamar}Kelola kamar</Link>
            </li>
            <li className={`relative group flex py-2 px-4 rounded-2xl items-center gap-2 ${pathname === '/admin/penyewa' ? 'text-white bg-blue-600' : 'bg-white text-blue-600'} hover:scale-105 active:scale-95 hover:text-white hover:bg-blue-600 transition-all ease-in-out duration-300`}>
              {/* <div className={`${pathname === '/admin/penyewa' || 'opacity-0 top-100 bottom-100' } top-2 bottom-2 group-hover:opacity-100 group-hover:top-2 group-hover:bottom-2 absolute bg-blue-600 inset-0 right-51 rounded-2xl transition-all ease-in-out duration-400`}/> */}
              <Link href={`${admin ?'admin' : '.'}/penyewa`} className="flex gap-2 items-center">{penyewa}Kelola penyewa</Link>
            </li>
            <li className={`relative group flex py-2 px-4 rounded-2xl items-center gap-2 ${pathname === '/admin/pembayaran' ? 'text-white bg-blue-600' : 'bg-white text-blue-600'} hover:scale-105 active:scale-95 hover:text-white hover:bg-blue-600 transition-all ease-in-out duration-300`}>
              {/* <div className={`${pathname === '/admin/pembayaran' || 'opacity-0 top-100 bottom-100' } top-2 bottom-2 group-hover:opacity-100 group-hover:top-2 group-hover:bottom-2 absolute bg-blue-600 inset-0 right-51 rounded-2xl transition-all ease-in-out duration-400`}/> */}
              <Link href={`${admin ? 'admin' : '.'}/pembayaran`} className="flex gap-2 items-center">{pembayaran}Kelola pembayaran</Link>
            </li>
          </ul>
        </nav>
      </header>
  )
}

export default Navbar