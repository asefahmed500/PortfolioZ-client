import { createContext, useState, useEffect } from "react";
import { app } from './../Firebase/firebase.config';
import { getAuth, onAuthStateChanged, sendEmailVerification, updateProfile, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import useAxiosPublic from './../Hooks/useAxiosPublic';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const googlesignin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const githubsignin = () => {
        return signInWithPopup(auth, githubProvider);
    };

    const signupUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const emailverify = async () => {
        if (auth.currentUser) {
            setLoading(true);
            return await sendEmailVerification(auth.currentUser);
        } else {
            return Promise.reject(new Error("No user is signed in"));
        }
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateuserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth State Changed:", currentUser);
            setUser(currentUser);
            if (currentUser && !localStorage.getItem('access-token')) {
                const userinfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userinfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        googlesignin,
        githubsignin,
        signupUser,
        loginUser,
        emailverify,
        updateuserProfile,
        logout
    };
    console.log("Auth Info:", authInfo);

    // Don't return anything (or show loading spinner) until authentication state is loaded
    if (loading) {
        return <div>Loading...</div>;  // Optionally, you can show a loading spinner here
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;
