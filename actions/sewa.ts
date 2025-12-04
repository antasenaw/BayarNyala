"use server"

import { getKamarById } from "@/lib/fetchKamar";
import { postPenyewaDetails } from "@/lib/fetchPenyewaDetails";
import { postSewa } from "@/lib/fetchSewa";
import { postTagihan } from "@/lib/fetchTagihan";



function getDates(prevState: unknown, formData: FormData) {
  const startDate = new Date(String(formData.get('tanggal_mulai')));
  const monthsToAdd = formData.get('tanggal_selesai');
  
  const newDate = new Date(startDate);
  const currentMonth = newDate.getMonth();
  
  newDate.setMonth(currentMonth + parseInt(String(monthsToAdd)));
  
  return {startDate, newDate};
}

function getTenggat(sewaCreatedAtDate: Date) {
  const startDate = new Date(String(sewaCreatedAtDate));
  
  const newDate = new Date(startDate);
  const currentDay = newDate.getDate();
  
  newDate.setDate(currentDay + 3);
  
  return newDate;
}

export async function sewa(prevState: unknown, formData: FormData) {
  const { startDate, newDate } = getDates(prevState, formData);
  
  const user_id = await formData.get('penyewa_id') as string;
  const kamar_id = await formData.get('kamar_id') as string;
  const status = await formData.get('status') as string;
  
  const { data } = await getKamarById(String(kamar_id));
  
  const detailPenyewa = {
    user_id: user_id,
    nomor_hp: String(formData.get('nomor_hp')),
    alamat: String(formData.get('alamat')),
  };
  
  const penyewa = await postPenyewaDetails(detailPenyewa);
  
  const detailSewa = {
    penyewa_id: detailPenyewa.user_id,
    kamar_id: kamar_id,
    tanggal_mulai: startDate,
    tanggal_selesai: newDate,
    status: status,
  };
  
  const sewa = await postSewa(detailSewa);
  const tenggat = getTenggat(new Date(String(sewa.data?.created_at)));
  
  const detailTagihan = {
    kamar_id: detailSewa.kamar_id,
    penyewa_id: detailSewa.penyewa_id,
    jumlah_tagihan: data?.harga_sewa,
    tenggat_bayar: tenggat,
    status_pembayaran: 'Belum Lunas',
  }
  
  const tagihan = await postTagihan(detailTagihan);

  console.log(penyewa.data, sewa.data, tagihan.data);

  return {
    sucsess: false,
  };
}