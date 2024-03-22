'use client'
import { useEffect } from 'react';
import { User } from '@/types'; // Dichiara l'interfaccia utente qui
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

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async (email: string, password: string, setErrors: (errors: string[]) => void) => {
        await csrf()

        setErrors([])

        axios
            .post('/login', {email: email, password: password})
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
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
        if (middleware === 'auth' && error) logout()
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

