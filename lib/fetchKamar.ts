import { IKamar, IKamarInput } from "@/models/Kamar";
import { headers } from "next/headers";


interface ApiResponse {
  success: boolean;
  count: number;
  data: IKamar[];
}

export async function getKamar(): Promise<IKamar[]> {
  const endpoint = '/api/kamar'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!baseUrl) {
    console.error("BASE_URL is not defined in the environment.");
    return [];
  }

//   const cookieHeader: string = (await headers()).get("cookie") ?? "";
//   console.log(cookieHeader)

  const fullUrl = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        // Cookie: (await headers()).get("cookie") ?? ""x,
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
    data?: IKamar;
    error?: string;
}

export async function postKamar(newKamarData: IKamarInput): Promise<APIResponse> {
    const endpoint = '/api/kamar';
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(newKamarData), 
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

export async function deleteKamar(kamarId: string): Promise<APIResponse> {
    const endpoint = `/api/kamar/${kamarId}`;
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'DELETE',
        });

        const result = await response.json(); 

        if (!response.ok) {
            console.error(`API Error: Status ${response.status}`, result.error);
            
            const errorMessage = result.error || `Gagal menghapus (${response.status}) - Cek ID kamar.`;
            
            return { success: false, Message: errorMessage, error: result.error };
        }
        
        return { 
            success: true, 
            Message: result.message || 'Kamar berhasil dihapus.', 
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kesalahan koneksi atau server tidak merespon.";
        console.error("Network error during API call:", error);
        return { success: false, Message: `Kesalahan Jaringan: ${errorMessage}` };
    }
}

export async function editKamar(kamarId: string, updateData: IKamarInput): Promise<APIResponse> {
    const endpoint = `/api/kamar/${kamarId}`;
    
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

export async function getKamarById(kamarId: string): Promise<APIResponse> {
    
    if (!kamarId || typeof kamarId !== 'string') {
        return { 
            success: false, 
            Message: 'ID Kamar tidak valid.', 
            error: 'Invalid ID provided' 
        };
    }
    
    const endpoint = `/api/kamar/${kamarId}`;
    
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
            data: result.data as IKamar,
            Message: 'Data berhasil dimuat.'
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kesalahan koneksi atau server tidak merespon.";
        console.error(`Network error during API single item call for ID ${kamarId}:`, error);
        return { success: false, Message: `Kesalahan Jaringan: ${errorMessage}` };
    }
}