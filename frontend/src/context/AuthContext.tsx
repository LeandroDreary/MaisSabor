import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

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
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log(user)

            if (user) {
                const { displayName, photoURL, uid } = user

                console.log(user)

                if (!displayName) {
                    throw new Error("Missing informations from Account.");
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL || ""
                })
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName) {
                throw new Error("Missing informations from Google Account.");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL || ""
            })
        }
    }

    async function signUpWithEmailAndPassword(name: string, email: string, password: string) {
        // Register user
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async userCredential => {
                // Registered
                await userCredential.user?.updateProfile({ displayName: name })

                // Save informations
                if (userCredential.user) {
                    const { uid, displayName, photoURL } = userCredential.user

                    setUser({
                        id: uid,
                        name: displayName || name,
                        avatar: photoURL || ""
                    })
                }
            })
    }

    async function signInWithEmailAndPassword(email: string, password: string) {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName) {
                throw new Error("Missing informations from your Account.");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL || ""
            })
        }
    }

    async function signOut() {
        await firebase.auth().signOut();
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signUpWithEmailAndPassword, signInWithEmailAndPassword, signOut }}>
            {props.children}
        </AuthContext.Provider>
    );
}