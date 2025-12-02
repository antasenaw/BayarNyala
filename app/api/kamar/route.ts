import {  NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Kamar from "@/models/Kamar";
import "@/models/User";  // ← TAMBAHKAN INI untuk register model User
import { getUserIdFromSession, getUserRole } from "@/lib/getUser";

export async function GET(){
    try {
        await connectDB();

        const userRole = await getUserRole();
        console.log(userRole)
        
        const filter = async () => {
            if (userRole === 'Admin') {
                const userId = await getUserIdFromSession();
                return { managed_by: userId }
            } else {
                return {}
            }
        }

        const kamarList = await Kamar.find(await filter())
        .populate("managed_by", "nama email role")  // ← PERBAIKI: "managed_by" bukan "Manage By"
        .sort({ nomor_unit: 1 });

        return NextResponse.json({
            success: true,
            count: kamarList.length,
            data: kamarList,
        });

    } catch(error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
        try {
            await connectDB();

            const body = await request.json();
            const { nomor_unit, harga_sewa, managed_by, status_ketersediaan } = body;

            if (!nomor_unit || !harga_sewa || !managed_by) {
                return NextResponse.json(
                    { success: false, error: "Semua field wajib diisi" },
                    { status: 400 }
                );
            }

            if (harga_sewa <= 0) {
                return NextResponse.json(
                    { success: false, error: "Harga sewa harus lebih dari 0, yang logis dek kalo ngisi" },
                    { status: 400 }
                );
            }

            const kamar = await Kamar.create({
                nomor_unit,
                harga_sewa,
                status_ketersediaan: status_ketersediaan ?? true,
                managed_by,
            });

            await Kamar.populate(kamar, { path: "managed_by", select: "nama email" });

            return NextResponse.json({
                success: true,
                Message: 'Kamar berhasil dibuat',
                data: kamar,
            }, { status: 201 });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return NextResponse.json(
                { success: false, error: errorMessage },
                { status: 500 }
            );
        }
    }