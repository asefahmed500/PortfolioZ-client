import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useHotToast from "../../../Hooks/useHotToast";
import { useState, useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ViewSkills = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { showToast } = useHotToast();
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const { user } = useAuth();
    const userEmail = user?.email;

    useEffect(() => {
        if (!userEmail) {
            console.warn("userEmail is not defined. Waiting for it to be set.");
        }
    }, [userEmail]);

    const { data: skills = [], isLoading, error, refetch } = useQuery({
        queryKey: ["skills", userEmail],
        queryFn: async () => {
            if (!userEmail) {
                throw new Error("User email is undefined.");
            }
            const res = await axiosPublic.get(`/skills?userEmail=${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail, // Only run if userEmail is defined
        onError: (err) => console.error("Error fetching skills:", err),
    });

    if (isLoading) return <p>Loading Skills...</p>;
    if (error) return <p>Error fetching Skills: {error.message}</p>;

    const handleDeleteskill = (skill) => {
        showToast("Are you sure you want to delete this skill?", {
            type: "confirmation",
            onConfirm: async () => {
                setDeleting(true);
                try {
                    const res = await axiosSecure.delete(`/skills/${skill._id}`);
                    if (res.status === 200) {
                        refetch();
                        showToast("Skill has been deleted", { type: "success" });
                    } else {
                        showToast("Skill could not be deleted", { type: "error" });
                    }
                } catch (error) {
                    console.error("Error deleting skill:", error);
                    const errorMsg = error.response ? error.response.data.message : "Error deleting skill";
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

    const handleUpdateskill = (skill) => {
        navigate(`/profiedashboard/updateskill/${skill._id}`);
    };

    return (
        <div>
            <div>
                <h2 className="text-center mt-5 font-serif text-2xl text-blue-950">View Skills</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Skill Name</th>
                                <th>Level</th>
                                <th>Image</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill, index) => (
                                <tr key={skill._id}>
                                    <th>{index + 1}</th>
                                    <td>{skill.SkillName}</td>
                                    <td>{skill.SkillLevel}</td>
                                    <td>
                                        <img
                                            src={skill.SkillImage}
                                            alt={skill.SkillName}
                                            className="h-20 w-20 object-cover"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteskill(skill)}
                                            className="btn btn-ghost btn-sx ml-2"
                                            disabled={deleting}
                                        >
                                            <FaTrashAlt className="text-red-500" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdateskill(skill)}
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
        </div>
    );
};

export default ViewSkills;
