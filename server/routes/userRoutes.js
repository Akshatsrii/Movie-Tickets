import express from "express";
import { getFavorites, getUserBookings, addFavorite, makeAdmin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/bookings', getUserBookings);
userRouter.post('/update-favorite', addFavorite);
userRouter.get('/favorites', getFavorites);
userRouter.get('/make-admin', makeAdmin);

export default userRouter;
