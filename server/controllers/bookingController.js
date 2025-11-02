import Show from "../models/Show.js";
import Booking from "../models/Booking.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----------------------------------------------------------------------
// Function to check availability of selected seats for a movie
// ----------------------------------------------------------------------
const checkSeatsAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) return false;

    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaken = selectedSeats.some((seat) => occupiedSeats[seat]);
    return !isAnySeatTaken;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// ----------------------------------------------------------------------
// Function to create a new booking and start Stripe Checkout
// ----------------------------------------------------------------------
export const createBooking = async (req, res) => {
  try {
    const userId = req.auth; // from middleware (Clerk or JWT)
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers; // frontend origin (http://localhost:5173)

    // 1️⃣ Check seat availability
    const isAvailable = await checkSeatsAvailability(showId, selectedSeats);
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Selected seats are not available.",
      });
    }

    // 2️⃣ Get show details
    const showData = await Show.findById(showId).populate("movie");
    if (!showData) {
      return res.json({
        success: false,
        message: "Show not found.",
      });
    }

    // 3️⃣ Create a new booking in DB
    const booking = await Booking.create({
      user: userId,
      show: showId,
      amount: showData.showPrice * selectedSeats.length,
      bookedSeats: selectedSeats,
    });

    // 4️⃣ Mark selected seats as occupied
    selectedSeats.forEach((seat) => {
      showData.occupiedSeats[seat] = userId;
    });
    showData.markModified("occupiedSeats");
    await showData.save();

    // 5️⃣ Create Stripe checkout session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: showData.movie?.title || "Movie Ticket",
              description: `Seats: ${selectedSeats.join(", ")}`,
            },
            unit_amount: Math.floor(showData.showPrice * 100),
          },
          quantity: selectedSeats.length,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?bookingId=${booking._id}`,
      cancel_url: `${origin}/payment-failed?bookingId=${booking._id}`,
    });

    // 6️⃣ Save payment link
    booking.paymentLink = session.url;
    await booking.save();

    res.json({
      success: true,
      message: "Booking created successfully",
      paymentUrl: session.url,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------------------------------------------
// Function to get occupied seats for a show
// ----------------------------------------------------------------------
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const showData = await Show.findById(showId);
    if (!showData) {
      return res.status(404).json({
        success: false,
        message: "Show not found",
      });
    }

    const occupiedSeats = Object.keys(showData.occupiedSeats);
    res.json({
      success: true,
      occupiedSeats,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------------------------------------------------------
// Function to get all bookings for logged-in user
// ----------------------------------------------------------------------
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.auth;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const bookings = await Booking.find({ user: userId }).populate({
      path: "show",
      populate: { path: "movie", model: "Movie" },
    });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};
