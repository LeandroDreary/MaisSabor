import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoadPage from "../pages/LoadPage";
import { useAuth } from "../hooks/Auth"

type AdminAuthProps = {
    children: ReactNode
}

export function AdminAuth({ children }: AdminAuthProps) {
    const { didEffect, userInfo } = useAuth()

    return (
        <>
            {userInfo?.admin ?
                <>
                    {children}
                </>
                :
                <>
                    {didEffect && <Navigate to="/" />}
                    <LoadPage />
                </>
            }
        </>
    );
}