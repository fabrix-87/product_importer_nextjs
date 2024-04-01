"use client"

import axios from "@/lib/axios"
import { Supplier } from "@/types"
import { useEffect, useState } from "react"

export const useSuppliers = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [totalSuppliers, setTotalSuppliers] = useState(0)

    useEffect( () => {
        try{
            axios.get('api/suppliers')
                .then( (response) => {
                    setSuppliers(response.data.suppliers)
                    setTotalSuppliers(response.data.total)
                })
        }catch(err){
            console.log(err)
        }
    },[])

    return { suppliers, totalSuppliers }
}