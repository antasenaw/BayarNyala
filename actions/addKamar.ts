"use server"

import { postKamar } from "@/lib/fetchKamar";
import { getUserIdFromSession } from "@/lib/getUser";
import { IKamarInput } from "@/models/Kamar";
import { revalidatePath } from "next/cache";

export async function addKamar (prev: unknown, formData: FormData) {
  const nomor_unit = String(formData.get('nomor_unit'));
  const harga_sewa = parseInt(String(formData.get('harga_sewa')));
  const status_ketersediaan = formData.get('status_ketersediaan') === 'true';
  const managed_by = String(await getUserIdFromSession());

  const payload: IKamarInput = {
    nomor_unit,
    harga_sewa,
    status_ketersediaan,
    managed_by,
  }

  await postKamar(payload);

  revalidatePath('/admin/kamar', 'page');

  return {
    success: true,
  }
}