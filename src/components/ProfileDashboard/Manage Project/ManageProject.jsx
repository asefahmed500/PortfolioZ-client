import { useForm } from "react-hook-form";
import useAxiosPublic from './../../../Hooks/useAxiosPublic';
import useToast from "../../../Hooks/useToast";
import useAuth from "../../../Hooks/useAuth";

const ManageProject = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const { showToast } = useToast();
    const { user } = useAuth();


    const onSubmit = async (data) => {
        console.log(data);

        const ProjectData = {
            ProjectName: data.name,
            ProjectDescription: data.description,
            ProjectImage: data.image,
            ProjectLink: data.link,
            userEmail: user.email
        };

        try {
            // Send the project data to the server
            const res = await axiosPublic.post('/projects', ProjectData);
            console.log("Response from adding project:", res.data); // Log the response for debugging

            // Check if the response contains a success message
            if (res.data.message && res.data.projectId) {
                showToast(`${data.name} has been added to the Resume`);
                reset()// Use project name in the toast
            } else {
                showToast("Error adding project");
            }
        } catch (error) {
            console.error("Error adding project:", error);
            showToast("Error adding project");
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-center mt-5 font-serif text-3xl text-blue-950"> Add Project</h2>
                <div className="flex items-center justify-center mt-10">
                    <div className="card bg-blue-950 w-full max-w-lg rounded-lg shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4 p-6">
                            {/* Project Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Project Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Project Name"
                                    {...register("name", { required: "Project Name is required" })}
                                    className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                            </div>

                            {/* Description */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Description"
                                    {...register("description", { required: "Description is required" })}
                                ></textarea>
                                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                            </div>

                            {/* Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Image</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Image URL"
                                    {...register("image", { required: "Image URL is required" })}
                                    className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                            </div>

                            {/* Live Link */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white font-semibold">Live Link</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Live Link"
                                    {...register("link", { required: "Live Link is required" })}
                                    className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.link && <span className="text-red-500 text-sm">{errors.link.message}</span>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-center mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-black text-white hover:bg-white hover:text-blue-950 transition duration-200 ease-in-out shadow-md px-6 py-2 rounded"
                                >
                                    Add  Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ManageProject;
