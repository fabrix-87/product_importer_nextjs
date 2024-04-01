import { ApiResponse, Category, filterType } from "@/types"
import axios from "./axios"

export type ApiCategoriesData = {
    data: Category[] | null;
    last_page: number;
    total: number;
}

export const getAllCategories = async (params: {
    search?: string;
    filters?: filterType[]
    page?: number;
    pageSize?: number;
}): Promise<ApiResponse<ApiCategoriesData>> => {
    try {
        const response = await axios.get('api/categories', { params })
        return {
            data: response.data,
            success: true
        }
    } catch (error: any) {
        return {
            data: null,
            success: false,
            message: error.message
        }
    }
}

export const getCategoryById = async (id: number): Promise<ApiResponse<Category>> => {
    try {
        const response = await axios.get('api/categories/' + id)
        return response.data
    } catch (error: any) {
        return {
            data: null,
            success: false,
            message: error.message
        }
    }
}

export const syncPrestaCategories = async (
    id: number,
    categories: number[]
): Promise<ApiResponse<Category>> => {
    try {
        const response = await axios.patch('api/categories/' + id, { categories })
        return response.data
    } catch (error: any) {
        return {
            data: null,
            success: false,
            message: error.message
        }
    }
}