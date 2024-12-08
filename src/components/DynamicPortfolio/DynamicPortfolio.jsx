import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const DynamicPortfolio = () => {
    const { email } = useParams();
    const axiosPublic = useAxiosPublic();
    const [portfolioData, setPortfolioData] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await axiosPublic.get(`/portfolio/${email}`);
                setPortfolioData(response.data.portfolioData); // This will be an HTML string
            } catch (error) {
                console.error("Failed to load portfolio:", error);
            }
        };

        fetchPortfolio();
    }, [axiosPublic, email]);

    if (!portfolioData) {
        return <p>Loading portfolio...</p>;
    }

    return <div dangerouslySetInnerHTML={{ __html: portfolioData }} />;
};

export default DynamicPortfolio;
