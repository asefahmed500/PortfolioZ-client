import { Link } from "react-router-dom";
import bgimg from "../../assets/BgImage/backround.jpg";

const Intro = () => {
    return (
        <div
            className="hero p-40 flex flex-col items-center justify-center rounded-lg relative"
            style={{
                backgroundImage: `url(${bgimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="hero-overlay bg-opacity-60 absolute inset-0 rounded-lg"></div>
            <div className="hero-content text-neutral-content text-center z-10 relative">
                <div className="max-w-md space-y-6">
                    <h1 className="text-4xl md:text-4xl font-bold text-gray-300">
                        Create Your Professional Portfolio in Minutes
                    </h1>

                    <p className="font-semibold  text-gray-300 ">
                        Showcase your skills and projects with a beautiful, customizable portfolio website.
                    </p>

                    <div className="text-lg text-white font-serif">
                        <Link to="/signup">
                            <button className="btn bg-blue-50 mt-4 font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition-all duration-300">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
