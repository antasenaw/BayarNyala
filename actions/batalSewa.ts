"use server"
import connectDB from "@/lib/mongodb";
import PenyewaDetails from "@/models/PenyewaDetails";
import Sewa from "@/models/Sewa";
import Tagihan from "@/models/Tagihan";
import { revalidatePath } from "next/cache";

export async function batalSewa(penyewa_id: string, kamar_id: string) {
  await connectDB();

  const [sewa] = await Sewa.find({penyewa_id: penyewa_id, kamar_id: kamar_id});
  const [tagihan] = await Tagihan.find({penyewa_id: penyewa_id, kamar_id: kamar_id});
  const [penyewa] = await PenyewaDetails.find({user_id: penyewa_id})

  // console.log(sewa._id, tagihan._id, penyewa._id);

  await Sewa.findByIdAndDelete(sewa._id);
  await Tagihan.findByIdAndDelete(tagihan._id);
  if (penyewa) await PenyewaDetails.findByIdAndDelete(penyewa._id);
  revalidatePath('/tagihan', 'page');
}