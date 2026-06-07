"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";
import {auth} from "@/firebase/firebase";


//mongo db user type
interface DBuser{
    _id:string,
    firebaseUID:string,
    email:string,
    role:string,
    name:string,

}

interface AuthContextType {
    user: User | null;
    dbuser:DBuser | null;
    loading: boolean;
}



const AuthContext = createContext<AuthContextType>({
    user: null,
    dbuser: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [dbuser, setDbuser] = useState<DBuser | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            setLoading(false);

            if (!currentUser) {
                setDbuser(null);
                return;
            }

            // DB fetch should NOT control auth loading
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/users/${currentUser.uid}`
                );
                setDbuser(res.data);
            } catch (e) {
                console.log(e);
                setDbuser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user,dbuser, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);