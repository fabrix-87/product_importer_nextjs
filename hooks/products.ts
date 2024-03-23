'use client'

import { Product } from "@/types"
import axios from "@/lib/axios"

export interface productFilters {
    name: string;
    value?: string|number;
}

export const useProducts = () => {
     /*
    const getProducts = async ({
            filters = [],
            page = 1,
            limit = 25,
        } : {
            filters?: productFilters[],
            page?: number,
            limit?: number,
        }
    ) => {
       
        axios
            .get('/products', { params: {
                filters: JSON.stringify(filters),
                page: page,
                limit: limit
            }}).then((response) => {
                isLoading(false)
                return response.data
            })
        */
    const getProducts = async () => {
        return axios.get('/api/products')
    }

    return {
        getProducts
    }
}
