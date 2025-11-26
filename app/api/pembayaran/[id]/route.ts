import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import RiwayatPembayaran from '@/models/RiwayatPembayaran';
import '@/models/User';
import '@/models/Tagihan';

// GET - Get pembayaran by ID
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const pembayaran = await RiwayatPembayaran.findById(params.id)
      .populate('tagihan_id')
      .populate('payer_id', 'nama email')
      .populate('verified_by', 'nama email');

    if (!pembayaran) {
      return NextResponse.json(
        { success: false, error: 'Pembayaran tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pembayaran,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update/Verify pembayaran
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const body = await request.json();
    const { status_verifikasi, verified_by } = body;

    const updateData: Record<string, unknown> = {};

    // Jika verifikasi pembayaran
    if (status_verifikasi !== undefined) {
      updateData.status_verifikasi = status_verifikasi;
      
      if (status_verifikasi === true) {
        if (!verified_by) {
          return NextResponse.json(
            { success: false, error: 'Verified by (admin ID) wajib diisi untuk verifikasi' },
            { status: 400 }
          );
        }
        updateData.verified_by = verified_by;
        updateData.verified_at = new Date();
      }
    }

    const pembayaran = await RiwayatPembayaran.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('tagihan_id')
      .populate('payer_id', 'nama email')
      .populate('verified_by', 'nama email');

    if (!pembayaran) {
      return NextResponse.json(
        { success: false, error: 'Pembayaran tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pembayaran updated successfully',
      data: pembayaran,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE - Delete pembayaran
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const pembayaran = await RiwayatPembayaran.findByIdAndDelete(params.id);

    if (!pembayaran) {
      return NextResponse.json(
        { success: false, error: 'Pembayaran tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Pembayaran deleted successfully',
      data: pembayaran,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
