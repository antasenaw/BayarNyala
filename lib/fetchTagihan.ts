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

export async function editTagihan(tagihanId: string, updateData: unknown): Promise<APIResponse> {
    const endpoint = `/api/tagihan/${tagihanId}`;
    console.log(updateData)
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`; 

    try {
        const response = await fetch(fullUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData), 
        });

        const result = await response.json(); 

        if (!response.ok) {
            console.error(`API Error: Status ${response.status}`, result.error);
            
            const errorMessage = result.error || `Gagal memperbarui (${response.status}) - Cek input Anda.`;
            
            return { 
                success: false, 
                Message: errorMessage, 
                error: result.error 
            };
        }
        
        return { 
            success: true, 
            Message: result.message || 'Data kamar berhasil diperbarui.',
            data: result.data
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kesalahan koneksi atau server tidak merespon.";
        console.error("Network error during API call:", error);
        return { success: false, Message: `Kesalahan Jaringan: ${errorMessage}` };
    }
}

export async function getTagihanById(tagihanId: string): Promise<APIResponse> {
    
    if (!tagihanId || typeof tagihanId !== 'string') {
        return { 
            success: false, 
            Message: 'ID Kamar tidak valid.', 
            error: 'Invalid ID provided' 
        };
    }
    
    const endpoint = `/api/tagihan/${tagihanId}`;
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`; 

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
        });

        const result = await response.json(); 

        if (!response.ok) {
            console.error(`API Error: Status ${response.status}`, result.error);
            
            const errorMessage = result.error || `Gagal mengambil data kamar (${response.status}).`;
            
            return { 
                success: false, 
                Message: errorMessage, 
                error: result.error 
            };
        }
        
        return { 
            success: true, 
            data: result.data,
            Message: 'Data berhasil dimuat.'
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kesalahan koneksi atau server tidak merespon.";
        console.error(`Network error during API single item call for ID ${tagihanId}:`, error);
        return { success: false, Message: `Kesalahan Jaringan: ${errorMessage}` };
    }
}