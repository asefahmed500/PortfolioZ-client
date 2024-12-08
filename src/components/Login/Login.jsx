import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "../SocialSignIn/GoogleLogin/GoogleLogin";
import GitHubSIgnIn from "../SocialSignIn/GitHubSIgnIn/GitHubSIgnIn";
import useToast from "../../Hooks/useToast";


const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate()
    const {showToast} = useToast();

    const handlelogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get("email");
        const password = form.get("password");

        loginUser(email, password)
            .then(result => {
                if (!result.user.emailVerified) {
                    showToast("Please verify your email before logging in.");
                    return;
                }
                console.log(result.user);
                navigate("/");
            })
            .catch(error => {
                console.error(error);
                showToast("Login failed. Please check your credentials.");
            });
    };




    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handlelogin} className="card-body">
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
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    autoComplete="current-password"
                                    required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div className="text-center">
                                <p><small className="font-semibold">New to Portfolio Z ?</small>
                                    <span className="font-bold text-blue-700">  <Link to="/signup" >Sign Up</Link>
                                    </span>
                                </p>
                            </div>
                            <div className="divider"></div>
                            <div className="flex gap-8 justify-center items-center">
                                <GoogleLogin></GoogleLogin>
                                <GitHubSIgnIn></GitHubSIgnIn>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;