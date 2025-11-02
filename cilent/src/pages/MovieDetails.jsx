// MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyDateTimeData, dummyShowsData } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import { Star, PlayCircle, Heart } from "lucide-react";
import { useAppContext } from "../context/AppContext";

/**
 * This version:
 * - Uses dummyShowsData (no axios / no backend calls)
 * - Preserves your original layout, sections and IDs
 * - Adds favourite toggle via toggleFavourite() from AppContext
 * - Keeps scrollToDateSection, casts, "You May Also Like", and booking placeholders
 */

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { favoriteMovies = [], toggleFavourite, imageBaseUrl = "" } = useAppContext();

  const [show, setShow] = useState(null);

  // load show from dummyShowsData by matching _id or id (handles both)
  const getShow = () => {
    const movie =
      dummyShowsData.find((s) => String(s._id) === String(id)) ||
      dummyShowsData.find((s) => String(s.id) === String(id));
    if (movie) {
      setShow({
        movie: {
          ...movie,
          vote_average: movie.vote_average || 0,
          overview: movie.overview || "No overview available.",
          runtime: movie.runtime || "N/A",
          genres: movie.genres || (movie.genre ? movie.genre.map((g) => ({ name: g })) : []),
          release_date: movie.release_date || "2025-01-01",
          casts: movie.casts || [],
        },
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!show)
    return (
      <div className="text-center py-40 text-gray-400 text-xl font-medium">
        Loading movie details...
      </div>
    );

  const { movie } = show;
  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

  // check if current movie is favourited (match by _id or id)
  const isFavourite = favoriteMovies.some(
    (m) => String(m._id) === String(movie._id) || String(m.id) === String(movie.id)
  );

  const scrollToTop = () => window.scrollTo(0, 0);

  const scrollToDateSection = () => {
    const dateSection = document.getElementById("date-section");
    if (dateSection) dateSection.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleFavourite = () => {
    // toggleFavourite expects a movie-like object; pass movie (original shape)
    // If your toggleFavourite expects a different field set, adapt here.
    toggleFavourite(movie);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-40 py-20">
      {/* --------------------- MOVIE INFO HEADER --------------------- */}
      <div className="flex flex-col md:flex-row gap-12 max-w-7xl mx-auto relative z-10">
        {/* Poster */}
        <div className="max-md:mx-auto">
          <img
            // if your imageBaseUrl is empty, using movie.poster_path directly will still work
            src={movie.poster_path?.startsWith("http") ? movie.poster_path : `${imageBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              // fallback to poster_path as-is or a placeholder
              e.target.src = movie.poster_path || `${imageBaseUrl}${movie.poster_path}` || "/placeholder-poster.jpg";
            }}
            className="rounded-xl h-[30rem] w-[20rem] object-cover shadow-2xl shadow-red-900/50 transition-transform duration-300 hover:scale-[1.02] max-md:h-[26rem] max-md:w-[17rem]"
          />
        </div>

        {/* Movie Info */}
        <div className="relative flex flex-col gap-4 pt-4 md:pt-0">
          <BlurCircle top="-150px" left="-150px" className="opacity-70" />
          <BlurCircle top="100px" right="-50px" className="opacity-70" />

          <p className="text-red-400 uppercase tracking-[0.3em] font-medium text-sm">English</p>

          <h1 className="text-6xl font-extrabold tracking-tight max-w-3xl leading-tight max-md:text-4xl">
            {movie.title}
          </h1>

          <div className="flex items-center gap-3 text-gray-300 mt-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-lg font-semibold">{Number(movie.vote_average).toFixed(1)} User Rating</span>
          </div>

          <p className="text-gray-400 mt-3 text-base leading-7 max-w-xl">{movie.overview}</p>

          <p className="text-gray-500 font-medium text-sm mt-3">
            <span className="text-white font-semibold">{movie.runtime} min</span> •{" "}
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map((g) => (typeof g === "string" ? g : g.name)).join(", ")
              : "N/A"}{" "}
            • <span className="text-white font-semibold">{releaseYear}</span>
          </p>

          <div className="flex items-center gap-4 mt-8">
            <button className="flex items-center gap-2 px-8 py-3 bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 rounded-full text-base font-semibold transition duration-200 shadow-lg shadow-zinc-900/50">
              <PlayCircle className="w-5 h-5" />
              Watch Trailer
            </button>

            <button
              onClick={scrollToDateSection}
              className="px-12 py-3 bg-red-600 hover:bg-red-700 rounded-full text-base font-bold transition duration-200 shadow-xl shadow-red-900/70 uppercase tracking-wider"
            >
              Buy Tickets
            </button>

            <button
              onClick={handleToggleFavourite}
              className={`p-3 bg-zinc-800 rounded-full hover:bg-red-900/50 transition duration-200 border ${
                isFavourite ? "bg-red-600 border-red-600 hover:bg-red-700" : "border-zinc-700"
              }`}
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart className={`w-6 h-6 ${isFavourite ? "fill-white text-white" : "text-red-500 fill-red-500/30"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* --------------------- 1. CAST SECTION --------------------- */}
      <div className="mt-24 max-w-7xl mx-auto">
        <p className="text-3xl font-bold mb-8 tracking-wide">Your Favorite Cast</p>
        <div className="overflow-x-auto no-scrollbar pb-6">
          <div className="flex items-center gap-8 w-max">
            {movie.casts && movie.casts.length > 0 ? (
              movie.casts.slice(0, 12).map((cast, index) => (
                <div key={index} className="flex flex-col items-center text-center text-gray-300 w-24 flex-shrink-0">
                  <img
                    src={cast.profile_path}
                    alt={cast.name}
                    onError={(e) => (e.target.src = "/profile-placeholder.png")}
                    className="rounded-full h-24 w-24 object-cover mb-3 border-2 border-zinc-700 hover:border-red-500 transition duration-300"
                  />
                  <p className="text-sm font-medium text-white">{cast.name}</p>
                  <p className="text-xs text-gray-500 italic mt-0.5">{cast.character}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Cast information not available.</p>
            )}
          </div>
        </div>
      </div>

      {/* --------------------- 2. YOU MAY ALSO LIKE --------------------- */}
      <div className="mt-24 max-w-7xl mx-auto">
        <p className="text-lg font-medium mt-20 mb-8">You May Also Like</p>
        <div className="flex flex-wrap max-w-sm:justify-center gap-8">
          {dummyShowsData.slice(0, 4).map((m, idx) => (
            <MovieCard key={idx} movie={m} />
          ))}
        </div>
        <div className="flex justify-center mt-20">
          <button
            onClick={() => {
              navigate("/movies");
              scrollToTop();
            }}
            className="px-10 py-3 text-sm bg-red-600 hover:bg-red-700 transition rounded-md font-medium cursor-pointer"
          >
            Show more
          </button>
        </div>
      </div>

      {/* --------------------- 3. DATE SELECTION (MOVED TO LAST) --------------------- */}
      <div id="date-section" className="mt-24">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      {/* --------------------- 4. SHOWTIME SELECTION (MOVED TO LAST) --------------------- */}
      <div className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 tracking-wide text-white">Select Showtime</h2>
        <div className="bg-zinc-900 rounded-xl p-6 h-40 flex items-center justify-center text-gray-400 border border-dashed border-zinc-700">
          <p>Time selection component will go here (e.g., 10:00 AM, 1:30 PM, 4:45 PM)</p>
        </div>
      </div>

      {/* --------------------- 5. FOOD & BEVERAGES (MOVED TO LAST) --------------------- */}
      <div className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 tracking-wide text-white">Food & Beverages</h2>
        <div className="bg-zinc-900 rounded-xl p-6 h-64 flex items-center justify-center text-gray-400 border border-dashed border-zinc-700">
          <p>F&B selection carousel and checkout summary will go here</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
