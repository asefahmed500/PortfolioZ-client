import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <progress className="progress w-56"></progress>
            </div>
        )
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>
};

export default PrivateRoutes;