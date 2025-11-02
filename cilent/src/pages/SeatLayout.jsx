import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import { ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const movieShow = dummyShowsData.find((item) => item.id === parseInt(id));
    if (movieShow) setShow(movieShow);
  }, [id]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select time first");
    }
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 seats");
    }

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <button
              key={seatId}
              onClick={() => handleSeatClick(seatId)}
              className={`h-8 w-8 rounded border border-primary/60 cursor-pointer text-sm transition ${
                selectedSeats.includes(seatId)
                  ? "bg-primary text-white"
                  : "hover:bg-primary/20"
              }`}
            >
              {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (!show) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-white">
        Loading show details...
      </div>
    );
  }

  return (
    /* <-- only changes: added min-h-screen and relative here so BlurCircle appears,
           and increased mt on the right-side container below from mt-10 -> mt-20 */
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-10 md:pt-20 min-h-screen relative">
      {/* Left: Available Timings */}
      <div className="w-64 bg-primary/10 border border-primary/20 rounded-lg py-6 h-max md:sticky md:top-30 text-white">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-2 px-4">
          {dummyDateTimeData[date] && dummyDateTimeData[date].length > 0 ? (
            dummyDateTimeData[date].map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(item)}
                className={`flex items-center gap-2 px-5 py-2 rounded-md cursor-pointer transition text-left w-full ${
                  selectedTime?.time === item.time
                    ? "bg-primary text-white"
                    : "bg-primary/20 text-white hover:bg-primary/30"
                }`}
              >
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {isoTimeFormat(item.time)}
                </span>
              </button>
            ))
          ) : (
            <div className="text-gray-400 text-sm px-2">
              <p className="mb-2">No timings available for {date}</p>
              <p className="text-xs">Available dates:</p>
              <ul className="text-xs mt-1">
                {Object.keys(dummyDateTimeData).map(availableDate => (
                  <li key={availableDate}>• {availableDate}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Right: Seat Layout */}
      <div className="relative flex-1 flex flex-col items-center mt-20 md:mt-0"> {/* <-- mt-20 only */}
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4 text-white">
          Select your seat
        </h1>
        <img src={assets.screenImage} alt="screen" className="mb-1" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
            {groupRows[0].map((row) => renderSeats(row))}
          </div>

          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, idx) => (
              <div key={idx}>
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <button
          onClick={() => {
            if (!selectedTime || selectedSeats.length === 0) {
              toast("Please select time and at least one seat");
              return;
            }
            navigate("/my-bookings", {
              state: { selectedTime, selectedSeats, show },
            });
          }}
          className="mt-10 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/80 transition flex items-center gap-2"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
