import Link from "next/link";

export default function Home() {
  // const heroIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16"><path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/><path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/></svg>
  return (
    <>
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <h1 className="font-bold text-4xl text-blue-800 flex items-center">BayarNyala</h1>
      <div className="flex gap-4 font-semibold">
        <Link href='/login' className="bg-blue-600 text-white py-2 px-4 rounded-2xl border border-gray-300 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Masuk</Link>
        <Link href='/signup' className="bg-white text-blue-600 py-2 px-4 rounded-2xl border border-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out">Daftar</Link>
      </div>
    </div>
    </>
  );
}
