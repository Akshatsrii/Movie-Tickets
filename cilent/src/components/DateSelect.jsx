import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();

  // Normalize input data
  const dates = Array.isArray(dateTime)
    ? dateTime
    : Array.isArray(dateTime?.dates)
    ? dateTime.dates
    : [];

  // ✅ If no dates found, generate next 7 days automatically
  const fallbackDates =
    dates.length > 0
      ? dates
      : Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() + i);
          return { date: d.toISOString().split("T")[0] };
        });

  const [selectedDate, setSelectedDate] = useState(fallbackDates[0].date);

  const handleBookNow = () => {
    if (selectedDate) {
      // ✅ Navigate to SeatLayout page
      navigate(`/movies/${id}/${selectedDate}`);
    } else {
      alert("Please select a date.");
    }
  };

  return (
    <div className="bg-zinc-900 shadow-2xl shadow-red-900/20 rounded-xl p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-white text-xl font-bold tracking-wide flex-shrink-0">
          Choose Date
        </p>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 flex-grow">
          <button className="p-2 text-white/50 hover:text-white transition duration-200 flex-shrink-0">
            <ChevronLeft className="w-6 h-6" />
          </button>

          {fallbackDates.map((item, index) => {
            const dayNumber = item.date.split("-")[2];
            const monthShort = new Date(item.date).toLocaleString("default", {
              month: "short",
            });

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(item.date)}
                className={`flex flex-col items-center justify-center p-2 h-16 w-16 rounded-lg font-bold text-sm transition-all duration-200 flex-shrink-0 ${
                  selectedDate === item.date
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/50 scale-105"
                    : "bg-zinc-800 text-gray-300 hover:bg-zinc-700/80"
                }`}
              >
                <span className="text-xl leading-none">{dayNumber}</span>
                <span className="text-xs uppercase">{monthShort}</span>
              </button>
            );
          })}

          <button className="p-2 text-white/50 hover:text-white transition duration-200 flex-shrink-0">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <button
          onClick={handleBookNow}
          className="px-10 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-base font-bold transition duration-200 shadow-xl shadow-red-900/70 uppercase tracking-wider flex-shrink-0"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
