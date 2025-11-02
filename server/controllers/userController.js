import Booking from "../models/Booking.js";
import { clerkClient } from "@clerk/clerk-sdk-node";
 

// API Controller Function to Get User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({ user })
            .populate({
                path: "show",
                populate: { path: "movie" }
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};
// ✅ API Controller Function to Add Favorite Movie in Clerk User Metadata
export const addFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId);

        // Initialize favorites array if not present
        if (!user.privateMetadata.favorites) {
            user.privateMetadata.favorites = [];
        }

        // Add movieId if not already in favorites
        if (!user.privateMetadata.favorites.includes(movieId)) {
            user.privateMetadata.favorites.push(movieId);
        }

        // Update user metadata
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                favorites: user.privateMetadata.favorites
            }
        });

        res.json({
            success: true,
            message: "Movie added to favorites successfully",
            favorites: user.privateMetadata.favorites
        });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};
// ✅ API Controller Function to Get Favorite Movies
export const getFavorites = async (req, res) => {
    try {
        const user = await clerkClient.users.getUser(req.auth().userId);
        const favorites = user.privateMetadata.favorites || [];

        // Getting movies from database using favorite IDs
        const movies = await Movie.find({ _id: { $in: favorites } });

        res.json({
            success: true,
            count: movies.length,
            movies
        });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};