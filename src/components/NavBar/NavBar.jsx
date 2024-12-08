import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";

const NavBar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Logged out");
            })
            .catch(error => {
                console.error(error);
            });
    };

    const navOptions = (
        <>
            {user ? (
                <>
                    
                    <NavLink to="/profiedashboard"> <li>Profile Dashboard</li></NavLink>
                    <NavLink to="/viewportfolio"> <li> View Portfolio</li></NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/"> <li>Home</li></NavLink>
                    <NavLink to="/login"> <li>Login</li></NavLink>
                    <NavLink to="/signup"> <li>Sign Up</li></NavLink>
                    <NavLink to="/pricing"> <li>Pricing</li></NavLink>
                    <NavLink to="/about"> <li>About Us</li></NavLink>
                </>
            )}
        </>

    );

    return (
        <div>
            <div className="navbar bg-opacity-30 bg-black-100 fixed z-10  mx-auto max-w-5xl text-white ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] text-black mt-3 w-52 p-2 shadow">
                            {navOptions}
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="text-xl font-bold">Portfolio Z</a>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <button onClick={handleLogout} className="btn btn-ghost">
                            <IoLogOutOutline /> Logout
                        </button>
                    ) : (
                        <button className="btn btn-ghost bg-inherit  border-blue-50">
                            <p className=" text-white">Hire Me</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
