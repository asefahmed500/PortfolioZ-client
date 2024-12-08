import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useHotToast from "../../../Hooks/useHotToast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ViewBlogs = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { showToast } = useHotToast();
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const { user } = useAuth();
    const userEmail = user?.email;

    const { data: blogs = [], isLoading, error, refetch } = useQuery({
        queryKey: ["blogs", userEmail],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blogs?userEmail=${userEmail}`);
            return res.data.blogs;
        },
        enabled: !!userEmail, // Only run if userEmail is defined
    });

    if (isLoading) return <p>Loading blogs...</p>;
    if (error) return <p>Error fetching blogs: {error.message}</p>;

    const handleDeleteBlog = (blog) => {
        showToast("Are you sure you want to delete this blog?", {
            type: "confirmation",
            onConfirm: async () => {
                setDeleting(true);
                try {
                    const res = await axiosSecure.delete(`/blogs/${blog._id}`);
                    if (res.status === 200) {
                        refetch();
                        showToast("Blog has been deleted", { type: "success" });
                    } else {
                        showToast("Blog could not be deleted", { type: "error" });
                    }
                } catch (error) {
                    console.error(error);
                    const errorMsg = error.response ? error.response.data.message : "Error deleting blog";
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

    const handleUpdateBlog = (blog) => {
        navigate(`/profiedashboard/updateblog/${blog._id}`);
    };

    return (
        <div>
            <div>
                <h2 className="text-center mt-5 font-serif text-2xl text-blue-950">View Blogs</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Blog Title</th>
                                <th>Author</th>
                                <th>Image</th>
                                <th>Content</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <th>{index + 1}</th>
                                    <td>{blog.BlogTitle}</td>
                                    <td>{blog.BlogAuthor}</td>
                                    <td>
                                        <img
                                            src={blog.BlogImage}
                                            alt={blog.BlogTitle}
                                            className="h-20 w-20 object-cover"
                                        />
                                    </td>
                                    <td>{blog.BlogContent.substring(0, 100)}...</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteBlog(blog)}
                                            className="btn btn-ghost btn-sx ml-2"
                                            disabled={deleting}
                                        >
                                            <FaTrashAlt className="text-red-500" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdateBlog(blog)}
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

export default ViewBlogs;
