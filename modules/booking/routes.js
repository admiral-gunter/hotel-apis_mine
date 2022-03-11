import express from 'express';
import { createBookingRoom, deleteBookingRoom, getBookingRoom, updateBookingRoom } from './booking_room.js';

const bookingRouter=express.Router();

const modulePath="/hotel"

bookingRouter.get(modulePath+"/kamar", getBookingRoom)
bookingRouter.post(modulePath+"/kamar", createBookingRoom)
bookingRouter.put(modulePath+"/kamar/:id", updateBookingRoom)
bookingRouter.delete(modulePath+"/kamar/:id", deleteBookingRoom)

export default bookingRouter