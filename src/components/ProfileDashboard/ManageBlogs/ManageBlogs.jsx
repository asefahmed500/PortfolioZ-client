import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useToast from "../../../Hooks/useToast";

const ManageBlogs = () => {
    const axiosPublic = useAxiosPublic();
    const { showToast } = useToast();
    const { user } = useAuth();

    const handleForm = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const author = form.author.value;
        const image = form.image.value;
        const content = form.content.value;

        const BlogsData = {
            BlogTitle: title,
            BlogAuthor: author,
            BlogImage: image,
            BlogContent: content,
            userEmail: user?.email, // Include email only if user is logged in
        };

        try {
            // Send the blog data to the server
            const res = await axiosPublic.post('/blogs', BlogsData);

            // Check if the response contains a success message
            if (res.data.message && res.data.BlogID) {
                showToast(`${title} has been added successfully!`);
                form.reset(); // Reset the form after successful submission
            } else {
                showToast("Failed to add the blog. Please try again.");
            }
        } catch (error) {
            console.error("Error adding blog:", error);
            showToast("An error occurred while adding the blog.");
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
            <div className="w-full max-w-2xl">
                <h2 className="text-center mt-5 font-serif text-3xl text-blue-950">Add a New Blog</h2>
                <div className="flex items-center justify-center mt-10">
                    <div className="card bg-blue-950 w-full max-w-lg rounded-lg shadow-2xl">
                        <form onSubmit={handleForm} className="card-body space-y-4 p-6">
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
                                    required
                                />
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
                                    required
                                />
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
                                    required
                                />
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
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex items-center justify-center mt-6">
                                <button
                                    type="submit"
                                    className="btn bg-blue-950 text-white hover:bg-indigo-600 hover:text-white transition duration-200 ease-in-out shadow-md px-6 py-2 rounded"
                                >
                                    Add Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBlogs;
