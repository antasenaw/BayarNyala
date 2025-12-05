import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import RiwayatPembayaran from '@/models/RiwayatPembayaran';
import '@/models/User';
import '@/models/Tagihan';

// GET - Get all riwayat pembayaran
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const tagihan_id = searchParams.get('tagihan_id');
    const payer_id = searchParams.get('payer_id');
    const status_verifikasi = searchParams.get('status_verifikasi');
    const metode_pembayaran = searchParams.get('metode_pembayaran');

    // Build query filter
    const filter: Record<string, unknown> = {};
    if (tagihan_id) filter.tagihan_id = tagihan_id;
    if (payer_id) filter.payer_id = payer_id;
    if (status_verifikasi !== null) filter.status_verifikasi = status_verifikasi === 'true';
    if (metode_pembayaran) filter.metode_pembayaran = metode_pembayaran;

    const pembayaranList = await RiwayatPembayaran.find(filter)
      .populate('tagihan_id')
      .populate('payer_id', 'nama email')
      .populate('verified_by', 'nama email')
      .sort({ tanggal_bayar: -1 });

    return NextResponse.json({
      success: true,
      count: pembayaranList.length,
      data: pembayaranList,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create riwayat pembayaran
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { 
      tagihan_id, 
      payer_id, 
      jumlah_bayar, 
      metode_pembayaran, 
      bukti_transfer_path
    } = body;

    // Validasi input
    if (!tagihan_id || !payer_id || !jumlah_bayar || !metode_pembayaran) {
      return NextResponse.json(
        { success: false, error: 'Tagihan ID, Payer ID, jumlah bayar, dan metode pembayaran wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi jumlah bayar
    if (jumlah_bayar < 0) {
      return NextResponse.json(
        { success: false, error: 'Jumlah bayar tidak boleh negatif' },
        { status: 400 }
      );
    }

    // Validasi bukti transfer untuk metode Transfer
    if (metode_pembayaran === 'Transfer' && !bukti_transfer_path) {
      return NextResponse.json(
        { success: false, error: 'Bukti transfer wajib diisi untuk metode Transfer' },
        { status: 400 }
      );
    }

    // Create pembayaran
    const pembayaran = await RiwayatPembayaran.create({
      tagihan_id,
      payer_id,
      jumlah_bayar,
      metode_pembayaran,
      bukti_transfer_path: bukti_transfer_path || undefined,
      status_verifikasi: false,
    });

    await pembayaran.populate('tagihan_id');
    await pembayaran.populate('payer_id', 'nama email');

    return NextResponse.json({
      success: true,
      message: 'Pembayaran created successfully',
      data: pembayaran,
    }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
