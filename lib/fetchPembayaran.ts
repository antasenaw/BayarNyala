import { IRiwayatPembayaran } from "@/models/RiwayatPembayaran";
import { headers } from "next/headers";

interface ApiResponse {
  success: boolean;
  count: number;
  data: IRiwayatPembayaran[];
}

export async function getPembayaran(): Promise<IRiwayatPembayaran[]> {
  const endpoint = '/api/pembayaran'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl) {
    console.error("BASE_URL is not defined in the environment.");
    return [];
  }

  const cookieHeader = (await headers()).get("cookie") ?? "";

  const fullUrl = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        Cookie: cookieHeader,
    },
      cache: 'no-store',
      // next: { 
      //   revalidate: 60,
      //   tags: ['kamar-list']
      // }
    });

    if (!response.ok) {
      console.error(`API Error: Status ${response.status} for ${fullUrl}`);
      throw new Error(`Failed to fetch data, status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
        console.error("API returned success: false", result);
        return [];
    }

    return result.data;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown fetching error";
    console.error(`[Data Fetcher] Failed to fetch data from ${fullUrl}: ${errorMessage}`);
    return []; 
  }
}

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