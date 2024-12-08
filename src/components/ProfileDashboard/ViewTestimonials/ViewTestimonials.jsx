import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useHotToast from "../../../Hooks/useHotToast";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ViewTestimonials = () => {
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

    const { data: testimonials = [], isLoading, error, refetch } = useQuery({
        queryKey: ["testimonials", userEmail],
        queryFn: async () => {
            if (!userEmail) {
                throw new Error("User email is undefined.");
            }
            const res = await axiosPublic.get(`/testimonials?userEmail=${userEmail}`);
            return res.data;
        },
        enabled: !!userEmail, // Only run if userEmail is defined
        onError: (err) => console.error("Error fetching testimonials:", err),
    });

    if (isLoading) return <p>Loading testimonials...</p>;
    if (error) return <p>Error fetching testimonials: {error.message}</p>;

    const handleDeleteTestimonial = (testimonial) => {
        showToast("Are you sure you want to delete this testimonial?", {
            type: "confirmation",
            onConfirm: async () => {
                setDeleting(true);
                try {
                    const res = await axiosSecure.delete(`/testimonials/${testimonial._id}`);
                    if (res.status === 200) {
                        refetch();
                        showToast("Testimonial has been deleted", { type: "success" });
                    } else {
                        showToast("Testimonial could not be deleted", { type: "error" });
                    }
                } catch (error) {
                    console.error("Error deleting testimonial:", error);
                    const errorMsg = error.response ? error.response.data.message : "Error deleting testimonial";
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

    const handleUpdateTestimonial = (testimonial) => {
        navigate(`/profiedashboard/updatetestimonial/${testimonial._id}`);
    };

    return (
        <div>
            <div>
                <h2 className="text-center mt-5 font-serif text-2xl text-blue-950">View Testimonials</h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Image</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.map((testimonial, index) => (
                                <tr key={testimonial._id}>
                                    <th>{index + 1}</th>
                                    <td>{testimonial.TestimonialpersonName}</td>
                                    <td>{testimonial.PersonRole}</td>
                                    <td>
                                        <img
                                            src={testimonial.testimonialImage}
                                            alt={testimonial.TestimonialpersonName}
                                            className="h-20 w-20 object-cover"
                                        />
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteTestimonial(testimonial)}
                                            className="btn btn-ghost btn-sx ml-2"
                                            disabled={deleting}
                                        >
                                            <FaTrashAlt className="text-red-500" />
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdateTestimonial(testimonial)}
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

export default ViewTestimonials;
