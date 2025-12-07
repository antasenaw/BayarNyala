"use server"
import { postPembayaran } from "@/lib/fetchPembayaran";
import { Buffer } from "buffer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

async function convertImage(formData: FormData) {
  const file = formData.get('bukti_transfer') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);


  const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'bayarNyala/buktiPembayaran'}, (error, results) => {
      if (error) return reject(error);
      if (!results) return;
      resolve(results);
    }).end(buffer)
  });
  // const base64Data = buffer.toString('base64');

  // const mimeType = file.type || 'application/octet-stream';
  // const dataUrl = `data:${mimeType};base64,${base64Data}`;

  return uploadResult.url;
}

export async function bayar(formData: FormData) {
  
  const tagihan_id = formData.get('tagihan_id') as string;
  const payer_id = formData.get('payer_id') as string;
  const jumlah_bayar = Number(formData.get('jumlah_bayar'));
  const metode_pembayaran = (): string => {
    if (formData.get('metode_pembayaran') === 'true') return 'Transfer';
    return 'Cash';
  }
  const verified_by = formData.get('verified_by') as string;
  // console.log(verified_by)
  
  const detailPembayaranCash = {
    tagihan_id: tagihan_id,
    payer_id: payer_id,
    jumlah_bayar: jumlah_bayar,
    metode_pembayaran: metode_pembayaran(),
    status_verifikasi: false,
    verified_by: verified_by
  }
  
  async function detailPembayaran() {
    if (metode_pembayaran() === 'Transfer') {
      const imageUrl = await convertImage(formData);
      return {...detailPembayaranCash, bukti_transfer_path: imageUrl,}
    };
    return detailPembayaranCash;
  }

  await postPembayaran(await detailPembayaran());
  
  // console.log(pembayaran.data);

}