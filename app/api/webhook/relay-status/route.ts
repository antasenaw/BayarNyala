import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PerangkatIot from '@/models/PerangkatIot';
import '@/models/Kamar';

/**
 * Webhook endpoint untuk menerima status relay dari ESP32
 * ESP32 akan POST ke endpoint ini ketika status relay berubah
 */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { kamar_id, status_listrik } = body;

    // Validasi input
    if (!kamar_id || status_listrik === undefined) {
      return NextResponse.json(
        { success: false, error: 'kamar_id dan status_listrik wajib diisi' },
        { status: 400 }
      );
    }

    // Cari perangkat IoT berdasarkan kamar_id
    const perangkat = await PerangkatIot.findOne({ kamar_id });

    if (!perangkat) {
      return NextResponse.json(
        { success: false, error: 'Perangkat IoT tidak ditemukan untuk kamar ini' },
        { status: 404 }
      );
    }

    // Update status listrik dan last_seen
    perangkat.status_listrik = status_listrik;
    perangkat.last_seen = new Date();
    await perangkat.save();

    console.log(`[WEBHOOK] Relay status updated for kamar ${kamar_id}: ${status_listrik ? 'ON' : 'OFF'}`);

    return NextResponse.json({
      success: true,
      message: 'Status listrik berhasil diupdate',
      data: {
        kamar_id,
        status_listrik,
        last_seen: perangkat.last_seen
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[WEBHOOK] Error updating relay status:', errorMessage);
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
