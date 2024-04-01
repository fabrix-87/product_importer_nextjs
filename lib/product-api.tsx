import { ApiResponse, Product, filterType } from "@/types"
import axios from "./axios"

export type ApiProductData = {
    data: Product[] | null;
    last_page: number;
    total: number;
    filters?: filterType[]
}

export const getAllProducts = async (params: {
    search?: string;
    page?: number;
    pageSize?: number;
    filters?: filterType[]
}): Promise<ApiResponse<ApiProductData>> => {
    try {
        const response = await axios.get('api/products', { params })
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

export const getProductById = async (id: number): Promise<ApiResponse<Product>> => {
    try {
        const response = await axios.get('api/products/' + id)
        return response.data
    } catch (error: any) {
        return {
            data: null,
            success: false,
            message: error.message
        }
    }
}