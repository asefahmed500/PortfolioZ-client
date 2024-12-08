

const Pricing = () => {
    return (
        <div className="mt-20 mb-16">
            <div className="text-center text-4xl font-serif mb-8">
                <h2>Pricing</h2>
                <p className="text-lg text-gray-500">Choose the plan that&apos;s right for you</p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {/* Basic Plan */}
                <div className="max-w-sm rounded-lg bg-white shadow-xl p-6">
                    <h3 className="text-2xl font-semibold text-center mb-4">Basic</h3>
                    <div className="text-center text-4xl font-bold mb-4">$19.99</div>
                    <p className="text-center text-gray-500 mb-4">Per Month</p>
                    <ul className="mb-6">
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> 1 Portfolio Project
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> Basic Customization
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> Email Support
                        </li>
                    </ul>
                    <button className="btn btn-primary w-full">Choose Plan</button>
                </div>

                {/* Standard Plan */}
                <div className="max-w-sm rounded-lg bg-blue-100 shadow-xl p-6">
                    <h3 className="text-2xl font-semibold text-center mb-4">Standard</h3>
                    <div className="text-center text-4xl font-bold mb-4">$39.99</div>
                    <p className="text-center text-gray-500 mb-4">Per Month</p>
                    <ul className="mb-6">
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> 3 Portfolio Projects
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> Custom Domain
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> Priority Email Support
                        </li>
                    </ul>
                    <button className="btn btn-primary w-full">Choose Plan</button>
                </div>

                {/* Premium Plan */}
                <div className="max-w-sm rounded-lg bg-yellow-100 shadow-xl p-6">
                    <h3 className="text-2xl font-semibold text-center mb-4">Premium</h3>
                    <div className="text-center text-4xl font-bold mb-4">$69.99</div>
                    <p className="text-center text-gray-500 mb-4">Per Month</p>
                    <ul className="mb-6">
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> Unlimited Portfolio Projects
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> Full Customization
                        </li>
                        <li className="flex items-center mb-2">
                            <span className="text-green-500 mr-2">✔</span> 24/7 Support
                        </li>
                    </ul>
                    <button className="btn btn-primary w-full">Choose Plan</button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
