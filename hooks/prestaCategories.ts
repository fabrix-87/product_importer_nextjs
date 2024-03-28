'use client'

import { getAllPrestaCategories } from "@/lib/presta-categories-api"
import { PrestaCategory } from "@/types"
import { useEffect, useState } from "react"

export const usePrestaCategories = () => {

    const [prestaCategories, setPrestaCategories] = useState<PrestaCategory[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsLoading(true)
        getAllPrestaCategories()
            .then((response : any) => {
                if (response.success && response.data !== null) {
                    setPrestaCategories(response.data)
                    setIsLoading(false)
                }else{
                    setError( response.message ?? '')
                    setIsLoading(false)
                }
            })
    }, [])

    
    return {
        prestaCategories,
        isLoading,
        error
    }
}
