import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MyTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                if (!user?.email) {
                    setError("User not authenticated");
                    setLoading(false);
                    return;
                }

                const res = await axiosPublic.get('/testimonials', { params: { userEmail: user.email } });
                setTestimonials(res.data);
            } catch (err) {
                setError("Error fetching testimonials. Please try again later.");
                console.error("Error fetching testimonials:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, [axiosPublic, user?.email]);

    return (
        <div className="mt-10">
            <h5 className="text-center text-4xl font-serif mb-10">Testimonials</h5>

            {loading && (
                <div className="flex justify-center items-center">
                    <div className="spinner-border text-blue-500" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="text-center text-red-500">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && testimonials.length === 0 && (
                <div className="text-center text-gray-500 mt-4">
                    <p>No testimonials found. Add some to display here!</p>
                </div>
            )}

            {!loading && !error && testimonials.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="card bg-base-100 shadow-xl p-6 text-center"
                        >
                            <img
                                src={testimonial.PersonImage || "/default-avatar.jpg"}
                                alt={testimonial.TestimonialpersonName}
                                className="rounded-full mx-auto w-24 h-24 mb-4"
                            />
                            <h3 className="text-xl font-bold">{testimonial.TestimonialpersonName}</h3>
                            <p className="text-gray-500 italic">{testimonial.PersonRole}</p>
                            <p className="mt-4 text-gray-700">
                                &quot;{testimonial.Testimonial}&quot;
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTestimonials;
