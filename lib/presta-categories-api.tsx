import { ApiResponse, PrestaCategory } from "@/types"
import axios from "./axios"

export type ApiCategoriesData = {
    data: PrestaCategory[] | null;
    last_page: number;
    total: number;
}

export type ApiFilter = {
    field: string;
    value: string|number;
}

export const getAllPrestaCategories = async (params?: {
    search?: string;
    filters?: ApiFilter[]
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<ApiCategoriesData>> => {
    try{
        const response = await axios.get('api/prestaCategories', { params })
        return {
            data: response.data,
            success: true
        }
    }catch(error : any){
        return {
            data: null,
            success: false,
            message: error.message
        }
    }
}
