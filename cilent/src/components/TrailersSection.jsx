import React, { useState } from "react";
import { dummyTrailers, dummyShowsData, assets } from "../assets/assets";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { Share2, Clock } from "lucide-react";

const getEnrichedTrailers = () => {
  if (!Array.isArray(dummyTrailers) || dummyTrailers.length === 0) {
    console.error("Trailer data is missing or malformed.");
    return [];
  }
  return dummyTrailers.slice(0, 4).map((trailer, index) => {
    const show = dummyShowsData && dummyShowsData[index] ? dummyShowsData[index] : {};
    return {
      id: index,
      videoUrl: trailer.videoUrl,
      image: trailer.image,
      title:
        index === 0
          ? "IN THE LOST LANDS"
          : show.title
          ? show.title.toUpperCase()
          : `VIDEO TITLE ${index + 1}`,
      series: index === 0 ? "MARVEL TELEVISION" : "DISNEY+ ORIGINAL",
      type: index === 0 ? "OFFICIAL TRAILER" : index === 1 ? "FINAL TRAILER" : "TEASER",
    };
  });
};

const TrailersSection = () => {
  const enrichedTrailers = getEnrichedTrailers();
  if (enrichedTrailers.length === 0) {
    return <div className="text-white text-center p-20">Error: No trailer data available.</div>;
  }

  const [currentTrailer, setCurrentTrailer] = useState(enrichedTrailers[0]);
  const [playerKey, setPlayerKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTrailerSelect = (trailer) => {
    setCurrentTrailer(trailer);
    setPlayerKey((prevKey) => prevKey + 1);
    setIsPlaying(false);
  };

  const PlayButton = () => (
    <button
      className="absolute inset-0 flex items-center justify-center z-10 focus:outline-none"
      onClick={() => setIsPlaying(true)}
      aria-label="Play Trailer"
    >
      <svg
        className="w-20 h-20 text-red-600 transition-opacity duration-300 hover:opacity-90"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" fill="white" opacity="0.8" />
        <path d="M10 16.5l6-4.5-6-4.5v9z" fill="red" />
      </svg>
    </button>
  );

  const maxWidthClass = "max-w-[960px]";
  const containerPadding = "px-6 md:px-16 lg:px-24 xl:px-44";

  return (
    <div className={`${containerPadding} py-20 overflow-hidden`}>
      <div className={`mx-auto ${maxWidthClass}`}>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 text-gray-400">
          <div className="flex items-center space-x-2">
            <img src={assets.logo} alt="Disney+ Logo" className="h-6" />
            {currentTrailer.series === "MARVEL TELEVISION" && (
              <img src={assets.marvelLogo} alt="Marvel Logo" className="h-5" />
            )}
          </div>
          <div className="flex space-x-4 text-sm font-medium">
            <button className="flex items-center hover:text-white transition duration-200">
              <Clock className="w-4 h-4 mr-1" />
              Watch Later
            </button>
            <button className="flex items-center hover:text-white transition duration-200">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </button>
          </div>
        </div>

        {/* Main Video Player Area */}
        <div className="relative mt-0 aspect-video">
          <BlurCircle top="-100px" right="-100px" />

          <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden">
            {isPlaying ? (
              <ReactPlayer
                key={playerKey}
                url={currentTrailer.videoUrl}
                playing={true}
                controls={true}
                onEnded={() => setIsPlaying(false)}
                onError={() => setIsPlaying(false)}
                className="absolute top-0 left-0"
                width="100%"
                height="100%"
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={currentTrailer.image}
                  alt={currentTrailer.title + " Poster"}
                  className="w-full h-full object-cover"
                />
                <PlayButton />

                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none">
                  <p className="text-sm font-light text-gray-300 uppercase tracking-widest mb-1">
                    {currentTrailer.series}
                  </p>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 leading-none">
                    {currentTrailer.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl font-bold uppercase mr-4">
                      {currentTrailer.type}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center">
                      <svg className="w-6 h-6 mr-1" fill="#FF0000" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-1.285-.357-3.415-.461-5.744-.482C11.516 2.68 10.368 2.68 8.441 2.68c-2.329.021-4.46.125-5.744.482A2.71 2.71 0 0 0 .78 5.66c-.357 1.285-.461 3.415-.482 5.744-.02 1.877-.02 3.025 0 5.744.021 2.329.125 4.46.482 5.744.482 1.877.02 3.025.02 5.744 0 2.329-.021 4.46-.125 5.744-.482A2.71 2.71 0 0 0 23.22 18.34c.357-1.285.461-3.415.482-5.744.02-1.877.02-3.025 0-5.744-.021-2.329-.125-4.46-.482-5.744A2.71 2.71 0 0 0 19.615 3.184zM9.81 15.5V8.5l6.4 3.5-6.4 3.5z" />
                      </svg>
                      YouTube
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Trailers Carousel */}
        <div className="mt-12">
          <p className="text-gray-300 font-medium text-lg mb-4">Trailers</p>

          <div className="flex overflow-x-scroll space-x-4 pb-4 scrollbar-hide">
            {enrichedTrailers.map((trailer) => (
              <div
                key={trailer.id}
                className={`group flex-shrink-0 w-64 h-36 relative cursor-pointer rounded-lg overflow-hidden transition duration-300 ${
                  currentTrailer.id === trailer.id
                    ? "ring-4 ring-red-600"
                    : "hover:ring-2 hover:ring-gray-500"
                }`}
                onClick={() => handleTrailerSelect(trailer)}
              >
                <img
                  src={trailer.image}
                  alt={trailer.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-sm font-semibold text-white truncate">{trailer.title}</p>
                  <p className="text-xs text-gray-400 truncate">{trailer.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailersSection;
