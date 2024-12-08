import { useState } from "react";
import useHotToast from "../../Hooks/useHotToast";

const ContactMe = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const {showToast} = useHotToast()

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., send data to a server
        console.log("Name:", name);
        console.log("Email:", email);
        // Reset form fields
        setName("");
        setEmail("");
        showToast("Message Sent Successfully")

    };

    return (
        <div className="mt-12 p-6 bg-gradient-to-r from-gray-700 via-black to-blue-900 rounded-lg shadow-xl">
            <h2 className="text-center text-4xl font-bold text-white mb-8">Contact Us</h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-2xl space-y-6">
                <div className="mb-6">
                    <label
                        className="block text-gray-800 text-lg font-medium mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Name"
                    />
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-800 text-lg font-medium mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Email"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 ease-in-out"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactMe;
