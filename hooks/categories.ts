'use client'

import { getAllCategories } from "@/lib/categories-api"
import { Category } from "@/types"
import { useEffect, useState } from "react"

export const useCategories = (params: {
    search?: string,
    page?: number,
    limit?: number
}) => {

    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalCategories, setTotalCategories] = useState<number>(0)

    useEffect(() => {
        setIsLoading(true)
        getAllCategories(params)
            .then((response : any) => {
                if (response.success && response.data !== null) {
                    setCategories(response.data.data)
                    setTotalPages(response.data.last_page)
                    setTotalCategories(response.data.total)
                    setIsLoading(false)
                }else{
                    setError( response.message ?? '')
                    setIsLoading(false)
                }
            })
    }, [params.search, params.page, params.limit])

    
    return {
        categories,
        isLoading,
        error,
        totalPages,
        totalCategories
    }
}
