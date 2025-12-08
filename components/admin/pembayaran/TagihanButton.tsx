"use client"

import Link from "next/link"
import { useState } from "react"
import { SpinnerSVG } from "../Navbar"

const TagihanButton = ({
  tagihan
} : {
  tagihan?: boolean
}) => {
  const [pathname, setPathname] = useState('');
  return (
    <>
      {tagihan ? 
        <Link 
          onClick={() => {
            setPathname('/admin/pembayaran/');
          }}
          className="py-2 px-4 bg-white rounded-2xl flex items-center gap-2 font-semibold text-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          href='../pembayaran'
        >Pembayaran{pathname === '/admin/pembayaran/' && SpinnerSVG}</Link>
        :
        <Link 
          onClick={() => {
            setPathname('/admin/pembayaran/tagihan');
          }}
          className="py-2 px-4 bg-white rounded-2xl flex items-center gap-2 font-semibold text-blue-600 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
          href='/admin/pembayaran/tagihan'
        >Tagihan{pathname === '/admin/pembayaran/tagihan' && SpinnerSVG}</Link>
      }
    </>
  )
}

export default TagihanButton