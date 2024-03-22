'use client'
import { redirect, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import Loading from "@/components/Loading";

export default function Home() {
	const { isAuthenticated } = useAuth({middleware: 'auth'})

	if (!isAuthenticated) {
        return <Loading />
    }

	redirect('/dashboard')
}
