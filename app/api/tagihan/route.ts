import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tagihan from '@/models/Tagihan';
import '@/models/User';
import '@/models/Kamar';
import { getUserIdFromSession, getUserRole } from '@/lib/getUser';

// GET - Get all tagihan
export async function GET(/*request: Request*/) {
  try {
    await connectDB();

    const user_id = await getUserIdFromSession();
    const user_role = await getUserRole();
    console.log(user_id, user_role)

    const filter = async () => {
      if (user_role === 'Admin') {
        return {};
      } else {
        return {penyewa_id: user_id}
      };
    }

    // const { searchParams } = new URL(request.url);
    // const penyewa_id = searchParams.get('penyewa_id');
    // const kamar_id = searchParams.get('kamar_id');
    // const status_pembayaran = searchParams.get('status_pembayaran');

    // // Build query filter
    // const filter: Record<string, unknown> = {};
    // if (penyewa_id) filter.penyewa_id = penyewa_id;
    // if (kamar_id) filter.kamar_id = kamar_id;
    // if (status_pembayaran) filter.status_pembayaran = status_pembayaran;

    const tagihanListUnfiltered = await Tagihan.find(await filter())
      .populate('penyewa_id', 'nama email')
      .populate('kamar_id', 'nomor_unit harga_sewa managed_by')
      .sort({ bulan_tahun: -1 });

      let tagihanList;

      if (user_role === 'Admin') { 
        tagihanList = await tagihanListUnfiltered.filter(t => Object(t.kamar_id).managed_by.toString() === user_id)
      } else {
        tagihanList =  await tagihanListUnfiltered;
      }

    return NextResponse.json({
      success: true,
      count: tagihanList.length,
      data: tagihanList
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST - Create tagihan
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { kamar_id, penyewa_id, jumlah_tagihan, tenggat_bayar, status_pembayaran } = body;

    // Validasi input
    if (!kamar_id || !penyewa_id || !jumlah_tagihan || !tenggat_bayar) {
      return NextResponse.json(
        { success: false, error: 'Kamar ID, Penyewa ID, bulan tahun, jumlah tagihan, dan tenggat bayar wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi jumlah tagihan
    if (jumlah_tagihan < 0) {
      return NextResponse.json(
        { success: false, error: 'Jumlah tagihan tidak boleh negatif' },
        { status: 400 }
      );
    }

    // Create tagihan
    const tagihan = await Tagihan.create({
      kamar_id,
      penyewa_id,
      jumlah_tagihan,
      tenggat_bayar: new Date(tenggat_bayar),
      status_pembayaran: status_pembayaran || 'Belum Lunas',
    });

    await tagihan.populate('penyewa_id', 'nama email');
    await tagihan.populate('kamar_id', 'nomor_unit harga_sewa');

    return NextResponse.json({
      success: true,
      message: 'Tagihan created successfully',
      data: tagihan,
    }, { status: 201 });
  } catch (error) {
    // Handle duplicate tagihan per kamar per bulan
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Tagihan untuk kamar dan bulan ini sudah ada' },
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
