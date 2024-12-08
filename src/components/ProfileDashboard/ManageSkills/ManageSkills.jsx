import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useToast from "../../../Hooks/useToast";
import { useState, useEffect } from "react";


const ManageSkills = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();

    const { showToast } = useToast();
    const { user } = useAuth();
    const [loadingIcon, setLoadingIcon] = useState(false);
    const [skills, setSkills] = useState([]);
    const [logoUrl, setLogoUrl] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);  // State to filter skills based on input
    const [skillInput, setSkillInput] = useState('');  // State to hold the input value for filtering skills

    // Fetch skill options from the API on component mount
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                // Replace with a valid API endpoint that returns a list of skills
                const response = await axiosPublic.get('skillsicon');  // Replace with your real API
                console.log("API Response:", response.data); // Debugging: log the API response

                // Assuming the API returns an array of skills in response.data.skills
                setSkills(response.data.skills || []); // Adjust based on the actual API response structure
                setFilteredSkills(response.data.skills || []);  // Initially show all skills
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };
        fetchSkills();
    }, [axiosPublic]);

    // Fetch icon URL from the img.logo.dev CDN for each skill
    const fetchIconForSkill = (skillName) => {
        setLoadingIcon(true);

        // Construct the logo image URL using img.logo.dev
        const iconUrl = `https://img.logo.dev/${skillName.toLowerCase()}.com?token=${import.meta.env.VITE_LOGO_API_KEY}`;

        // Set the image URL to the input field and display it
        setValue("image", iconUrl);  // Automatically fill the input field with the logo URL
        setLogoUrl(iconUrl);  // Set the logo URL for display
        setLoadingIcon(false);
};

    // Handle input change to filter skills
    const handleSkillInputChange = (event) => {
        const value = event.target.value;
        setSkillInput(value);

        // Filter skills based on the input value
        const filtered = skills.filter(skill => skill.toLowerCase().includes(value.toLowerCase()));
        setFilteredSkills(filtered);

        // Automatically update the image URL as you type the skill name
        if (value) {
            fetchIconForSkill(value); // Auto-fill the logo URL
        } else {
            setLogoUrl('');
        }
    };

    // Handle skill selection (when user selects a skill)
    const handleSkillSelect = (skillName) => {
        if (skillName) {
            fetchIconForSkill(skillName);  // Fetch icon for the selected skill
            setValue("name", skillName);  // Set the skill name
            setSkillInput(skillName); // Update the input field with the selected skill
        }
    };

    const onSubmit = async (data) => {
        const SkillData = {
            SkillName: data.name,
            SkillLevel: data.level,
            SkillImage: data.image,
            userEmail: user.email
        };

        try {
            const res = await axiosPublic.post('/skills', SkillData);
            if (res.data.message && res.data.SkilltId) {
                showToast(`${data.name} has been added to the Resume`);
                reset();
            } else {
                showToast("Error adding skill");
            }
        } catch (error) {
            console.error("Error adding skill:", error);
            showToast("Error adding skill");
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-center mt-5 font-serif text-3xl text-blue-950">Add Skill</h2>
                <div className="flex items-center justify-center mt-10">
                    <div className="card bg-blue-950 w-full max-w-lg rounded-lg shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4 p-6">
                            {/* Skill Input with Filtering */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Search and Select a Skill</span>
                                </label>
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={handleSkillInputChange}
                                    placeholder="Start typing to search for a skill"
                                    className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Display filtered skills as suggestions */}
                            {filteredSkills.length > 0 && (
                                <div className="mt-2">
                                    <ul className="bg-white border rounded-md shadow-md max-h-48 overflow-y-auto">
                                        {filteredSkills.map((skill, index) => (
                                            <li
                                                key={index}
                                                className="cursor-pointer p-2 hover:bg-gray-200"
                                                onClick={() => handleSkillSelect(skill)}
                                            >
                                                {skill}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Skill Name (auto-populated) */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Skill Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Skill Name"
                                    {...register("name", { required: "Skill Name is required" })}
                                    className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                            </div>

                            {/* Level */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Level</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter level"
                                    {...register("level", { required: "Level is required" })}
                                ></textarea>
                                {errors.level && <span className="text-red-500 text-sm">{errors.level.message}</span>}
                            </div>

                            {/* Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Image</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Image URL or select a skill to auto-fill"
                                    {...register("image", { required: "Image URL is required" })}
                                    className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {loadingIcon && <span className="text-blue-500 text-sm">Loading icon...</span>}
                                {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                            </div>

                            {/* Display the logo image */}
                            {logoUrl && (
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-semibold">Skill Logo</span>
                                    </label>
                                    <img src={logoUrl} alt="Skill Logo" className="w-16 h-16 object-contain mx-auto" />
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex items-center justify-center mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-black text-white hover:bg-white hover:text-blue-950 transition duration-200 ease-in-out shadow-md px-6 py-2 rounded"
                                >
                                    Add Skill
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageSkills;
