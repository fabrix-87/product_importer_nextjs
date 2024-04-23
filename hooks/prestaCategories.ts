'use client'

import axios from "@/lib/axios"
import { PrestaCategory } from "@/types"
import useSWR from "swr"

export const usePrestaCategories = () => {
    const { data: prestaCategories = [], error, isLoading } = useSWR<PrestaCategory[], Error>(
      '/api/prestaCategories',
      async () => {
        const response = await axios.get('/api/prestaCategories');
        return response.data;
      },
      {
        onError: (error) => {
          // Handle errors (optional)
          console.error('Error fetching prestaCategories:', error);
          return []; // Return an empty array in case of error
        },
        // Optional SWR configuration (e.g., revalidateOnFocus, dedupingInterval)
      }
    );
  
    return { prestaCategories, isLoading, error };
  };
