import React, { useState, useEffect } from "react";
import {
  Film,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import BlurCircle from "../components/BlurCircle";

const MyBookings = () => {
  const currency = "₹";

  const timeFormat = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const dateFormat = (dateTime) => {
    return new Date(dateTime).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [bookings, setBookings] = useState([
    {
      _id: "1",
      show: {
        movie: {
          title: "Interstellar",
          runtime: 169,
          poster_path:
            "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          genre: "Sci-Fi, Drama",
        },
        showDateTime: "2025-11-03T19:30:00",
        pricePerSeat: 250,
        theater: "PVR Cinemas, Screen 3",
      },
      bookedSeats: ["A1", "A2", "A3"],
      isPaid: false,
    },
    {
      _id: "2",
      show: {
        movie: {
          title: "The Dark Knight",
          runtime: 152,
          poster_path:
            "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          genre: "Action, Crime",
        },
        showDateTime: "2025-11-05T21:00:00",
        pricePerSeat: 300,
        theater: "INOX Cinema, Screen 1",
      },
      bookedSeats: ["B5", "B6"],
      isPaid: true,
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-red-400 text-lg font-medium">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <BlurCircle position="left" />
        <BlurCircle position="right" />
        <div className="text-center z-10">
          <Ticket className="w-24 h-24 text-red-500 mx-auto mb-6 opacity-60" />
          <p className="text-gray-400 text-xl">No bookings found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Red glowing blur background */}
      <BlurCircle position="left" />
      <BlurCircle position="right" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <Ticket className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
              My Bookings
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Your upcoming and past movie experiences
          </p>
        </div>

        {/* Bookings List */}
        <div className="grid gap-6 md:gap-8">
          {bookings.map((item) => {
            const movie = item.show.movie;
            const showDateTime = item.show.showDateTime;
            const seats = item.bookedSeats;
            const pricePerSeat = item.show.pricePerSeat;
            const totalAmount = pricePerSeat * seats.length;
            const isUpcoming = new Date(showDateTime) > new Date();

            return (
              <div
                key={item._id}
                className="group bg-gradient-to-br from-slate-900/90 via-red-900/20 to-slate-900/90 border border-red-500/30 rounded-3xl overflow-hidden shadow-2xl hover:shadow-red-500/30 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="flex flex-col lg:flex-row gap-6 p-6 lg:p-8">
                  {/* Poster */}
                  <div className="relative flex-shrink-0 w-full lg:w-48 h-64 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    {isUpcoming && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Upcoming
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                        {movie.title}
                      </h2>
                      <p className="text-red-300 text-sm mb-4">{movie.genre}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-gray-300">
                          <Calendar className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="font-medium">
                              {dateFormat(showDateTime)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <Clock className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-xs text-gray-500">Time</p>
                            <p className="font-medium">
                              {timeFormat(showDateTime)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <Film className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="font-medium">{movie.runtime} mins</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-300">
                          <MapPin className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-xs text-gray-500">Theater</p>
                            <p className="font-medium text-sm">
                              {item.show.theater}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Seats */}
                      <div className="flex items-start gap-3">
                        <Ticket className="w-5 h-5 text-red-400 mt-1" />
                        <div>
                          <p className="text-xs text-gray-500 mb-2">
                            Your Seats
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {seats.map((seat) => (
                              <span
                                key={seat}
                                className="bg-red-500/20 border border-red-500/50 text-red-300 px-3 py-1 rounded-lg text-sm font-semibold"
                              >
                                {seat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="flex flex-col justify-between items-end min-w-[200px]">
                    <div className="text-right mb-6">
                      <p className="text-gray-500 text-sm mb-1">Total Amount</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                        {currency}
                        {totalAmount}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {seats.length} ticket
                        {seats.length > 1 ? "s" : ""} × {currency}
                        {pricePerSeat}
                      </p>
                    </div>

                    {!item.isPaid ? (
                      <button
                        onClick={() =>
                          alert("Payment feature will be added soon.")
                        }
                        className="relative w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Proceed to Pay
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/50 text-green-400 font-semibold px-6 py-3 rounded-xl">
                        <CheckCircle2 className="w-5 h-5" />
                        Paid
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
