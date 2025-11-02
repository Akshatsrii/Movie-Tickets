import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../components/MovieCard';
import BlurCircle from '../components/BlurCircle'; // ✅ import this

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]">
      
      {/* 🌀 Blur Circles for aesthetic glow */}
      <BlurCircle top="-100px" left="-100px" />   {/* Left side blur */}
      <BlurCircle bottom="-100px" right="-100px" /> {/* Right side blur */}

      <h1 className="text-lg font-medium my-4 text-gray-200 text-center">
        Now Showing
      </h1>

      <div className="flex flex-wrap max-sm:justify-center gap-8 justify-center">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-center">No movies available</h1>
    </div>
  );
};

export default Movies;
