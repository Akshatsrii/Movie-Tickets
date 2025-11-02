import React from 'react';
import { assets } from '../assets/assets'; // Ensure logo.svg, googlePlay, and appStore are defined here

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-400 pt-16">
      <div className="max-w-[95%] mx-auto px-6 md:px-10 lg:px-16 xl:px-20">

        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 pb-14">

          {/* Column 1: Logo and Description */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            {/* ✅ Use logo.svg instead of text */}
            <img
              src={assets.logo}
              alt="QuickShow Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />

            <p className="text-sm max-w-md leading-relaxed">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            {/* App Store Links */}
            <div className="flex space-x-4 pt-2">
              <img src={assets.googlePlay} alt="Get it on Google Play" className="h-9 cursor-pointer" />
              <img src={assets.appStore} alt="Download on the App Store" className="h-9 cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition duration-200">Home</li>
              <li className="hover:text-white cursor-pointer transition duration-200">About us</li>
              <li className="hover:text-white cursor-pointer transition duration-200">Contact us</li>
              <li className="hover:text-white cursor-pointer transition duration-200">Privacy policy</li>
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg mb-4">Get in touch</h4>
            <p className="text-sm">+1-234-567-890</p>
            <p className="text-sm hover:text-white cursor-pointer transition duration-200">contact@example.com</p>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="border-t border-gray-800 pt-6 pb-4 text-center">
          <p className="text-xs">
            Copyright 2025 © GreatStack. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
