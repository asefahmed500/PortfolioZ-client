import { useEffect, useState } from "react";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [error, setError] = useState(null);

    // Fetching testimonials data from JSON file
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('testimonials.json');
                if (!res.ok) throw new Error('Failed to fetch testimonials');
                const data = await res.json();
                setTestimonials(data.testimonials);
            } catch (error) {
                setError(error.message);
                console.log("Error fetching testimonials:", error);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <section className="py-20 px-6">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Users Say</h2>

                {error ? (
                    <div className="text-center text-red-500 mb-8">Error: {error}</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                            >
                                <img
                                    src={testimonial.image}
                                    alt={`Testimonial from ${testimonial.name}`}
                                    className="rounded-full mb-4 w-24 h-24 object-cover"
                                />
                                <blockquote className="text-lg mb-4">&ldquo;{testimonial.testimonial}&rdquo;</blockquote>
                                <cite className="not-italic">
                                    <strong className="font-semibold">{testimonial.name}</strong>
                                    <span className="block text-sm text-gray-500">{testimonial.role}</span>
                                </cite>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
