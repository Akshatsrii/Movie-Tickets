import express from "express";
import { getFavorites, getUserBookings, addFavorite } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings);
userRouter.post('/update-favorite', addFavorite);
userRouter.get('/favorites', getFavorites);

export default userRouter;
