import {Spinner} from "@nextui-org/spinner";

const LoadingComponent = () => {
    return (
        <>
            <div className="flex min-h-screen w-full items-center justify-center">
                <Spinner label="Loading..." color="primary" />
            </div>
        </>
    )
}

export default LoadingComponent
