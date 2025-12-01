import Link from "next/link";

export default function Home() {
  const heroIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>
  return (
    <>
      <div className="relative items-center flex flex-col min-h-full h-full max-h-full">
        <header className="absolute z-10 shadow-lg py-2 px-4 border border-gray-300 rounded-2xl flex items-center left-4 right-4 top-4 justify-between">
          <h2 className="font-bold text-2xl text-blue-800 flex items-center gap-2">{heroIcon}BayarNyala</h2>
          <nav className="">
            <ul className="flex gap-4 font-semibold text-white">
              <li className="bg-blue-600 border border-gray-400 rounded-2xl py-2 px-4">
                <Link href='/'>Beranda</Link>
              </li>
              <li className="bg-blue-600 border border-gray-400 rounded-2xl py-2 px-4">
                <Link href='/'>Tentang</Link>
              </li>
              <li className="bg-blue-600 border border-gray-400 rounded-2xl py-2 px-4">
                <Link href='/'>Panduan</Link>
              </li>
              <li className="bg-blue-600 border border-gray-400 rounded-2xl py-2 px-4">
                <Link href='/'>Syarat & Ketentuan</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex flex-col h-full w-full justify-center gap-4 pl-24">
          <h1 className="font-bold text-8xl text-blue-800 flex items-center">BayarNyala</h1>
          <p className="text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />Integer posuere sollicitudin tellus, eget mollis neque auctor nec. <br />Vestibulum vehicula, dolor quis consectetur ornare, <br />diam lorem molestie purus, gravida bibendum ipsum quam at massa.</p>
          <div className="flex text-2xl gap-4 font-semibold">
            <Link href='/login' className="bg-blue-600 text-white shadow-xl py-4 px-8 rounded-2xl border border-gray-300 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Masuk</Link>
            <Link href='/signup' className="bg-white text-blue-600 shadow-xl py-4 px-8 rounded-2xl border border-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Daftar</Link>
          </div>
        </main>
      </div>
    </>
  );
}
