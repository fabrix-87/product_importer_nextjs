import { ApiResponse, Category } from "@/types"
import axios from "./axios"

export type ApiCategoriesData = {
    data: Category[] | null;
    last_page: number;
    total: number;
}

export type ApiFilter = {
    field: string;
    value: string|number;
}

export const getAllCategories = async (params: {
    search?: string;
    filters?: ApiFilter[]
    page?: number;
    pageSize?: number;
  }): Promise<ApiResponse<ApiCategoriesData>> => {
    try{
        const response = await axios.get('api/categories', { params })
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

export const getCategoryById = async (id: number) : Promise<ApiResponse<Category>> => {
    try{
        const response = await axios.get('api/categories/'+id)
        return response.data
    }catch(error : any){
        return {
            data: null,
            success: false,
            message: error.message
        }
    }
}