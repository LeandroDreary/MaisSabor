import { createContext, ReactNode, useEffect, useState } from "react";
import api, { authorization } from "../services/api";

type User = {
    username: string;
    email: string;
    profilePicture?: string;
    admin: boolean;
}

type AuthContextType = {
    userInfo?: User;
    didEffect: boolean;
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
    const [didEffect, setDidEffect] = useState<boolean>(false)

    useEffect(() => {
        if (localStorage.getItem('token'))
            api.get("/login", { headers: { authorization } }).then(response => {
                setUserInfo(response.data.user);
            }).catch(err => { console.error(err); throw err }).finally(() => setDidEffect(true))
    }, [])

    async function signInWithGoogle() {

    }

    async function signUp(username: string, email: string, password: string) {
        return api.post("/users", { username, password, email, link: username, profilePicture: "" }).then(() => {
            return api.post("/login", { usernameOrEmail: username, password }).then(response => {
                setUserInfo(response.data.user);
                localStorage.setItem("token", response.data.token);
            }).catch(err => { console.error(err); throw err })
        }).catch(err => { console.error(err); throw err })
    }

    async function signIn(usernameOrEmail: string, password: string) {
        return api.post("/login", { usernameOrEmail, password }).then(response => {
            setUserInfo(response.data.user);
            localStorage.setItem("token", response.data.token);
        }).catch(err => { console.error(err); throw err; })
    }

    async function signOut() {
        setUserInfo(undefined);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ didEffect, userInfo, signInWithGoogle, signUp, signIn, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}