

import { PropsWithChildren } from 'react';
import { LoginForm } from '@/components/login-form';
export default function AuthPages({ children }: PropsWithChildren) {
    return (
        <div >
            <LoginForm />
        </div>
    )
}
