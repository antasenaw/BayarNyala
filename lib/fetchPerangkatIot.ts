import PerangkatIot from "@/models/PerangkatIot";
import connectDB from "./mongodb";

export async function getPerangkatIotByKamarId(kamarId: string) {
  try {
    await connectDB();
    const perangkat = await PerangkatIot.findOne({ kamar_id: kamarId });
    
    if (!perangkat) {
      return {
        success: false,
        message: 'Perangkat IoT tidak ditemukan untuk kamar ini',
        data: null
      };
    }

    return {
      success: true,
      message: 'Perangkat IoT berhasil ditemukan',
      data: JSON.parse(JSON.stringify(perangkat))
    };
  } catch (error) {
    console.error('Error fetching perangkat IoT:', error);
    return {
      success: false,
      message: 'Gagal mengambil data perangkat IoT',
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function updateStatusListrik(kamarId: string, status: boolean) {
  try {
    await connectDB();
    const perangkat = await PerangkatIot.findOneAndUpdate(
      { kamar_id: kamarId },
      { 
        status_listrik: status,
        last_seen: new Date()
      },
      { new: true }
    );

    if (!perangkat) {
      return {
        success: false,
        message: 'Perangkat IoT tidak ditemukan',
        data: null
      };
    }

    return {
      success: true,
      message: 'Status listrik berhasil diupdate',
      data: JSON.parse(JSON.stringify(perangkat))
    };
  } catch (error) {
    console.error('Error updating status listrik:', error);
    return {
      success: false,
      message: 'Gagal mengupdate status listrik',
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
