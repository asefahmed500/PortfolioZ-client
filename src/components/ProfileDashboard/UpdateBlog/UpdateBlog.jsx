import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useToast from "../../../Hooks/useToast";


const UpdateBlog = () => {
    const { blog } = useLoaderData();
    const { _id, BlogTitle, BlogAuthor, BlogImage, BlogContent, userEmail } = blog || {};

    console.log("Blog Data:", _id, BlogTitle, BlogAuthor, BlogImage, BlogContent, userEmail);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: BlogTitle,
            author: BlogAuthor,
            image: BlogImage,
            content: BlogContent




        }
    }); // Hook for form management
    const axiosPublic = useAxiosPublic();
    const { showToast } = useToast();

    // Set default values only when the blog data is available

    const onSubmit = async (data) => {
        const BlogsData = {
            BlogTitle: data.title,
            BlogAuthor: data.author,
            BlogImage: data.image,
            BlogContent: data.content,
            userEmail, // Include email only if user is logged in
        };

        try {
            // Send the blog data to the server
            const res = await axiosPublic.patch(`/blogs/${_id}`, BlogsData); 
            console.log(`/blogs/${_id}`); // Ensure _id is part of the URL

            // Check if the response contains a success message
            if (res.data.message && res.data.message === "Blog updated successfully") {
                showToast(`${data.title} has been updated successfully!`, { type: "success" });
                reset(); // Reset form after successful update
            } else {
                // If no success message or some other issue, show an error toast
                showToast("Failed to update the blog. Please try again.", { type: "error" });
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            showToast("An error occurred while updating the blog.", { type: "error" });
        }
    };


    return (
        <div>
            <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    <h2 className="text-center mt-5 font-serif text-3xl text-blue-950">Update Blog</h2>
                    <div className="flex items-center justify-center mt-10">
                        <div className="card bg-blue-950 w-full max-w-lg rounded-lg shadow-2xl">
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-4 p-6">
                                {/* Blog Title */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 font-semibold">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter blog title"
                                        className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("title", { required: "Title is required" })}
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                                </div>

                                {/* Author Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 font-semibold">Author</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="author"
                                        placeholder="Enter author name"
                                        className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("author", { required: "Author is required" })}
                                    />
                                    {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                                </div>

                                {/* Image URL */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 font-semibold">Image URL</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        placeholder="Paste image URL here"
                                        className="input input-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        {...register("image", { required: "Image URL is required" })}
                                    />
                                    {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                                </div>

                                {/* Blog Content */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-gray-700 font-semibold">Content</span>
                                    </label>
                                    <textarea
                                        name="content"
                                        placeholder="Write your blog content here..."
                                        className="textarea textarea-bordered w-full text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="5"
                                        {...register("content", { required: "Content is required" })}
                                    />
                                    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-center mt-6">
                                    <button
                                        type="submit"
                                        className="btn bg-blue-950 text-white hover:bg-indigo-600 hover:text-white transition duration-200 ease-in-out shadow-md px-6 py-2 rounded"
                                    >
                                        Update Blog
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

export default UpdateBlog;
