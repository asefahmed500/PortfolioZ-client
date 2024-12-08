import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MySkills = () => {
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        const fetchSkills = async () => {
            if (user?.email) {
                try {
                    const res = await axiosPublic.get("skills", { params: { userEmail: user.email } });
                    setSkills(res.data);
                } catch (error) {
                    console.error("Error fetching skills:", error);
                    setError(error?.response?.data?.message || "Error fetching skills. Please try again later.");
                }
            }
        };

        if (user) {
            fetchSkills();
        }
    }, [axiosPublic, user]);

    if (authLoading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div className="spinner-border" role="status"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="mt-20">
            <div className="text-center text-4xl font-serif mb-10">
                <p>Skills</p>
            </div>
            <div className="mt-10 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-evenly gap-6">
                    {skills.length > 0 ? (
                        skills.map((skill) => (
                            <div key={skill._id} className="card bg-neutral text-neutral-content w-60">
                                <div className="card-body items-center text-center">
                                    <img
                                        src={skill.SkillImage || "/default-image.jpg"}
                                        alt={skill.SkillName}
                                        className="w-16 h-16 object-contain mb-4"
                                    />
                                    <h2 className="card-title text-xl font-bold">{skill.SkillName}</h2>
                                    <p className="text-sm">{skill.SkillLevel}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-4">No skills available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MySkills;
