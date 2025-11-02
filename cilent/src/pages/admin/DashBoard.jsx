import React, { useEffect, useState } from "react";
import { Star, TrendingUp, Users, Film, DollarSign, Calendar } from "lucide-react";

const BlurCircle = ({ position }) => {
  const positions = {
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
    'center-left': 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div className={`absolute ${positions[position]} w-96 h-96 rounded-full bg-gradient-to-br from-red-500/20 to-red-700/20 blur-3xl animate-pulse pointer-events-none`} />
  );
};

// Dummy dashboard data with more movies
const dummyDashboardData = {
  totalBookings: 1247,
  totalRevenue: 374100,
  totalUser: 892,
  activeShows: [
    {
      show_id: 1,
      movie: {
        title: "The Simpsons Movie",
        poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
        vote_average: 8.5
      },
      showPrice: 250
    },
    {
      show_id: 2,
      movie: {
        title: "Avatar: The Way of Water",
        poster_path: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500&h=750&fit=crop",
        vote_average: 7.7
      },
      showPrice: 350
    },
    {
      show_id: 3,
      movie: {
        title: "Deadpool & Wolverine",
        poster_path: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&h=750&fit=crop",
        vote_average: 8.8
      },
      showPrice: 300
    },
    {
      show_id: 4,
      movie: {
        title: "The Batman",
        poster_path: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=500&h=750&fit=crop",
        vote_average: 8.3
      },
      showPrice: 280
    },
    {
      show_id: 5,
      movie: {
        title: "Venom: The Last Dance",
        poster_path: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=750&fit=crop",
        vote_average: 7.9
      },
      showPrice: 320
    },
    {
      show_id: 6,
      movie: {
        title: "Oppenheimer",
        poster_path: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&h=750&fit=crop",
        vote_average: 8.6
      },
      showPrice: 400
    },
    {
      show_id: 7,
      movie: {
        title: "Dune: Part Two",
        poster_path: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&h=750&fit=crop",
        vote_average: 8.4
      },
      showPrice: 380
    },
    {
      show_id: 8,
      movie: {
        title: "Barbie",
        poster_path: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=500&h=750&fit=crop",
        vote_average: 7.2
      },
      showPrice: 270
    },
    {
      show_id: 9,
      movie: {
        title: "Guardians of the Galaxy Vol. 3",
        poster_path: "https://images.unsplash.com/photo-1579566346927-c68383817a25?w=500&h=750&fit=crop",
        vote_average: 8.1
      },
      showPrice: 290
    },
    {
      show_id: 10,
      movie: {
        title: "Mission: Impossible",
        poster_path: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
        vote_average: 7.8
      },
      showPrice: 310
    },
    {
      show_id: 11,
      movie: {
        title: "Spider-Man: Across the Spider-Verse",
        poster_path: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=500&h=750&fit=crop",
        vote_average: 8.7
      },
      showPrice: 330
    },
    {
      show_id: 12,
      movie: {
        title: "John Wick: Chapter 4",
        poster_path: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=500&h=750&fit=crop",
        vote_average: 8.2
      },
      showPrice: 295
    }
  ]
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(dummyDashboardData);
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API loading
    setTimeout(() => {
      setDashboardData(dummyDashboardData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950 text-white overflow-hidden relative flex items-center justify-center">
        <BlurCircle position="top-left" />
        <BlurCircle position="top-right" />
        <BlurCircle position="bottom-left" />
        <BlurCircle position="bottom-right" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950 text-white overflow-hidden">
      {/* Blur Circles */}
      <BlurCircle position="top-left" />
      <BlurCircle position="top-right" />
      <BlurCircle position="bottom-left" />
      <BlurCircle position="bottom-right" />

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">
            Dash<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">board</span>
          </h1>
          <p className="text-gray-400 mt-2">Overview of your theater management</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/20 p-3 rounded-xl">
                <Calendar className="w-7 h-7 text-red-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Bookings</p>
            <h3 className="text-4xl font-bold text-white">{dashboardData.totalBookings.toLocaleString()}</h3>
            <p className="text-green-400 text-xs mt-2">+12% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/20 p-3 rounded-xl">
                <DollarSign className="w-7 h-7 text-red-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
            <h3 className="text-4xl font-bold text-white">{currency}{dashboardData.totalRevenue.toLocaleString()}</h3>
            <p className="text-green-400 text-xs mt-2">+18% from last month</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-red-950/30 backdrop-blur-xl rounded-2xl p-6 border border-red-900/50 shadow-xl hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500/20 p-3 rounded-xl">
                <Users className="w-7 h-7 text-red-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Users</p>
            <h3 className="text-4xl font-bold text-white">{dashboardData.totalUser.toLocaleString()}</h3>
            <p className="text-green-400 text-xs mt-2">+8% from last month</p>
          </div>
        </div>

        {/* Active Shows Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
            Active Shows
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {dashboardData.activeShows.map((show) => (
            <div
              key={show.show_id}
              className="group relative rounded-2xl overflow-hidden bg-gray-800/30 backdrop-blur-sm border border-red-900/30 hover:border-red-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={show.movie.poster_path}
                  alt={show.movie.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/300/400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-bold text-xs">{show.movie.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-b from-gray-900/90 to-black">
                <p className="font-semibold text-white mb-2 truncate group-hover:text-red-400 transition-colors">
                  {show.movie.title}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-red-500" />
                    <p className="text-lg font-bold text-white">
                      {currency} {show.showPrice}
                    </p>
                  </div>
                  <div className="bg-red-500/20 px-2 py-1 rounded-full">
                    <Film className="w-3.5 h-3.5 text-red-400" />
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;