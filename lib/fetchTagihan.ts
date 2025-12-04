import { ITagihan } from "@/models/Tagihan";
import { headers } from "next/headers";

export interface APIResponse {
    success: boolean;
    Message: string;
    data?: ITagihan;
    error?: string;
}

type detailTagihan = {
    kamar_id: string;
    penyewa_id: string;
    jumlah_tagihan: number | undefined;
    tenggat_bayar: Date;
    status_pembayaran: string;
}

interface ApiResponse {
  success: boolean;
  count: number;
  data: ITagihan[];
}

export async function getTagihan(): Promise<ITagihan[]> {
  const endpoint = '/api/tagihan'
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

export async function postTagihan(detailTagihan: detailTagihan): Promise<APIResponse> {
    const endpoint = '/api/tagihan';
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(detailTagihan), 
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