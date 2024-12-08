import { Link } from "react-router-dom";
import Introduction from "../Introduction/Introduction";
import MyBlog from "./MyBlog/MyBlog";
import MyContact from "./MyContact/MyContact";
import MyProject from "./MyProject/MyProject";
import MySkills from "./MySkills/MySkills";
import MyTestimonials from "./MyTestimonials/MyTestimonials";
import Publishportfolio from "../ProfileDashboard/Publishportfolio/Publishportfolio";
import { Suspense } from "react";

const ViewPortfolio = () => {
    return (
        <div className="container mx-auto p-6">
            {/* Introduction Section */}
            <section className="mb-12">
                <Suspense fallback={<div>Loading Introduction...</div>}>
                    <Introduction />
                </Suspense>
            </section>

            {/* Skills Section */}
            <section className="mb-12">
                <Suspense fallback={<div>Loading Skills...</div>}>
                    <MySkills />
                </Suspense>
            </section>

            {/* Projects Section */}
            <section className="mb-12">
                <Suspense fallback={<div>Loading Projects...</div>}>
                    <MyProject />
                </Suspense>
            </section>

            {/* Blog Section */}
            <section className="mb-12">
                <Suspense fallback={<div>Loading Blog...</div>}>
                    <MyBlog />
                </Suspense>
            </section>

            {/* Testimonials Section */}
            <section className="mb-12">
                <Suspense fallback={<div>Loading Testimonials...</div>}>
                    <MyTestimonials />
                </Suspense>
            </section>

            {/* Contact Section */}
            <section className="mb-12">
                <Suspense fallback={<div>Loading Contact...</div>}>
                    <MyContact />
                </Suspense>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col items-center space-y-4 mt-10">
                {/* Back to Home Button */}
                <Link to="/" className="w-full">
                    <button 
                        aria-label="Go back to homepage" 
                        className="p-2 bg-blue-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring w-full sm:w-auto">
                        Back to Home
                    </button>
                </Link>

                {/* Publish Portfolio Button */}
                <Publishportfolio />
            </div>
        </div>
    );
};

export default ViewPortfolio;
