import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center bg-gray-100 min-h-screen overflow-hidden">
      {/* Left Section - Text Content */}
      <div className="flex-1 p-8 md:p-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Welcome to TODO_APP
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Organize your tasks, stay on track, and achieve more with ease.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600">
          <Link to={'/dashboard'}>
            Get Started
          </Link>
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1 h-1/2 md:h-full w-full">
        <img
          src="/hero.png" 
          alt="Hero"
          className="object-cover h-full w-full"
        />
      </div>
    </section>
  );
}

export default Hero;
