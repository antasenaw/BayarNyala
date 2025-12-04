"use server"



function getDates(formData: FormData) {
  const startDate = new Date(String(formData.get('tanggal_mulai')));
  const monthsToAdd = formData.get('tanggal_selesai');
  
  const newDate = new Date(startDate);
  const currentMonth = newDate.getMonth();
  
  newDate.setMonth(currentMonth + parseInt(String(monthsToAdd)));
  
  return {startDate, newDate};
}

export async function sewa(formData: FormData) {
  const { startDate, newDate } = getDates(formData);

  const user_id = await formData.get('penyewa_id');
  const kamar_id = await formData.get('kamar_id');

  const detailPenyewa = {
    user_id: user_id,
    nomor_hp: String(formData.get('nomor_hp')),
    alamat: String(formData.get('alamat')),
  };
  
  const detailSewa = {
    penyewa_id: detailPenyewa.user_id,
    kamar_id: kamar_id,
    tanggal_mulai: startDate,
    tanggal_selesai: newDate,
  };

  console.log(detailPenyewa, detailSewa);
}