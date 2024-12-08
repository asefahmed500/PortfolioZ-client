import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import useHotToast from "../../../Hooks/useHotToast";
import ReactDOMServer from "react-dom/server"; // Import renderToStaticMarkup
import ViewPortfolio from "../../ViewPortfolio/ViewPortfolio";

const Publishportfolio = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();  // Destructure 'user' and 'loading' from 'useAuth'
    const [liveLink, setLiveLink] = useState("");
    const { showToast } = useHotToast();

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle case where user is not available
    if (!user) {
        return <div>Error: You must be logged in to publish your portfolio.</div>;
    }

    const handlePublish = async () => {
        try {
            // Convert the ViewPortfolio component to an HTML string
            const portfolioData = ReactDOMServer.renderToStaticMarkup(<ViewPortfolio />);

            const response = await axiosPublic.post("/api/publishPortfolio", {
                email: user?.email,
                portfolioData, // Send the HTML string as portfolioData
            });

            setLiveLink(response.data.liveLink);
            showToast("Portfolio Published Successfully");
        } catch (error) {
            console.error("Failed to publish portfolio:", error);
            showToast("Portfolio Publish Failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button
                onClick={handlePublish}
                className="text-center font-bold bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-900 transition duration-300"
            >
                Publish Portfolio
            </button>

            {liveLink && (
                <div className="live-link mt-4 text-center">
                    <p>
                        Your portfolio is live at:{" "}
                        <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            {liveLink}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Publishportfolio;
