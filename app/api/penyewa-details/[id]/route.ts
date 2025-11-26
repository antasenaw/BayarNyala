import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PenyewaDetails from '@/models/PenyewaDetails';
import '@/models/User';

// GET - Get penyewa details by ID
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const penyewaDetails = await PenyewaDetails.findById(params.id)
      .populate('user_id', 'nama email role');

    if (!penyewaDetails) {
      return NextResponse.json(
        { success: false, error: 'Penyewa details tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
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

// PUT - Update penyewa details
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const body = await request.json();
    const { nomor_hp, alamat } = body;

    const updateData: Record<string, unknown> = {};
    if (nomor_hp !== undefined) updateData.nomor_hp = nomor_hp;
    if (alamat !== undefined) updateData.alamat = alamat;

    const penyewaDetails = await PenyewaDetails.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user_id', 'nama email role');

    if (!penyewaDetails) {
      return NextResponse.json(
        { success: false, error: 'Penyewa details tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Penyewa details updated successfully',
      data: penyewaDetails,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE - Delete penyewa details
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const penyewaDetails = await PenyewaDetails.findByIdAndDelete(params.id);

    if (!penyewaDetails) {
      return NextResponse.json(
        { success: false, error: 'Penyewa details tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Penyewa details deleted successfully',
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
