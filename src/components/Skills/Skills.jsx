import { useState, useEffect } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  // Fetching skills data
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('skills.json'); 
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="mt-10">
      <h5 className="text-center text-4xl font-serif">Skills</h5>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.length > 0 ? (
          skills.map(skill => (
            <div key={skill.id} className="p-4 border rounded-lg shadow-md bg-white">
              <img src={skill.image} alt={skill.name} className="w-16 h-16 object-contain mb-3" />
              <h6 className="text-lg font-bold">{skill.name}</h6>
              <p className="text-gray-600">{skill.level}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading skills...</p>
        )}
      </div>
    </div>
  );
};

export default Skills;
