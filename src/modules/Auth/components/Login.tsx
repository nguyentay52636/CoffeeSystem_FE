import React from 'react';
import { LoginForm } from '@/components/login-form';

interface LoginProps {
    onToggle: () => void;
}

export default function Login({ onToggle }: LoginProps) {
    return <LoginForm />;
}
