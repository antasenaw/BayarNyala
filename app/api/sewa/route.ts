import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sewa from '@/models/Sewa';
import '@/models/User';
import '@/models/Kamar';

// GET - Get all sewa
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const penyewa_id = searchParams.get('penyewa_id');
    const kamar_id = searchParams.get('kamar_id');
    const status = searchParams.get('status');

    // Build query filter
    const filter: Record<string, unknown> = {};
    if (penyewa_id) filter.penyewa_id = penyewa_id;
    if (kamar_id) filter.kamar_id = kamar_id;
    if (status) filter.status = status;

    const sewaList = await Sewa.find(filter)
      .populate('penyewa_id', 'nama email')
      .populate('kamar_id', 'nomor_unit harga_sewa')
      .sort({ created_at: -1 });

    return NextResponse.json({
      success: true,
      count: sewaList.length,
      data: sewaList,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create sewa
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { penyewa_id, kamar_id, tanggal_mulai, tanggal_selesai, status } = body;

    // Validasi input
    if (!penyewa_id || !kamar_id || !tanggal_mulai || !tanggal_selesai) {
      return NextResponse.json(
        { success: false, error: 'Penyewa ID, Kamar ID, tanggal mulai, dan tanggal selesai wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi tanggal
    const mulai = new Date(tanggal_mulai);
    const selesai = new Date(tanggal_selesai);

    if (selesai <= mulai) {
      return NextResponse.json(
        { success: false, error: 'Tanggal selesai harus setelah tanggal mulai' },
        { status: 400 }
      );
    }

    // Create sewa
    const sewa = await Sewa.create({
      penyewa_id,
      kamar_id,
      tanggal_mulai: mulai,
      tanggal_selesai: selesai,
      status: status || 'menunggu pembayaran',
    });

    await sewa.populate('penyewa_id', 'nama email');
    await sewa.populate('kamar_id', 'nomor_unit harga_sewa');

    return NextResponse.json({
      success: true,
      message: 'Sewa created successfully',
      data: sewa,
    }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
