import React, { useState, useEffect } from "react";
import { Star, Calendar, DollarSign, Plus, Clock, Trash2 } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dummyShowsData } from "../../assets/assets";


// Blur Circle Component
const BlurCircle = ({ position }) => {
  const positions = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2'
  };

  return (
    <div className={`absolute ${positions[position]} w-96 h-96 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 blur-3xl animate-pulse pointer-events-none`} />
  );
};

// Movie Card Component
const MovieCard = ({ movie, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative flex-shrink-0 w-44 cursor-pointer transition-all duration-300 rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.03)] bg-white border border-zinc-200/80
      ${isSelected ? 'ring-4 ring-[#e51e25] scale-102 shadow-lg shadow-red-500/20' : 'hover:scale-102 hover:border-[#e51e25]/50'}`}
    >
      <img 
        src={movie.poster_path} 
        alt={movie.title}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
        }}
      />
      
      {/* Rating Badge */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        <span className="text-white font-bold text-xs">{movie.vote_average.toFixed(1)}</span>
      </div>

      {/* Movie Info */}
      <div className="p-3 bg-white border-t border-zinc-100">
        <h3 className="text-zinc-950 font-bold text-xs truncate mb-0.5">{movie.title}</h3>
        <p className="text-zinc-400 text-xxs font-medium">{movie.vote_count} votes</p>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-[#e51e25]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className="bg-[#e51e25] text-white px-3 py-1.5 rounded-full font-bold text-xxs shadow-sm">
          Select Movie
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function AddShows() {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPrice, setShowPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTimes, setDateTimes] = useState([]);

  useEffect(() => {
    setNowPlayingMovies(dummyShowsData);
  }, []);

  const handleAddDateTime = () => {
    if (!selectedDate) return alert("Please select a valid date and time!");
    const formattedDate = selectedDate.toLocaleString("en-US");
    if (dateTimes.includes(formattedDate)) return alert("Already added!");
    setDateTimes([...dateTimes, formattedDate]);
    setSelectedDate(null);
  };

  const handleRemoveDateTime = (dt) => {
    setDateTimes(dateTimes.filter((t) => t !== dt));
  };

  const handleAddShow = () => {
    if (!selectedMovie) return alert("Please select a movie first!");
    if (!showPrice) return alert("Enter a show price!");
    if (dateTimes.length === 0) return alert("Please add at least one showtime!");

    alert(
      `✅ Show added for ${selectedMovie.title} | ${dateTimes.length} show(s) at ${currency}${showPrice}`
    );

    setSelectedMovie(null);
    setShowPrice("");
    setDateTimes([]);
  };

  return (
    <div className="relative min-h-screen bg-transparent text-zinc-900 overflow-hidden">
      {/* Blur Circles */}
      <BlurCircle position="top-left" />
      <BlurCircle position="top-right" />
      <BlurCircle position="bottom-left" />
      <BlurCircle position="bottom-right" />

      {/* Content Container */}
      <div className="relative z-10 p-4 md:p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-1 select-none text-zinc-950">
            Add <span className="text-[#e51e25]">Shows</span>
          </h1>
          <p className="text-zinc-400 font-medium text-sm">Add show schedules for movie screenings</p>
        </div>

        {/* Now Playing Section */}
        <div className="mb-10">
          <h2 className="text-xl font-extrabold text-zinc-900 mb-6 flex items-center gap-2">
            <div className="w-1.5 h-6 bg-[#e51e25] rounded-full" />
            Now Playing Movies
          </h2>
          
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 w-max px-1">
              {nowPlayingMovies.map((movie, index) => (
                <MovieCard 
                  key={movie.id}
                  movie={movie}
                  isSelected={selectedMovie?.id === movie.id}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Booking Section - Only shown when movie is selected */}
        {selectedMovie && (
          <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 md:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-[#e51e25]" />
              <h2 className="text-2xl font-extrabold text-zinc-900">{selectedMovie.title}</h2>
            </div>

            <div className="flex items-center gap-2 mb-6 text-sm font-semibold">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-zinc-900 font-extrabold">{selectedMovie.vote_average.toFixed(1)}</span>
              <span className="text-zinc-450">| {selectedMovie.vote_count} Votes</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Price Input */}
              <div>
                <label className="block text-xs font-extrabold text-zinc-500 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <DollarSign className="w-4 h-4 text-[#e51e25]" />
                  Show Price ({currency})
                </label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={showPrice}
                  onChange={(e) => setShowPrice(e.target.value)}
                  className="w-full bg-zinc-50/50 border border-zinc-200/80 rounded-xl px-4 py-3.5 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#e51e25]/40 focus:border-transparent transition-all"
                />
              </div>

              {/* DateTime Input */}
              <div>
                <label className="block text-xs font-extrabold text-zinc-500 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-[#e51e25]" />
                  Select Date & Time
                </label>
                <div className="flex gap-3">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    placeholderText="Select date and time"
                    className="flex-1 bg-zinc-50/50 border border-zinc-200/80 rounded-xl px-4 py-3.5 text-zinc-800 placeholder-zinc-400 focus:ring-2 focus:ring-[#e51e25]/40 outline-none text-sm"
                  />
                  <button 
                    onClick={handleAddDateTime}
                    className="bg-[#e51e25] hover:bg-[#c4161c] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-1.5 shadow-[0_4px_12px_rgba(229,30,37,0.25)] cursor-pointer text-sm">
                    <Plus className="w-4.5 h-4.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Date-Times */}
            {dateTimes.length > 0 && (
              <div className="mt-8">
                <p className="text-zinc-500 mb-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5 text-[#e51e25]" />
                  Selected Show Timings:
                </p>
                <div className="flex flex-wrap gap-3">
                  {dateTimes.map((dt, i) => (
                    <div
                      key={i}
                      className="bg-zinc-50 border border-zinc-200 text-zinc-700 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm hover:border-[#e51e25]/30 transition-all"
                    >
                      <Clock className="w-4 h-4 text-[#e51e25]" />
                      <span className="text-xs font-bold">{dt}</span>
                      <Trash2
                        className="w-4 h-4 cursor-pointer text-zinc-400 hover:text-[#e51e25] transition-colors ml-1"
                        onClick={() => handleRemoveDateTime(dt)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Show Button */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleAddShow}
                className="bg-[#e51e25] hover:bg-[#c4161c] text-white px-10 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-103 shadow-[0_4px_14px_rgba(229,30,37,0.3)] cursor-pointer uppercase tracking-wider">
                Add Show
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}