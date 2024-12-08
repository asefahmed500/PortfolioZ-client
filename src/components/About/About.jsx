/* eslint-disable react/no-unescaped-entities */

const About = () => {
    return (
        <div className="about-section mt-10 p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-xl shadow-lg">
            <h2 className="text-4xl text-white mb-6 text-center font-bold">About Portfolio Z</h2>
            <div className="max-w-3xl mx-auto text-gray-300 space-y-6">
                <p className="text-xl leading-relaxed">
                    Welcome to <span className="font-bold text-yellow-400">Portfolio Z</span>, a cutting-edge platform
                    designed to empower professionals from various industries to create stunning, personalized portfolios.
                    Whether you're an engineer, doctor, teacher, artist, or entrepreneur, Portfolio Z provides you with all
                    the tools you need to showcase your expertise, projects, blogs, skills, and testimonials in one seamless
                    experience.
                </p>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <p className="text-lg text-gray-300 leading-relaxed">
                        Our mission is simple: to help you build a powerful digital presence with ease. In today’s competitive
                        world, having a well-crafted portfolio can be a game-changer. That's why Portfolio Z provides a user-friendly
                        and intuitive platform, allowing you to manage your profile, publish projects, share insightful blogs,
                        highlight your skills, and collect testimonials from colleagues and clients—all in one place. We handle the
                        technical details, so you can focus on what matters most: showcasing your work and achievements.
                    </p>
                </div>
                <div className="mt-6 text-white">
                    <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li><strong>Personalized Portfolio:</strong> Create and customize your portfolio with ease.</li>
                        <li><strong>Project Showcase:</strong> Add and manage your projects to highlight your best work.</li>
                        <li><strong>Blog & Testimonials:</strong> Share valuable insights and gather feedback from your network.</li>
                        <li><strong>Skills & Expertise:</strong> Highlight the skills that set you apart in your industry.</li>
                        <li><strong>Real-Time Portfolio Publishing:</strong> Publish your portfolio online with just one click!</li>
                    </ul>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-lg text-gray-300">
                        Portfolio Z is more than just a portfolio builder—it's your gateway to opportunities. Stand out from the crowd,
                        attract the right audience, and unlock new career and business opportunities.
                    </p>
                    <p className="text-lg text-yellow-400 mt-4 font-bold">
                        Join the Portfolio Z community today and start building your digital presence with ease!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
