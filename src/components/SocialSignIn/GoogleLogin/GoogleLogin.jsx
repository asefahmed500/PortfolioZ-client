import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useToast from "../../../Hooks/useToast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const GoogleLogin = () => {
    const { googlesignin } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const axiosPublic = useAxiosPublic();

    const handlegoogleSignIn = () => {
        googlesignin()
            .then(result => {
                const { user } = result;
                const userinfo = {
                    email: user?.email,
                    name: user?.displayName,
                };

                // Save user to database
                axiosPublic.post('/users', userinfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            showToast("Welcome! Your account has been created.");
                            console.log("User saved in DB");
                        } else {
                            showToast("Welcome back!");
                            console.log("User already exists");
                        }
                    })
                    .catch(error => {
                        console.error("Failed to save user in DB:", error);
                        showToast("There was an issue saving your account. Please try again.");
                    });

                // Check if email is verified
                if (!user.emailVerified) {
                    showToast("Please verify your email before logging in.");
                    return;
                }

                showToast("Login successful!");
                console.log("User logged in:", result.user);
                navigate("/");
            })
            .catch(error => {
                console.error("Google Sign-In Error:", error);
                showToast("Login failed. Please try again.");
            });
    };

    return (
        <div className="flex items-center justify-center">
            <button onClick={handlegoogleSignIn} className="btn btn-outline">
                <FaGoogle  />  
            </button>
        </div>
    );
};

export default GoogleLogin;
