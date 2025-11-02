import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BlurCircle from "./BlurCircle";
import { dummyShowsData, assets } from "../assets/assets";

const FeatureSection = () => {
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/Movies");
    window.scrollTo(0, 0);
  };

  const handleBuyTicket = (id) => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  // ✅ Only show these movies
  const allowedTitles = [
    "In the Lost Lands",
    "Until Dawn",
    "Lilo & Stitch",
    "Havoc",
    "A Minecraft Movie",
    "Mission: Impossible – The Final Reckoning",
    "Thunderbolts*",
    "Joker: Folie à Deux",
    "The Marvels",
    "Dune: Part Two",
  ];

  const showsWithFallback = dummyShowsData
    .filter((show) => allowedTitles.includes(show.title))
    .slice(0, 4) // show only 4 featured
    .map((show) => ({
      ...show,
      poster_path:
        show.poster_path && show.poster_path.trim() !== ""
          ? show.poster_path
          : assets.placeholderPoster ||
            "https://via.placeholder.com/400x600?text=No+Image",
    }));

  return (
    <div className="relative px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden py-24">
      {/* 🌌 Background Glow Effects */}
      <BlurCircle top="-100px" left="-100px" />
      <BlurCircle bottom="-150px" right="-150px" />

      {/* 🏷️ Header Section */}
      <div className="flex items-center justify-between mb-12 relative z-10">
        <p className="text-white font-semibold text-xl tracking-wide">
          🎞️ Now Showing
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="group flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
        >
          View All
          <ArrowRight className="group-hover:translate-x-1 transition w-5 h-5" />
        </button>
      </div>

      {/* 🎬 Movie Cards */}
      <div className="flex flex-wrap justify-center gap-8 relative z-10">
        {showsWithFallback.map((show) => (
          <div
            key={show._id}
            className="bg-zinc-900/80 border border-red-600/30 rounded-xl overflow-hidden text-white shadow-lg w-64 transition-all duration-300 hover:shadow-red-900/50 hover:-translate-y-1"
          >
            <img
              src={show.poster_path}
              alt={show.title}
              onError={(e) => {
                e.target.src =
                  assets.placeholderPoster ||
                  "https://via.placeholder.com/400x600?text=No+Image";
              }}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-36">
              <div>
                <h3 className="text-lg font-semibold mb-1">{show.title}</h3>
                <p className="text-sm text-gray-400">{show.genre}</p>
              </div>
              <button
                onClick={() => handleBuyTicket(show._id)}
                className="w-full py-2 mt-3 bg-red-600 hover:bg-red-700 text-sm rounded-full font-medium transition"
              >
                Buy Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🍿 Show More Button */}
      <div className="flex justify-center mt-16 relative z-10">
        <button
          onClick={handleShowMore}
          className="px-10 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-red-600 to-pink-500 
                     hover:from-pink-500 hover:to-red-600 text-white shadow-lg shadow-red-900/30
                     transition-transform duration-300 hover:scale-105"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default FeatureSection;
