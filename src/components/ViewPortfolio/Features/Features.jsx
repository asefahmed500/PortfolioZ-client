

const Features = () => {
    return (
        <div className=" py-16">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Features</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Card 1 */}
                    <div className="text-center text-white bg-gray-800 rounded-xl shadow-lg p-8  transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                        <h3 className="text-2xl font-semibold mb-6">Easy to Use</h3>
                        <p className="text-lg">A simple form-based creation process with no coding required. Ideal for users of all technical skill levels.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="text-center text-white bg-gray-800 rounded-xl shadow-lg p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                        <h3 className="text-2xl font-semibold mb-6">Customizable</h3>
                        <p className="text-lg">Choose from various themes and layouts to perfectly match your personal style or brand.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="text-center text-white bg-gray-800 rounded-xl shadow-lg p-8 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                        <h3 className="text-2xl font-semibold mb-6">Professional</h3>
                        <p className="text-lg">Sleek, modern designs to showcase your work effectively, elevating your brand&apos;s presence.</p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Features;