import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PenyewaDetails from '@/models/PenyewaDetails';
import '@/models/User';

// GET - Get all penyewa details
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    // Build query filter
    const filter: Record<string, unknown> = {};
    if (user_id) {
      filter.user_id = user_id;
    }

    const penyewaDetails = await PenyewaDetails.find(filter)
      .populate('user_id', 'nama email role')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: penyewaDetails.length,
      data: penyewaDetails,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create penyewa details
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { user_id, nomor_hp, alamat } = body;

    // Validasi input
    if (!user_id || !nomor_hp || !alamat) {
      return NextResponse.json(
        { success: false, error: 'User ID, nomor HP, dan alamat wajib diisi' },
        { status: 400 }
      );
    }

    // Create penyewa details
    const penyewaDetails = await PenyewaDetails.create({
      user_id,
      nomor_hp,
      alamat,
    });

    await penyewaDetails.populate('user_id', 'nama email role');

    return NextResponse.json({
      success: true,
      message: 'Penyewa details created successfully',
      data: penyewaDetails,
    }, { status: 201 });
  } catch (error) {
    // Handle duplicate user_id error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'User sudah memiliki detail penyewa' },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
