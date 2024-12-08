import { useEffect, useState } from "react";

const Blog = () => {
    const [posts, setPosts] = useState([]); // Initialize posts as an empty array

    // Fetching blog posts data from JSON file
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('blogPosts.json');
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.log("Error fetching blog posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="mt-10">
            <h5 className="text-center text-4xl font-serif mb-10">Blog</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src={post.image}
                                alt={post.title}
                                className="rounded-t-lg w-full h-48 object-cover"
                            />
                        </figure>
                        <div className="card-body p-4">
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p className="text-gray-500 italic">by {post.author} on {new Date(post.date).toLocaleDateString()}</p>
                            <p className="mt-2 text-gray-700">{post.excerpt}</p>
                            <div className="card-actions justify-center mt-4">
                                <button className="btn btn-primary">Read More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
