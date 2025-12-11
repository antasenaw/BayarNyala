import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Sewa from '@/models/Sewa';
import '@/models/User';
import '@/models/Kamar';
import { publishSewaExpiry, publishRelayControl } from '@/lib/mqttClient';

// GET - Get sewa by ID
export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const sewa = await Sewa.findById(params.id)
      .populate('penyewa_id', 'nama email')
      .populate('kamar_id', 'nomor_unit harga_sewa');

    if (!sewa) {
      return NextResponse.json(
        { success: false, error: 'Sewa tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: sewa,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// PUT - Update sewa
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const body = await request.json();
    const { tanggal_mulai, tanggal_selesai, status } = body;

    const updateData: Record<string, unknown> = {};
    if (tanggal_mulai !== undefined) updateData.tanggal_mulai = new Date(tanggal_mulai);
    if (tanggal_selesai !== undefined) updateData.tanggal_selesai = new Date(tanggal_selesai);
    if (status !== undefined) updateData.status = status;

    const sewa = await Sewa.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('penyewa_id', 'nama email')
      .populate('kamar_id', 'nomor_unit harga_sewa');

    if (!sewa) {
      return NextResponse.json(
        { success: false, error: 'Sewa tidak ditemukan' },
        { status: 404 }
      );
    }

    // Kirim update ke ESP32 jika status berubah menjadi aktif atau selesai
    if (status !== undefined) {
      try {
        const kamarId = typeof sewa.kamar_id === 'object' && '_id' in sewa.kamar_id
          ? sewa.kamar_id._id.toString()
          : sewa.kamar_id.toString();

        if (status === 'aktif') {
          await publishSewaExpiry(kamarId, sewa.tanggal_selesai, 'aktif');
          await publishRelayControl(kamarId, true); // Hidupkan listrik
          console.log(`Sewa activated - expiry date sent to ESP32 for kamar ${kamarId}`);
        } else if (status === 'selesai') {
          await publishSewaExpiry(kamarId, sewa.tanggal_selesai, 'selesai');
          await publishRelayControl(kamarId, false); // Matikan listrik
          console.log(`Sewa ended - relay turned off for kamar ${kamarId}`);
        }
      } catch (mqttError) {
        console.error('MQTT error:', mqttError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Sewa updated successfully',
      data: sewa,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// DELETE - Delete sewa
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const params = await props.params;
    const sewa = await Sewa.findByIdAndDelete(params.id);

    if (!sewa) {
      return NextResponse.json(
        { success: false, error: 'Sewa tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sewa deleted successfully',
      data: sewa,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
