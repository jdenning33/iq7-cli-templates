import {
    AuthState,
    FullAuthHook,
    User,
} from '@/features/auth-full/contracts/authContract';
import { create } from 'zustand';

interface AuthStore extends AuthState {
    users: User[];
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    sendPasswordResetEmail: (email: string) => Promise<void>;
    updateProfile: (profile: Partial<User>) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    signInWithTwitter: () => Promise<void>;
    confirmEmail: (code: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
    deleteAccount: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isLoading: false,
    error: null,
    users: [],

    signUp: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { users } = get();
            if (users.some((user) => user.email === email)) {
                throw new Error('User already exists');
            }
            const newUser: User = {
                id: Date.now().toString(),
                email,
                displayName: email.split('@')[0],
            };
            set((state) => ({
                users: [...state.users, newUser],
                user: newUser,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },

    signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { users } = get();
            const user = users.find((u) => u.email === email);
            if (!user) {
                throw new Error('User not found');
            }
            set({ user, isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },

    signOut: async () => {
        set({ user: null, error: null });
    },

    sendPasswordResetEmail: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const { users } = get();
            const user = users.find((u) => u.email === email);
            if (!user) {
                throw new Error('User not found');
            }
            console.log(`Password reset email sent to ${email}`);
            set({ isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },

    updateProfile: async (profile) => {
        set({ isLoading: true, error: null });
        try {
            const { user, users } = get();
            if (!user) {
                throw new Error('No user signed in');
            }
            const updatedUser = { ...user, ...profile };
            set((state) => ({
                users: state.users.map((u) =>
                    u.id === updatedUser.id ? updatedUser : u
                ),
                user: updatedUser,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },

    signInWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
            const newUser: User = {
                id: Date.now().toString(),
                email: 'google@example.com',
                displayName: 'Google User',
            };
            set((state) => ({
                users: [...state.users, newUser],
                user: newUser,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },

    signInWithFacebook: async () => {
        set({ isLoading: true, error: null });
        try {
            const newUser: User = {
                id: Date.now().toString(),
                email: 'facebook@example.com',
                displayName: 'Facebook User',
            };
            set((state) => ({
                users: [...state.users, newUser],
                user: newUser,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },

    signInWithTwitter: async () => {
        set({ isLoading: true, error: null });
        try {
            const newUser: User = {
                id: Date.now().toString(),
                email: 'twitter@example.com',
                displayName: 'Twitter User',
            };
            set((state) => ({
                users: [...state.users, newUser],
                user: newUser,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },

    confirmEmail: async (code) => {
        console.log(`Email confirmed with code: ${code}`);
    },

    changePassword: async (oldPassword, newPassword) => {
        const { user } = get();
        if (!user) {
            throw new Error('No user signed in');
        }
        console.log(`Password changed for user: ${user.email}`);
    },

    deleteAccount: async () => {
        set({ isLoading: true, error: null });
        try {
            const { user } = get();
            if (!user) {
                throw new Error('No user signed in');
            }
            set((state) => ({
                users: state.users.filter((u) => u.id !== user.id),
                user: null,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
}));

export const useAuth: FullAuthHook = () => {
    const store = useAuthStore();
    return {
        user: store.user,
        isLoading: store.isLoading,
        error: store.error,
        signUp: store.signUp,
        signIn: store.signIn,
        signOut: store.signOut,
        sendPasswordResetEmail: store.sendPasswordResetEmail,
        updateProfile: store.updateProfile,
        signInWithGoogle: store.signInWithGoogle,
        signInWithFacebook: store.signInWithFacebook,
        signInWithTwitter: store.signInWithTwitter,
        confirmEmail: store.confirmEmail,
        changePassword: store.changePassword,
        deleteAccount: store.deleteAccount,
    };
};

export default useAuth;
