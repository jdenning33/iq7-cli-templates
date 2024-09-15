'use client';
import AuthGuard from '@/components/AuthGuard';
import { SignUpComponent } from '@/components/SignUpComponent';
import UserProfileMenu from '@/components/UserProfileMenu';

export default function Home() {
    return (
        <div className=''>
            <main className='flex flex-col gap-8 items-center sm:items-start relative'>
                <SignUpComponent />
                <UserProfileMenu />
                <AuthGuard>
                    <div className='flex flex-col gap-4 items-center sm:items-start'>
                        <h1 className='text-3xl font-bold'>
                            Welcome to the app!
                        </h1>
                        <p className='text-lg'>
                            You are signed in. You can now access all the
                            features of the app.
                        </p>
                    </div>
                </AuthGuard>
            </main>
            <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
        </div>
    );
}
