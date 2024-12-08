import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const MyBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) return; // Prevent fetching if user is not logged in

        const fetchBlogs = async () => {
            try {
                const userEmail = user.email; 
                const res = await axiosPublic.get('/blogs', { params: { userEmail } });

                // Debugging: Log the API response
                console.log("API Response:", res.data);

                // Check if the response contains an array or if the data is wrapped inside an object
                if (Array.isArray(res.data)) {
                    setBlogs(res.data);
                } else if (res.data && Array.isArray(res.data.blogs)) { 
                    // If the response contains a key 'blogs' with an array
                    setBlogs(res.data.blogs);
                } else {
                    setError("Received data is not an array or lacks blogs.");
                }
            } catch (error) {
                setError(error?.response?.data?.message || "Error fetching blogs. Please try again later.");
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [axiosPublic, user?.email]); // Fetch blogs when user email changes

    if (loading) return <div className="text-center mt-4">Loading...</div>;
    if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

    return (
        <div>
            <div className="mt-10">
                <h5 className="text-center text-4xl font-serif mb-10"> Blogs</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(blogs) && blogs.length > 0 ? (
                        blogs.map((post) => (
                            <div key={post._id} className="card bg-base-100 shadow-xl">
                                <figure>
                                    <img
                                        src={post.BlogImage || "/default-image.jpg"} // Fallback image
                                        alt={post.BlogTitle}
                                        className="rounded-t-lg w-full h-48 object-cover"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h3 className="text-xl font-bold">{post.BlogTitle}</h3>
                                    <p className="text-gray-500 italic">
                                        by {post.BlogAuthor} on {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="mt-2 text-gray-700">
                                        {post.BlogContent?.slice(0, 100)}... {/* Display first 100 characters */}
                                    </p>
                                    <div className="card-actions justify-center mt-4">
                                        <button className="btn btn-primary">Read More</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mt-4">No blogs available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBlog;
