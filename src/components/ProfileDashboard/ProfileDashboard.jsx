import { useState } from "react";
import { FaHome, FaUser, FaClipboard, FaCogs, FaBars, FaTimes, FaEnvelope,  FaBlog, FaProductHunt, FaEdit } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

import { ImProfile } from "react-icons/im";


const ProfileDashboard = () => {
   
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

   
    return (
        <div>
            <div className="dashboard flex h-screen">
                {/* Sidebar with scrollbar and fixed background color */}
                <div
                    className={`sidebar bg-blue-950 text-white transition-transform duration-300 ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"} overflow-y-auto`}
                    style={{ padding: isSidebarOpen ? "20px" : "0" }}
                >
                    <div className="flex items-center justify-between p-4">
                        <div className="mt-10 flex gap-5">
                            <h2 className="text-3xl font-bold">Portfolio</h2>
                            <div className="font-bold text-6xl -mt-4">
                                <p>Z</p>
                            </div>
                        </div>
                        <button onClick={toggleSidebar} className="text-white -mt-20">
                            <FaTimes className="bg-white text-black" size={20} />
                        </button>
                    </div>

                    <ul className="menu mt-4 space-y-4">
                        <li>
                            <Link to="/profiedashboard/profile" className="flex items-center">
                                <FaUser className="mr-2" /> Manage Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/viewproject" className="flex items-center">
                                <FaClipboard className="mr-2" /> View Project
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/manageproject" className="flex items-center">
                                <FaEdit className="mr-2" /> Manage Project
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/viewskills" className="flex items-center">
                                <FaCogs className="mr-2" /> View Skills
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/manageskills" className="flex items-center">
                                <FaEdit className="mr-2" /> Manage Skills
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/viewblog" className="flex items-center">
                                <FaBlog className="mr-2" /> View Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/manageblog" className="flex items-center">
                                <FaEdit className="mr-2" /> Manage Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/viewtestimonials" className="flex items-center">
                                <FaProductHunt className="mr-2" /> view Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/managetestimonials" className="flex items-center">
                                <FaEdit className="mr-2" /> Manage Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link to="/profiedashboard/viewcontact" className="flex items-center">
                                <FaEnvelope className="mr-2" /> View Contact
                            </Link>
                        </li>
                        <hr className="my-4 border-t border-gray-600" />
                        
                        <li>
                            <Link to="/" className="flex items-center">
                                <FaHome className="mr-2" /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/viewportfolio" className="flex items-center">
                                <ImProfile className="mr-2" /> View Portfolio
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main content area */}
                <div className="flex-grow p-4">
                    <button onClick={toggleSidebar} className="mb-3">
                        <FaBars className="w-5 h-4 bg-black text-white" size={20} />
                    </button>

                    <div>
                        <h2 className="text-center font-bold bg-blue-950 text-white rounded">Welcome to Portfolio Z Dashboard</h2>

                       

                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;
