import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Kamar from '@/models/Kamar';
import '@/models/User';  // ← TAMBAHKAN INI juga

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const params = await props.params;
        const kamar = await Kamar.findById(params.id)
        .populate('managed_by', 'nama email');

        if(!kamar) {
            return NextResponse.json(
                { success: false, error: 'Kamar tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: kamar,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }

}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const params = await props.params;

        // Debug: Log ID yang diterima
        console.log('Received ID:', params.id);

        const body = await request.json();
        const { nomor_unit, harga_sewa, managed_by, status_ketersediaan, detail_kamar } = body;

        // Debug: Log body yang diterima
        console.log('Request body:', body);

        if(harga_sewa !== undefined && harga_sewa <= 0) {
            return NextResponse.json(
                { success: false, error: 'Harga sewa harus lebih dari 0, yang logis dek kalo ngisi' },
                { status: 400 }
            );
        }

        const updateData: Record<string, unknown> = {};
        if (nomor_unit !== undefined) updateData.nomor_unit = nomor_unit;
        if (harga_sewa !== undefined) updateData.harga_sewa = harga_sewa;
        if (managed_by !== undefined) updateData.managed_by = managed_by;
        if (status_ketersediaan !== undefined) updateData.status_ketersediaan = status_ketersediaan;
        if (detail_kamar !== undefined) updateData.detail_kamar = detail_kamar;

        // Debug: Log data yang akan diupdate
        console.log('Update data:', updateData);

        const kamar = await Kamar.findByIdAndUpdate(params.id, updateData, { new: true, runValidators: true }).populate('managed_by', 'nama email');

        // Debug: Log hasil query
        console.log('Result:', kamar);

        if(!kamar) {
            return NextResponse.json(
                { success: false, error: 'Kamar tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Kamar updated successfully',
            data: kamar,
        });

    } catch (error) {
        // Debug: Log error detail
        console.error('PUT Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const params = await props.params;
        const kamar = await Kamar.findByIdAndDelete(params.id);

        if(!kamar) {
            return NextResponse.json(
                { success: false, error: 'Kamar tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Kamar berhasil dihapus',
        });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}