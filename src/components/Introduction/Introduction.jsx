import defaultpicture from "../../assets/profile picture/dfp.png";
import defaulprofiletpicture from "../../assets/BgImage/profileBackround.jpg";
import useAuth from "../../Hooks/useAuth";
import { FaDownload } from "react-icons/fa";

const Introduction = () => {
    const { user, loading } = useAuth()
    console.log(user, loading)

    // Error handling when useAuth is not available
    if (!user && !loading) {
        return (
            <div className="text-center p-4">
                <h3 className="text-xl font-semibold text-red-600">Error: Authentication context is missing.</h3>
                <p>Please ensure that you are properly logged in and try again.</p>
            </div>
        );
    }

    // Loading state handling
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin w-12 h-12 border-4 border-t-transparent border-blue-600 rounded-full"></div>
            </div>
        );
    }

    return (
        <div
            className="relative bg-cover bg-center rounded-lg"
            style={{
                backgroundImage: `url(${defaulprofiletpicture})`,
            }}
        >
            {/* Content Wrapper */}
            <div className="p-10 lg:p-20 flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-5xl mx-auto space-y-6 lg:space-y-0 relative z-10">
                {/* Text Section */}
                <div className="text-center lg:text-left space-y-12 lg:ml-8 text-white">
                    <h2 className="text-4xl lg:text-5xl font-bold">
                        {user?.displayName || "Name"}
                    </h2>
                    <p className="animate-marquee text-sm sm:text-base lg:text-lg font-bold">
                        Welcome to my portfolio.
                    </p>
                    <button className="flex items-center justify-center gap-2 btn bg-gray-900 text-white hover:bg-blue-600 px-4 py-2 rounded-md shadow-lg transition duration-200">
                        Download Resume <FaDownload />
                    </button>
                </div>
            </div>

            {/* Avatar Section */}
            <div className="absolute top-12 sm:top-32 md:top-12 lg:top-1/2 lg:right-20 transform lg:translate-y-8">
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 overflow-hidden shadow-xl border-4 border-white bg-white">
                    <img
                        src={user?.photoURL || defaultpicture}
                        alt="Profile Pic"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Introduction;
