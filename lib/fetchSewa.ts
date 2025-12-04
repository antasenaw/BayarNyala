import { ISewa } from "@/models/Sewa";

export interface APIResponse {
    success: boolean;
    Message: string;
    data?: ISewa;
    error?: string;
}

type detailSewa = {
    penyewa_id: string;
    kamar_id: string;
    tanggal_mulai: Date;
    tanggal_selesai: Date;
    status: string;
}

export async function postSewa(detailSewa: detailSewa): Promise<APIResponse> {
    const endpoint = '/api/sewa';
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(detailSewa), 
        });

        const result = await response.json(); 

        if (!response.ok) {
            console.error(`API Error: Status ${response.status}`, result.error);
            const errorMessage = result.error || `Gagal (${response.status}) - Cek input Anda.`;
            return { success: false, Message: errorMessage, error: result.error };
        }
        
        return { 
            success: true, 
            Message: result.Message || 'Data berhasil disimpan.', 
            data: result.data 
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kesalahan koneksi atau server tidak merespon.";
        console.error("Network error during API call:", error);
        return { success: false, Message: `Kesalahan Jaringan: ${errorMessage}` };
    }
}