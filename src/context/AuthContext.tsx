import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signInWithEmailAndPassword: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName) {
                    throw new Error("Missing informations from Google Account.");
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

    async function signInWithEmailAndPassword(name: string, email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // Signed in
                await userCredential.user?.updateProfile({
                    displayName: name
                })
                
                console.log(userCredential.user)
                // ...
            })
            .catch((error) => {
                // var errorCode = error.code;
                // var errorMessage = error.message;
            });

        // if (result.user) {
        //     const { displayName, photoURL, uid } = result.user

        //     if (!displayName) {
        //         throw new Error("Missing informations from Google Account.");
        //     }

        //     setUser({
        //         id: uid,
        //         name: displayName,
        //         avatar: photoURL || ""
        //     })
        // }
    }

    // async function signInWithPassword(email: string, password: string) {
    //     firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .then((userCredential) => {
    //             // Signed in 
    //             var user = userCredential.user;
    //             // ...
    //         })
    //         .catch((error) => {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             // ..
    //         });

    // }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithEmailAndPassword }}>
            {props.children}
        </AuthContext.Provider>
    );
}