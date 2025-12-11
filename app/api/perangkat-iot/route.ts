import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PerangkatIot from '@/models/PerangkatIot';
import '@/models/Kamar';
import { publishRelayControl } from '@/lib/mqttClient';

// GET - Get all perangkat IoT
export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const kamar_id = searchParams.get('kamar_id');
    const status_listrik = searchParams.get('status_listrik');

    // Build query filter
    const filter: Record<string, unknown> = {};
    if (kamar_id) filter.kamar_id = kamar_id;
    if (status_listrik !== null) filter.status_listrik = status_listrik === 'true';

    const perangkatList = await PerangkatIot.find(filter)
      .populate('kamar_id', 'nomor_unit harga_sewa')
      .sort({ last_seen: -1 });

    return NextResponse.json({
      success: true,
      count: perangkatList.length,
      data: perangkatList,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create perangkat IoT
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { device_name, kamar_id, status_listrik } = body;

    // Validasi input
    if (!device_name || !kamar_id) {
      return NextResponse.json(
        { success: false, error: 'Device name dan Kamar ID wajib diisi' },
        { status: 400 }
      );
    }

    // Create perangkat IoT
    const perangkat = await PerangkatIot.create({
      device_name,
      kamar_id,
      status_listrik: status_listrik ?? false,
      last_seen: new Date(),
    });

    await perangkat.populate('kamar_id', 'nomor_unit harga_sewa');

    return NextResponse.json({
      success: true,
      message: 'Perangkat IoT created successfully',
      data: perangkat,
    }, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
