"use server"

import { editKamar, getKamarById } from "@/lib/fetchKamar";
import { editPembayaran } from "@/lib/fetchPembayaran";
import { editTagihan, getTagihanById } from "@/lib/fetchTagihan";
import { IRiwayatPembayaran } from "@/models/RiwayatPembayaran"
import { revalidatePath } from "next/cache";

async function verifikasiKamar(kamarId: string) {
  const kamar = (await getKamarById(kamarId)).data
  const updatedKamarData = {
    ...kamar,
    status_ketersediaan: false
  }
  const updatedKamar = (await editKamar(kamarId, updatedKamarData)).data;
  console.log(updatedKamar);
}

async function verifikasiTagihan(tagihanId: string) {
  const tagihan = (await getTagihanById(tagihanId)).data;
  const updatedTagihanData = {
    ...tagihan,
    status_pembayaran: 'Lunas'
  }
  const updatedTagihan = (await editTagihan(tagihanId, updatedTagihanData)).data;
  console.log(updatedTagihan);
}

export async function verifikasi(pembayaranId: string, currentPembayaranData: IRiwayatPembayaran, tagihanId: string, kamarId: string) {
  // console.log(pembayaranId, currentData);

  await verifikasiTagihan(tagihanId)
  await verifikasiKamar(kamarId)

  const updatedPembayaranData = {
    ...currentPembayaranData,
    status_verifikasi: true
  }
  const pembayaran = await editPembayaran(pembayaranId, updatedPembayaranData);
  if (pembayaran.success) revalidatePath('/admin/pembayaran', 'page');
  console.log(pembayaran.data)
}