'use client'

import { getAllProducts, toggleProductStatus } from "@/lib/product-api"
import { Product, filterType } from "@/types"
import { useEffect, useState } from "react"

export const useProducts = (params: {
    search?: string,
    page?: number,
    limit?: number,
    filters?: filterType[]
}) => {

    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [refresh, setRefresh] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        getAllProducts(params)
            .then((response : any) => {
                if (response.success && response.data !== null) {
                    setProducts(response.data.data)
                    setTotalPages(response.data.last_page)
                    setTotalProducts(response.data.total)
                    setIsLoading(false)
                    if(refresh)
                        setRefresh(false)
                }else{
                    setError( response.message ?? '')
                    setIsLoading(false)
                }
            })
    }, [params.search, params.page, params.limit, params.filters, refresh])

    const toggleStatus = (id: number, currentStatus: number) => {
        return toggleProductStatus(id, currentStatus)
    }
    
    return {
        products,
        isLoading,
        error,
        totalPages,
        totalProducts,
        setRefresh,
        toggleStatus
    }
}
