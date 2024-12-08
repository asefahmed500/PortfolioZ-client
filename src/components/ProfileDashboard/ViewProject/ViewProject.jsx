import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useHotToast from "../../../Hooks/useHotToast";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const ViewProject = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { showToast } = useHotToast();
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const { user } = useAuth();
    const userEmail = user?.email;

    const { data: projects = [], isLoading, error, refetch } = useQuery({
        queryKey: ["projects", userEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/projects?userEmail=${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail // Only run if userEmail is defined
    });

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>Error fetching projects: {error.message}</p>;

    const handleDeleteProject = (project) => {
        showToast("Are you sure you want to delete this project?", {
            type: "confirmation",
            onConfirm: async () => {
                setDeleting(true);
                try {
                    const res = await axiosSecure.delete(`/projects/${project._id}`);
                    if (res.status === 200) {
                        refetch();
                        showToast("Project has been deleted", { type: "success" });
                    } else {
                        showToast("Project could not be deleted", { type: "error" });
                    }
                } catch (error) {
                    console.error(error);
                    const errorMsg = error.response ? error.response.data.message : "Error deleting project";
                    showToast(`Error: ${errorMsg}`, { type: "error" });
                } finally {
                    setDeleting(false);
                }
            },
            onCancel: () => {
                showToast("Deletion canceled", { type: "default" });
            }
        });
    };

    const handleUpdateProject = (project) => {
        navigate(`/profiedashboard/updateproject/${project._id}`);
    };

    return (
        <div>
            <h2 className="text-center mt-5 font-serif text-2xl text-blue-950">View Project</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Live Link</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={project._id}>
                                <th>{index + 1}</th>
                                <td>{project.ProjectName}</td>
                                <td>{project.ProjectDescription}</td>
                                <td>
                                    <img
                                        src={project.ProjectImage}
                                        alt={project.ProjectName}
                                        className="h-20 w-20 object-cover"
                                    />
                                </td>
                                <td>
                                    <a
                                        className="text-blue-600 link-hover"
                                        href={project.ProjectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Live
                                    </a>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteProject(project)}
                                        className="btn btn-ghost btn-sx ml-2"
                                        disabled={deleting}
                                    >
                                        <FaTrashAlt className="text-red-500" />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateProject(project)}
                                        className="btn btn-ghost btn-sx ml-2"
                                    >
                                        <FaEdit className="text-purple-950" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewProject;
