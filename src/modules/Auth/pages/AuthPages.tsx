import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
export default function AuthPages({ children }: PropsWithChildren) {
    return (
        <>
            {children || <Outlet />}
        </>
    )
}
