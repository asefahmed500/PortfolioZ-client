import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { FaEdit } from "react-icons/fa";


const Profile = () => {
    const { user } = useAuth();
    return (
        <div className="mt-20">
            <h2 className="text-3xl  text-gray-700 mb-4 text-center font-bold"> Profile  </h2>


            <div className="relative p-6 bg-gray-100 rounded-lg shadow-lg mt-20">

                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                    {user ? user.displayName || "Name" : "Name"}
                </h2>
                <div className="absolute top-16 sm:top-36 md:top-16 lg:top-1/2 lg:right-24 transform lg:-translate-y-1/2">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 rounded-full overflow-hidden shadow-lg border-4 border-gray-300 bg-gray-200">
                        <img
                            src={user && user.photoURL ? user.photoURL : "profile"}
                            alt="Profile Pic"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-20 btn btn-outline  text-center flex items-center justify-center  bg-gray-900">
                <Link
                    to="/update-profile"
                    className="text-center text-white flex items-center justify-center  gap-2    "
                >
                    <FaEdit className="mr-2" />
                    <span>Update Profile</span>
                </Link>
            </div>
        </div>

    );
};

export default Profile;