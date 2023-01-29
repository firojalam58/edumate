

import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
 export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const logIn = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    useEffect(()=>{
     const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('user obserbd');
            setUser(currentUser)
        });
        return ()=> unsubscribe()
    },[])

    const authInfo ={
        createUser,
        logIn,
        logOut,
        user,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;