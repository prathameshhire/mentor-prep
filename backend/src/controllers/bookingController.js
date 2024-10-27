import { createNewBooking, fetchAllBookings, fetchMenteeBookings, fetchMentorBookings, fetchOneBooking, fetchUpcomingMenteeBookings, fetchUpcomingMentorBookings } from "../db/bookingMethods.js";
import { updateOneMentee } from "../db/menteeMethods.js";
import { fetchOneMentor, updateOneMentor } from "../db/mentorMethods.js";

// ROUTE 1: get all bookings: GET 'api/bookings". [admin]
export const getAllBookings = async (req, res) => {

    let success = false;

    try {
       
        if (req.user.role != "admin") {
            res.status(401).json({success, error: "Unauthorized"});
            return;
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        const query = req.query;

        const bookings = await fetchAllBookings(skip, limit, query);
        success = true;

        res.status(200).json({
            success,
            results: bookings.length,
            data: {
                bookings,
            },
        })

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

// ROUTE 2: get all bookings of mentor: GET 'api/mentor-bookings/:id". [mentor login]
export const getAllMentorBookings = async (req, res) => {

    let success = false;

    try {
       
        if (req.user.role != "mentor" || req.user.id != req.params.id) {
            res.status(401).json({success, error: "Unauthorized"});
            return;
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        let bookings = [];
        if (req.query.upcoming) {
            bookings = await fetchMentorBookings(req.params.id, skip, limit);
        } else {
            bookings = await fetchUpcomingMentorBookings(req.params.id, skip, limit);
        }

        success = true;

        res.status(200).json({
            success,
            results: bookings.length,
            data: {
                bookings,
            },
        })

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

// ROUTE 3: get all bookings of mentee: GET 'api/mentee-bookings/:id". [mentee login]
export const getAllMenteeBookings = async (req, res) => {

    let success = false;

    try {
       
        if (req.user.role != "mentee" || req.user.id != req.params.id) {
            res.status(401).json({success, error: "Unauthorized"});
            return;
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        let bookings = [];
        if (req.query.upcoming) {
            bookings = await fetchMenteeBookings(req.params.id, skip, limit);
        } else {
            bookings = await fetchUpcomingMenteeBookings(req.params.id, skip, limit);
        }

        success = true;

        res.status(200).json({
            success,
            results: bookings.length,
            data: {
                bookings,
            },
        })

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

// ROUTE 4: get all bookings of mentee: GET 'api/bookings/:id". [login required]
export const getOneBooking = async (req, res) => {

    let success = false;

    try {

        let booking = await fetchOneBooking(req.params.id);

        if (!booking) {
            return 
        }
       
        if (req.user.id != req.params.id) {
            res.status(401).json({success, error: "Unauthorized"});
            return;
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        delete req.query.page;
        delete req.query.limit;

        let bookings = [];
        if (req.query.upcoming) {
            bookings = await fetchMenteeBookings(req.params.id, skip, limit);
        } else {
            bookings = await fetchUpcomingMenteeBookings(req.params.id, skip, limit);
        }

        success = true;

        res.status(200).json({
            success,
            results: bookings.length,
            data: {
                bookings,
            },
        })

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}

export const createBooking = async (req, res) => {
    
    let success = false;

    try {

        const { dateOfSession, mentor_id } = req.body;

        const mentor = fetchOneMentor(mentor_id);

        if (!mentor) {
            res.status(404).json({success, error: "mentor not found"});
        }

        const newBooking = {
            dateOfSession,
            mentor_id,
            mentee_id: req.user.id
        }
            
        const booking = await createNewBooking(newBooking);

        mentor = await updateOneMentor({ user_id: mentor_id }, { bookings: [...mentor.bookings, newBooking] });
        const mentee = await updateOneMentee({ user_id: req.user.id }, { bookings: [...mentee.bookings, newBooking] });

        success = true;

        res.status(201).json({
            success,
            data: {
                booking,
            },
        });

    } catch (error) {
       console.log(error.message);
       res.status(500).send("Internal server error");
    }
}
