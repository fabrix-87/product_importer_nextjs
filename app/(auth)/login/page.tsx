'use client'
//import InputError from '@/components/InputError'

import Link from 'next/link'
import { useState } from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useAuth } from '@/hooks/auth'

const Login = () => {
    const { login } = useAuth({middleware: 'guest', redirectIfAuthenticated: '/dashboard'});

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const submitForm = async () => {
        login(email, password, setErrors, setIsLoading)
    }

    return (
        <>            
            <form>
                {/* Email Address */}
                <div>
                    <Input
                        id="email"
                        type="email"
                        label="Email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />                    
                </div>

                {/* Password */}
                <div className="mt-4">
                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        value={password}
                        className="block mt-1 w-full"
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                {/* Remember Me */}
                <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href="/forgot-password"
                        className="underline text-sm text-gray-600 hover:text-gray-900">
                        Forgot your password?
                    </Link>

                    <Button 
                        className="ml-3"
                        isLoading={isLoading}
                        onPress={submitForm}>
                            Login
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Login
