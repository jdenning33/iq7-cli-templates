import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';

export const UserProfileMenu: React.FC = () => {
    const { user, signOut } = useAuth();

    if (!user) return null;

    const handleSignOut = async () => {
        try {
            await signOut();
            console.log('User signed out successfully');
            // You can add additional logic here, such as redirecting the user
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='h-8 w-8 cursor-pointer'>
                    <AvatarImage
                        src={user.photoURL || ''}
                        alt={user.displayName || ''}
                    />
                    <AvatarFallback>
                        {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserProfileMenu;
