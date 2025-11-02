// src/components/MovieCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "lucide-react";
import timeformat from "../lib/timeformat"; // make sure this exists or replace with fallback

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (movie?._id || movie?.id) {
      navigate(`/movies/${movie._id || movie.id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className="flex flex-col justify-between p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-64"
    >
      {/* Movie Poster */}
      <img
        onClick={handleNavigation}
        src={movie.backdrop_path || movie.poster_path || "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.title}
        className="rounded-lg h-52 w-full object-cover object-center cursor-pointer"
      />

      {/* Movie Info */}
      <p className="font-semibold mt-2 truncate">{movie.title}</p>
      <p className="text-sm text-gray-400 mt-2">
        {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
        {" | "}
        {Array.isArray(movie.genres)
          ? movie.genres.slice(0, 2).map((genre) => genre.name).join(" | ")
          : "Genre N/A"}
        {" | "}
        {movie.runtime ? timeformat(movie.runtime) : "Duration N/A"}
      </p>

      {/* Rating and Buy Button */}
      <div className="flex items-center justify-between mt-4 pb-3">
        <button
          onClick={handleNavigation}
          className="px-4 py-2 text-xs bg-pink-600 hover:bg-pink-700 transition rounded-full font-medium cursor-pointer"
        >
          Buy Tickets
        </button>

        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
