'use client'

import axios from "@/lib/axios"
import { PrestaCategory } from "@/types"
import useSWR from "swr"

export const usePrestaCategories = () => {
    const { data: prestaCategories, error, isLoading } = useSWR<PrestaCategory, Error>('/api/prestaCategories', () => 
        axios
            .get('/api/prestaCategories')
            .then(res => res.data )
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )
   
    return {
        prestaCategories,
        isLoading,
        error
    }
}
