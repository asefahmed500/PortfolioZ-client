import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";


const useAuth = () => {
    const auth = useContext(AuthContext);
    console.log(auth)
    if (!auth) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return auth;
};

export default useAuth;