import { useEffect, useState } from "react";

const Project = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('project.json');
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.log("Error fetching Projects", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="mt-10">
            <div className="text-center text-4xl font-serif">
                <p>Projects</p>
            </div>
            
            {/* Move the grid container outside the map function */}
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="card bg-base-100 max-w-70 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img
                                src={project.image}
                                alt={project.name}
                                className="rounded-xl"
                            />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{project.name}</h2>
                            <p>{project.description}</p>
                            <div className="card-actions">
                                <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    View Project
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Project;
