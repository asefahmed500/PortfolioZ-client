import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FaGithub } from "react-icons/fa";
import useToast from "../../../Hooks/useToast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const GitHubSIgnIn = () => {
    const { githubsignin } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const axiosPublic = useAxiosPublic();

    const handleGitHubSignIn = () => {
        githubsignin()
            .then(result => {
                const { user } = result;
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                };

                // Save user to database
                axiosPublic.post('/users', userInfo)
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

                // Show success toast and navigate
                showToast("Login successful!");
                console.log("User logged in:", user);
                navigate("/");
            })
            .catch(error => {
                console.error("GitHub Sign-In Error:", error);
                showToast("Login failed. Please try again.");
            });
    };

    return (
        <div className="flex items-center justify-center">
            <button onClick={handleGitHubSignIn} className="btn btn-outline">
                <FaGithub  /> 
            </button>
        </div>
    );
};

export default GitHubSIgnIn;
