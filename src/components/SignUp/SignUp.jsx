import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "../SocialSignIn/GoogleLogin/GoogleLogin";
import GitHubSIgnIn from "../SocialSignIn/GitHubSIgnIn/GitHubSIgnIn";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useToast from "../../Hooks/useToast";

const SignUp = () => {
    const { signupUser, updateuserProfile, emailverify } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        signupUser(email, password)
            .then(result => {
                const { user } = result;
                console.log("User signed up:", user);
                const userinfo = {
                    name: name,
                    email: user.email
                };

                axiosPublic.post('/users', userinfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log("User saved in DB:", res.data);
                        } else {
                            showToast("User already exists.");
                        }
                    })
                    .catch(error => console.error("Error saving user to DB:", error));

                emailverify()
                    .then(() => {
                        console.log("Verification email sent");
                        showToast("A verification email has been sent.");

                        setTimeout(() => {
                            navigate("/");
                        }, 7000);
                    })
                    .catch(error => console.error("Failed to send verification email:", error));

                updateuserProfile(name, photo)
                    .then(() => {
                        console.log("User profile has been updated");
                    })
                    .catch(error => console.error("Failed to update profile:", error));
            })
            .catch(error => console.error("Sign-up error:", error));
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Join us and enjoy exclusive features.</p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSignUp} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    autoComplete="new-password"
                                    required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign up</button>
                            </div>
                            <div className="text-center">
                                <p><small>Already have an account?</small>
                                    <span className="font-bold text-blue-700">
                                        <Link to="/login"> Log in</Link>
                                    </span>
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="flex gap-8 justify-center items-center">
                                <GoogleLogin />
                                <GitHubSIgnIn />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
