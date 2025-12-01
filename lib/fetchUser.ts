import { IUser } from "@/models/User";

export interface NewUserData {
  nama: string,
  email: string,
  password: string,
  role: string
}

export interface APIResponse {
    success: boolean;
    Message: string;
    user?: IUser;
    error?: string;
}

export async function getUserById(userId: string): Promise<APIResponse> {
    
    if (!userId || typeof userId !== 'string') {
        return { 
            success: false, 
            Message: 'ID user tidak valid.', 
            error: 'Invalid ID provided' 
        };
    }
    
    const endpoint = `/api/users/${userId}`;
    
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
            user: result.data as IUser,
            Message: 'User berhasil dimuat.'
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kesalahan koneksi atau server tidak merespon.";
        console.error(`Network error during API single item call for ID ${userId}:`, error);
        return { success: false, Message: `Kesalahan Jaringan: ${errorMessage}` };
    }
}

export async function postUser(newUserData: NewUserData): Promise<APIResponse> {
    const endpoint = '/api/users';
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL; 
    const fullUrl = `${baseUrl}${endpoint}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(newUserData), 
        });

        const result = await response.json(); 

        if (!response.ok) {
            console.error(`API Error: Status ${response.status}`, result.error);
            const errorMessage = result.error || `Gagal (${response.status}) - Cek input Anda.`;
            return { success: false, Message: errorMessage, error: result.error };
        }
        
        return { 
            success: true, 
            Message: result.Message || 'User berhasil disimpan.', 
            user: result.data 
        };

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Kesalahan koneksi atau server tidak merespon.";
        console.error("Network error during API call:", error);
        return { success: false, Message: `Kesalahan Jaringan: ${errorMessage}` };
    }
}