'use client';

import LoginPage from '@/app/(auth)/login/page';
import { Loading } from '@/common';
import { useMediaQuery, useSessionStorage } from '@mantine/hooks';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { firebaseAuth } from '../service';

interface IAppContext {
    user: User | null;
    isMobile: boolean;
    authenticated: any;
    setAuthenticated: Function;
}

interface IAppContextProvider {
    children: ReactNode;
}

const AppContext = createContext<IAppContext>({
    user: null,
    isMobile: false,
    authenticated: false,
    setAuthenticated: () => {},
});

export const AppContextProvider: React.FC<IAppContextProvider> = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 500px)', true, { getInitialValueInEffect: false });

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useSessionStorage({ key: 'authentication', defaultValue: false });

    useEffect(() => {
        // Subscribe to the authentication state changes
        const unsubscribe = onAuthStateChanged(firebaseAuth, user => {
            if (user) {
                // User is signed in
                setUser(user);
                setAuthenticated(true);
            } else {
                // User is signed out
                setUser(null);
                setAuthenticated(false);
            }
            // Set loading to false once authentication state is determined
            setLoading(false);
        });

        // Unsubscribe from the authentication state changes when the component is unmounted
        return () => unsubscribe();
    }, [setAuthenticated]);

    return (
        <AppContext.Provider value={{ user, authenticated, setAuthenticated, isMobile: Boolean(isMobile) }}>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loading />
                </div>
            ) : authenticated ? (
                children
            ) : (
                <LoginPage />
            )}
        </AppContext.Provider>
    );
};

export const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }

    return context;
};
