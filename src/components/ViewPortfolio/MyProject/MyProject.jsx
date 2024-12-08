import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const MyProject = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) return; // Avoid fetching if user email is not available

        const fetchProjects = async () => {
            try {
                const userEmail = user.email;
                const res = await axiosPublic.get('projects', { params: { userEmail } });

                // Ensure the received data is an array
                if (Array.isArray(res.data)) {
                    setProjects(res.data);
                } else {
                    setError("Received data is not an array.");
                }
            } catch (error) {
                setError(error?.response?.data?.message || "Error fetching projects. Please try again later.");
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [axiosPublic, user]);

    return (
        <div>
            <div className="mt-10">
                <div className="text-center text-4xl font-serif">
                    <p>Projects</p>
                </div>

                {loading ? (
                    <p className="text-center mt-4">Loading...</p>
                ) : error ? (
                    <p className="text-center mt-4 text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <div key={project._id} className="card bg-base-100 max-w-80 shadow-xl">
                                    <figure className="px-10 pt-10">
                                        <img
                                            src={project.ProjectImage}
                                            alt={project.ProjectName}
                                            className="rounded-xl"
                                        />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{project.ProjectName}</h2>
                                        <p>{project.ProjectDescription}</p>
                                        <div className="card-actions">
                                            <a href={project.ProjectLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                                View Project
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center mt-4">You have not added any projects yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProject;
