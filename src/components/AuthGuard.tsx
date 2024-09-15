import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
    children: React.ReactNode;
    fallbackRoute?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
    children,
    fallbackRoute = '/login',
}) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                loading
            </div>
        );
    }

    if (!user) {
        return <div>You must be signed in to see this.</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;
