import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tagihan from '@/models/Tagihan';
import '@/models/User';
import '@/models/Kamar';

// GET - Get tagihan by ID
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const tagihan = await Tagihan.findById(params.id)
      .populate('penyewa_id', 'nama email')
      .populate('kamar_id', 'nomor_unit harga_sewa');

    if (!tagihan) {
      return NextResponse.json(
        { success: false, error: 'Tagihan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: tagihan,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update tagihan
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const body = await request.json();
    const { jumlah_tagihan, tenggat_bayar, status_pembayaran } = body;

    const updateData: Record<string, unknown> = {};
    if (jumlah_tagihan !== undefined) {
      if (jumlah_tagihan < 0) {
        return NextResponse.json(
          { success: false, error: 'Jumlah tagihan tidak boleh negatif' },
          { status: 400 }
        );
      }
      updateData.jumlah_tagihan = jumlah_tagihan;
    }
    if (tenggat_bayar !== undefined) updateData.tenggat_bayar = new Date(tenggat_bayar);
    if (status_pembayaran !== undefined) updateData.status_pembayaran = status_pembayaran;

    const tagihan = await Tagihan.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('penyewa_id', 'nama email')
      .populate('kamar_id', 'nomor_unit harga_sewa');

    if (!tagihan) {
      return NextResponse.json(
        { success: false, error: 'Tagihan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tagihan updated successfully',
      data: tagihan,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE - Delete tagihan
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const tagihan = await Tagihan.findByIdAndDelete(params.id);

    if (!tagihan) {
      return NextResponse.json(
        { success: false, error: 'Tagihan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tagihan deleted successfully',
      data: tagihan,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
