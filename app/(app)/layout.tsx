'use client'
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/hooks/auth";
import Loading from "../../components/Loading";

const Layout = ({ 
    children,
}: {
	children: React.ReactNode;
}) => {
    const { isAuthenticated } = useAuth({ middleware: 'auth' })

    if (!isAuthenticated) {
        return <Loading />
    }

    return (
        <>
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
                {children}
            </main>
        </>
    )
}

export default Layout
