'use client'
import { useEffect } from 'react';
import { ErrorData, User } from '@/types'; // Dichiara l'interfaccia utente qui
import axios from '@/lib/axios';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

export const useAuth = (
    {
        middleware = '',
        redirectIfAuthenticated = '',
    }: {
        middleware?: string;
        redirectIfAuthenticated?: string;
    }
) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR<User, Error>('/api/user', async () => 
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie').then( (response) => response)

    const login = async (
        email: string, 
        password: string, 
        remember: boolean,
        setErrors: (errors: ErrorData|null) => void, 
        isLoading: (isLoading: boolean) => void
    ) => {
        isLoading(true)
        await csrf()
        setErrors(null)

        axios
            .post('/login', {email, password, remember})
            .then(() => {
                mutate()
                isLoading(false)
                setErrors({status:200, message: 'success'})
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
                isLoading(false)
                setErrors({status:422, message: error.response.data.message})
            })
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    const isAuthenticated = !!user;

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && isAuthenticated)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) 
            logout()
        //router.push(redirectIfAuthenticated)
    }, [user, error])

    const getError = () => {
        return error;
    }

    return {
        login,
        logout,
        getError,
        isAuthenticated,
        user
    }          
}

