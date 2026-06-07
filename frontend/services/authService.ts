import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {auth} from "@/firebase/firebase";

//Sign Up
export const Signup=async (email:string, password:string)=>{
return await createUserWithEmailAndPassword(auth,email,password);
};

export const login=async (email:string,password:string)=>{
    return await signInWithEmailAndPassword(auth,email,password);
};

export const logOut=async()=>{
    return await signOut(auth);
}
