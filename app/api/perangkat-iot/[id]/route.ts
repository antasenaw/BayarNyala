import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PerangkatIot from '@/models/PerangkatIot';
import '@/models/Kamar';

// GET - Get perangkat IoT by ID
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const perangkat = await PerangkatIot.findById(params.id)
      .populate('kamar_id', 'nomor_unit harga_sewa');

    if (!perangkat) {
      return NextResponse.json(
        { success: false, error: 'Perangkat IoT tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: perangkat,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update perangkat IoT
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const body = await request.json();
    const { device_name, status_listrik } = body;

    const updateData: Record<string, unknown> = {};
    if (device_name !== undefined) updateData.device_name = device_name;
    if (status_listrik !== undefined) {
      updateData.status_listrik = status_listrik;
      updateData.last_seen = new Date(); // Update last_seen saat status berubah
    }

    const perangkat = await PerangkatIot.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('kamar_id', 'nomor_unit harga_sewa');

    if (!perangkat) {
      return NextResponse.json(
        { success: false, error: 'Perangkat IoT tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Perangkat IoT updated successfully',
      data: perangkat,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE - Delete perangkat IoT
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const perangkat = await PerangkatIot.findByIdAndDelete(params.id);

    if (!perangkat) {
      return NextResponse.json(
        { success: false, error: 'Perangkat IoT tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Perangkat IoT deleted successfully',
      data: perangkat,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
