'use client'

import { getAllCategories, syncPrestaCategories } from "@/lib/categories-api"
import { Category, filterType } from "@/types"
import { useEffect, useState } from "react"

export const useCategories = (params: {
    search?: string,
    page?: number,
    limit?: number
    filters?: filterType[]
}) => {

    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalCategories, setTotalCategories] = useState<number>(0)
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        getAllCategories(params)
            .then((response: any) => {
                if (response.success && response.data !== null) {
                    setCategories(response.data.data)
                    setTotalPages(response.data.last_page)
                    setTotalCategories(response.data.total)
                    setIsLoading(false)
                    if(refresh)
                        setRefresh(false)
                } else {
                    setError(response.message ?? '')
                    setIsLoading(false)
                }
            })
    }, [params.search, params.page, params.limit, params.filters, refresh])

    const syncCategories = (
        id: number,
        newCategories: number[]
    ): boolean => {
        syncPrestaCategories(id, newCategories)
            .then((response: any) => {
                if (response.success) {
                    return true
                } else {
                    console.error(response.message ?? '')
                }
            })
        return false
    }


    return {
        categories,
        isLoading,
        error,
        totalPages,
        totalCategories,
        syncCategories,
        setRefresh
    }
}
