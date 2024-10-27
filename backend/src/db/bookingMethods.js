import Booking from "../models/BookingModel.js";

// fetch list of bookings
export const fetchAllBookings = async (skip, limit, query = {}) => {
    const bookings = await Booking.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('mentor_id')
        .populate('mentee_id');
    return bookings;
}

// fetch list of bookings of a mentor
export const fetchMentorBookings = async (mentor_id, skip, limit) => {
    const query = { mentor_id: mentor_id };
    const bookings = await fetchAllBookings(skip, limit, query);
    return bookings;
}

// fetch list of bookings of a mentee
export const fetchMenteeBookings = async (mentee_id, skip, limit) => {
    const query = { mentee_id: mentee_id };
    const bookings = await fetchAllBookings(skip, limit, query);
    return bookings;
}

// fetch list of upcoming bookings of a mentor
export const fetchUpcomingMentorBookings = async (mentor_id, skip, limit) => {
    const currentDate = new Date();
    const query = { mentor_id: mentor_id, dateOfSession: { $gt: currentDate } };
    const bookings = await fetchAllBookings(skip, limit, query);
    return bookings;
}

// fetch list of upcoming bookings of a mentee
export const fetchUpcomingMenteeBookings = async (mentee_id, skip, limit) => {
    const currentDate = new Date();
    const query = { mentee_id: mentee_id, dateOfSession: { $gt: currentDate } };
    const bookings = await fetchAllBookings(skip, limit, query);
    return bookings;
}

// fetch one booking
export const fetchOneBooking = async (id) => {
    const booking = await Booking.findById(id).populate('mentor_id').populate('mentee_id');;
    return booking ? booking : null;
} 

// create booking
export const createNewBooking = async (_booking) => {
    const booking = await Booking.create(_booking);
    return booking;
}
