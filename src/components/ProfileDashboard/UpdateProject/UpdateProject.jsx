import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useToast from "../../../Hooks/useToast";
import { useLoaderData } from "react-router-dom";

const UpdateProject = () => {
    const { _id, ProjectName, ProjectDescription, ProjectImage, ProjectLink, userEmail } = useLoaderData();
    console.log(_id, ProjectName, ProjectDescription, ProjectImage, ProjectLink, userEmail)
    console.log("Project ID:", _id); // Check if _id is defined

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: ProjectName,
            description: ProjectDescription,
            image: ProjectImage,
            link: ProjectLink,
        },
    });

    const axiosPublic = useAxiosPublic();
    const { showToast } = useToast();

    const onSubmit = async (data) => {
        // Use the _id and userEmail directly from useLoaderData
        const ProjectData = {
            ProjectName: data.name,
            ProjectDescription: data.description,
            ProjectImage: data.image,
            ProjectLink: data.link,
            userEmail // Ensure userEmail is part of the update payload
        };

        try {
            const res = await axiosPublic.patch(`/projects/${_id}`, ProjectData);

            if (res.data.message) {
                showToast(`${data.name} has been updated successfully.`);
                reset();
            } else {
                showToast("Error updating project");
            }
        } catch (error) {
            console.error("Error updating project:", error);
            showToast("Error updating project");
        }
    };

    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    <h2 className="text-center mt-5 font-serif text-3xl text-blue-950">Update Project</h2>
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
                                        Update Project
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProject;
