export interface AuthCardProps {
	children: React.ReactNode;
	logo?: React.ReactNode;
}


const AuthCard = ({ logo, children } : AuthCardProps) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <div>{logo}</div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-100 shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
