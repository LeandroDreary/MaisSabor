import { createContext, ReactNode, useEffect, useState } from "react";
import api, { authorization } from "../services/api";

type User = {
    username: string;
    email: string;
    profilePicture: string;
}

type AuthContextType = {
    userInfo: User | undefined;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signIn: (usernameOrEmail: string, password: string) => Promise<void>;
    signUp: (username: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [userInfo, setUserInfo] = useState<User>()

    useEffect(() => {
        api.get("/login", { headers: { authorization } }).then(response => {
            setUserInfo(response.data.user);
        }).catch(console.error)
    }, [])

    async function signInWithGoogle() {

    }

    async function signUp(username: string, email: string, password: string) {

    }

    async function signIn(usernameOrEmail: string, password: string) {
        api.post("/login", { usernameOrEmail, password }).then(response => {
            setUserInfo(response.data.user);
            localStorage.setItem("token", response.data.token);
        }).catch(console.error)
    }

    async function signOut() {
        setUserInfo({ username: "", email: "", profilePicture: "" });
        localStorage.setItem("token", "");
    }

    return (
        <AuthContext.Provider value={{ userInfo, signInWithGoogle, signUp, signIn, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}