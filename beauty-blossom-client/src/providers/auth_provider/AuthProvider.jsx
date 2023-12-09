import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"
import { GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {


    const API_URL = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); //Always true only when observe done then false
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    useEffect(() => {
        // It will check/observe an user logged in or not at every refresh
        const unSubscribe = onAuthStateChanged(auth, user => {
            // here, all the code will execute at every refresh automatically  
            // console.log("Inside auth state : ", user);
            setUser(user);
            setLoading(false);
        });
        return () => { unSubscribe() }
    }, []);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const githubSignIn = () => {
        return signInWithPopup(auth, githubProvider);
    }

    const updateUserProfile = (name, photourl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photourl
        });
    }

    const createUserMongoDB = () => {
        fetch(`${API_URL}/user`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(auth.currentUser)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }


    const loggOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                toast.success("Successfully Logged out");
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const authInfo = { user, createUser, signIn, loggOut, loading, googleSignIn, githubSignIn, updateUserProfile, createUserMongoDB }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;