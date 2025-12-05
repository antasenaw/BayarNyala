"use server"

import { editKamar, getKamarById } from "@/lib/fetchKamar";
import { editPembayaran } from "@/lib/fetchPembayaran";
import { editSewa, } from "@/lib/fetchSewa";
import { editTagihan, getTagihanById } from "@/lib/fetchTagihan";
import connectDB from "@/lib/mongodb";
import { IRiwayatPembayaran } from "@/models/RiwayatPembayaran"
import Sewa from "@/models/Sewa";
import { revalidatePath } from "next/cache";

async function verifikasiSewa(tagihanPenyewaId: string) {
    await connectDB();
    const [ sewa ] = await Sewa.find({penyewa_id: tagihanPenyewaId});


  const updatedSewaData = {
    ...sewa,
    status: 'aktif'
  };
  const updatedSewa = (await editSewa(sewa._id, updatedSewaData)).data;
  console.log(updatedSewa, 'memek')
}

async function verifikasiKamar(kamarId: string) {
  const kamar = (await getKamarById(kamarId)).data
  const updatedKamarData = {
    ...kamar,
    status_ketersediaan: false
  }
  const updatedKamar = (await editKamar(kamarId, updatedKamarData)).data;
  console.log(updatedKamar)
}

async function verifikasiTagihan(tagihanId: string) {
  const tagihan = (await getTagihanById(tagihanId)).data;
  const updatedTagihanData = {
    ...tagihan,
    status_pembayaran: 'Lunas'
  }
  const updatedTagihan = (await editTagihan(tagihanId, updatedTagihanData)).data;
  return Object(updatedTagihan?.penyewa_id)._id;
}

export async function verifikasi(pembayaranId: string, currentPembayaranData: IRiwayatPembayaran, tagihanId: string, kamarId: string) {
  // console.log(pembayaranId, currentData);

  const penyewa_id = await verifikasiTagihan(tagihanId)
  await verifikasiKamar(kamarId)
  await verifikasiSewa( penyewa_id)

  const updatedPembayaranData = {
    ...currentPembayaranData,
    status_verifikasi: true
  }
  const pembayaran = await editPembayaran(pembayaranId, updatedPembayaranData);
  if (pembayaran.success) revalidatePath('/admin/pembayaran', 'page');
  // console.log(pembayaran.data)
}