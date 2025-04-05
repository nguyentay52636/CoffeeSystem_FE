import { Header } from '@/components/Header'
import { PropsWithChildren } from 'react';
import SiderBarNavigate from '../components/SiderBarNavigate'

export default function AdminPages({ children }: PropsWithChildren) {
    return (
        <>
            <div className="flex justify-center">
                <SiderBarNavigate children={children} />
            </div>
        </>
    )
}
