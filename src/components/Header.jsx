import React from 'react';

const Header = () => {
  return (
    <div className="flex min-h-screen font-sans relative">
      {/* Left Side */}
      <div className="w-1/2 bg-gray-100 flex flex-col justify-between">
        {/* Role and Description */}
        <div className='absolute left-12 bottom-48 font-poppins'>
          <p className="text-lg text-black">Frontend Developer</p>
          <p className="text-lg text-gray-500 mt-1">
            I collaboarate with designers & developers<br />
            to build something special<br />
            while making it look easy.
          </p>
        </div>

        {/* Name */}
         <h1 className="absolute left-10 bottom-0 text-[170px] font-inter z-20 font-black leading-none text-black tracking-tight whitespace-nowrap">
          NATHAN KADURU
        </h1>
      </div>

      {/* Right Side */}
      <div className="w-1/2 relative bg-[#D1D1D1]">
        {/* Navigation */}
        <nav className="absolute top-12 font-poppins left-12 text-left">
          <ul className="space-y-1 text-3xl font-bold text-black">
            <li>Home</li>
            <li>About</li>
            <li>
              Work<span className="text-xs align-top">(6)</span>
            </li>
            <li>Contact</li>
          </ul>
        </nav>

        {/* Image */}
        <div className="absolute bottom-0 right-0 h-full w-full flex items-end justify-end">
          <img
            src="/post1.png"
            alt="Profile"
            className="h-full object-cover max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;