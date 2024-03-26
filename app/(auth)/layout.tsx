import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import { Logo } from '@/components/icons'

export const metadata = {
    title: 'Importer - Login',
}

const Layout = ({ children } : {children: React.ReactNode}) => {
    return (
        <div>
            <div className="font-sans text-gray-900 antialiased">
                <AuthCard
                    logo={
                        <Link href="/">
                            <Logo className="w-20 h-20 fill-current text-gray-500" />
                        </Link>
                    }>
                    {children}
                </AuthCard>
            </div>
        </div>
    )
}

export default Layout