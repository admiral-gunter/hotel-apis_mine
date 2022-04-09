import express from 'express';
import { authenticationCheck } from '../../middleware/auth.js';
import { createBookingRoom, deleteBookingRoom, getBookingRoom, getBookingRoomById, updateBookingRoom } from './booking_room.js';

const bookingRouter=express.Router();

const modulePath="/hotel"

bookingRouter.use(authenticationCheck)

bookingRouter.get(modulePath+"/kamar",getBookingRoom)
bookingRouter.get(modulePath+"/kamar/:id", getBookingRoomById)
bookingRouter.post(modulePath+"/kamar",createBookingRoom)
bookingRouter.put(modulePath+"/kamar/:id",updateBookingRoom)
bookingRouter.delete(modulePath+"/kamar/:id",deleteBookingRoom)

export default bookingRouter