// auth-contract.ts

export interface User {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
}

export interface AuthMethods {
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    sendPasswordResetEmail: (email: string) => Promise<void>;
    updateProfile: (profile: Partial<User>) => Promise<void>;
}

export interface AuthHook {
    (): AuthState & AuthMethods;
}

export interface SocialAuthMethods {
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    signInWithTwitter: () => Promise<void>;
}

export interface AdvancedAuthMethods {
    confirmEmail: (code: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
    deleteAccount: () => Promise<void>;
}

export interface FullAuthHook extends AuthHook {
    (): AuthState & AuthMethods & SocialAuthMethods & AdvancedAuthMethods;
}
