import React from 'react';
import Navbar from './Navbar';

const AboutUs = () => {
  return (
     <div id="about" className="min-h-screen bg-white"> {/* Added id="about" */}
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center">
          {/* Left Content */}
          <div className="w-full md:w-1/2 pr-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-6">
              ABOUT US
            </h1>
            <div className="w-24 h-1 bg-indigo-900 mb-8"></div>
            <p className="text-gray-600 text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veni 
              am, quis nostrud exercitation
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
              LEARN MORE
            </button>
          </div>

          {/* Right Content - Illustration Container */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute top-0 right-0 w-4/5 h-full bg-[#FFA69E] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] z-0">
              {/* Decorative background shape using Tailwind border radius */}
            </div>
            <img 
              src="/about_us_img.jpg" 
              alt="Team illustration" 
              className="relative z-10 w-full"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;