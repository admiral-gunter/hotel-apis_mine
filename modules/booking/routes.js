import express from 'express';
import { authenticationCheck } from '../../middleware/auth.js';
import { createBookingRoom, deleteBookingRoom, getBookingRoom, updateBookingRoom } from './booking_room.js';

const bookingRouter=express.Router();

const modulePath="/hotel"

bookingRouter.get(modulePath+"/kamar", authenticationCheck,getBookingRoom)
bookingRouter.post(modulePath+"/kamar", authenticationCheck,createBookingRoom)
bookingRouter.put(modulePath+"/kamar/:id", authenticationCheck,updateBookingRoom)
bookingRouter.delete(modulePath+"/kamar/:id", authenticationCheck,deleteBookingRoom)

export default bookingRouter