const MyContact = () => {
    return (
        <div className="flex justify-center mt-10 items-center  bg-gray-100 p-5">
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-md w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Connnect With Me</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your message"
                            rows="5"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MyContact;
