import React from 'react';

export default function About() {
    return (
        <div className="min-h-screen bg-white text-black font-inter">
            {/* Container */}
            <div className="px-8 py-16">

                {/* Hero Section */}
                <div className="flex flex-col items-start relative">
                    {/* Image */}
                    <div className="flex items-end px-24 gap-16">
                        <div><img src='/about.png' alt='about' /></div>
                        <h1 className='text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tigh'>I help brands craft</h1>
                    </div>

                    {/* Text */}
                    <div className="space-y-8">
                        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight font-inter">
                            meaningful<br />
                            stories and compelling visuals that deeply
                            resonate with their audience, foster strong<br />
                            connections, build lasting loyalty, and drive<br />
                            sustainable long-term growth.
                        </h2>
                    </div>
                </div>

                {/* Divider */}
                {/* Wrapper div for 50% width and right alignment */}
                <div className="w-1/2 ml-auto font-poppins">
                    <hr className="my-16 border-gray-300" />

                    {/* Description Section */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-16">
                            {/* From A to Z */}
                            <div className="space-y-3 ">
                                <h3 className="text-md font-semibold">From A to Z</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    I manage your entire branding process, from <br /> concept to execution. Whether it's logo design, <br /> messaging, or strategy, I ensure everything <br /> aligns for an impactful brand.
                                </p>
                            </div>

                            {/* Solo or Team */}
                            <div className="space-y-3">
                                <h3 className="text-md font-semibold">Solo or Team</h3>
                                <p className="text-gray-500  font-medium leading-relaxed">
                                    I work both independently and with a trusted team, adapting to your project's needs to deliver the best results, whether it's a solo vision or a collaborative effort.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Call-to-action */}
                <div className="flex mt-8 justify-center">
                    <button className="bg-black text-white px-10 py-6 rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
                        More about me
                    </button>
                </div>
            </div>
        </div>
    );
}