
import { PropsWithChildren, useState } from 'react';
import SiderBarNavigate from '../components/SiderBarNavigate'
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Outlet } from 'react-router-dom';

export default function AdminPages({ children }: PropsWithChildren) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <SidebarProvider>
            <SiderBarNavigate children={children} />
            <main className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto bg-gray-100">
                <div className="flex items-center gap-2 my-12">
                </div>
                {children || <Outlet />}
            </main>
        </SidebarProvider>
    )
}
