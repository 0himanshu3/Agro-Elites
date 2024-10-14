"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Facilities from '@/components/Facilities';
import Stories from '@/components/Stories';
import News from '@/components/News';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import Login from '@/components/Login';
import LinksSec from '@/components/LinksSec';

const Layout = () => {
  return (
    <div className="bg-yellow-50 text-gray-900 min-h-screen">
      <Navbar className="py-4 px-8" />

      <div className="mainsec flex flex-col lg:flex-row gap-6 p-6">
        <div className="flex-1 flex items-stretch">
          <About className="flex-1 p-4" />
        </div>

        {/* <div className="flex-1 flex items-stretch">
          <div className="relative-container flex-1 p-4">
            <Login />
          </div>
        </div> */}
      </div>

      <Facilities className="my-8 p-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <News className="p-4" />
        <GovernmentSchemes className="p-4" />
      </div>

      <Stories className="my-8 p-6" />
      <LinksSec/>
      <footer className="bg-green-900 text-white text-center py-6 mt-8">
        <p>© Krishi-help</p>
      </footer>
    </div>
  );
};

export default Layout;
