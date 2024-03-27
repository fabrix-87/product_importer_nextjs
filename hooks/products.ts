'use client'

import axios from "@/lib/axios"
import { getAllProducts } from "@/lib/product-api"
import { Product } from "@/types"
import { useEffect, useState } from "react"

export const useProducts = (params: {
    search?: string,
    page?: number,
    limit?: number
}) => {

    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [totalProducts, setTotalProducts] = useState<number>(0)

    useEffect(() => {
        setIsLoading(true)
        getAllProducts(params)
            .then((response : any) => {
                if (response.success && response.data !== null) {
                    setProducts(response.data.data)
                    setTotalPages(response.data.last_page)
                    setTotalProducts(response.data.total)
                    setIsLoading(false)
                }else{
                    setError( response.message ?? '')
                    setIsLoading(false)
                }
            })
    }, [params.search, params.page, params.limit])

    
    return {
        products,
        isLoading,
        error,
        totalPages,
        totalProducts
    }
}
