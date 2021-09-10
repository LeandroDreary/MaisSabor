import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithEmailAndPassword: (email: string, password: string) => Promise<void>;
    signUpWithEmailAndPassword: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        
    }, [])

    async function signInWithGoogle() {
        
    }

    async function signUpWithEmailAndPassword(name: string, email: string, password: string) {
        
    }

    async function signInWithEmailAndPassword(email: string, password: string) {
        await api.post("/login", {email, password}).then(resp => {

        })
    }

    async function signOut() {
        
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}