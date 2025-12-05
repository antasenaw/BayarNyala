import { IRiwayatPembayaran } from "@/models/RiwayatPembayaran";

export interface APIResponse {
    success: boolean;
    Message: string;
    data?: IRiwayatPembayaran;
    error?: string;
}

export interface detailPembayaran {
  tagihan_id: string,
  payer_id: string,
  jumlah_bayar: number,
  metode_pembayaran: string,
  status_verifikasi: boolean,
  bukti_transfer_path?: string
}

export async function postPembayaran(detailPembayaran: detailPembayaran): Promise<APIResponse> {
    const endpoint = '/api/pembayaran';
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(detailPembayaran), 
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