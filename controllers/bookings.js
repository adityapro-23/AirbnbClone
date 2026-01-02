const Listing = require("../models/listing");
const Booking = require("../models/booking");
const User = require("../models/user");

module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    if(startDate > endDate) {
        req.flash("error", "End date must be after start date!")
        return res.status(400);
    }
    const { user } = req;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect(`${res.locals.redirectUrl}`);
    }

    //Checking for overlapping bookings
    let overlappedBookings;
    if(listing.instantBooking) {
        overlappedBookings = await Booking.find({
            listing: id,
            $and: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
                { status: { $ne: "canceled" } }
            ],
        });
    } else {
        overlappedBookings = await Booking.find({
            lisiting: id,
            $and: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
                { status: { $e: "confirmed" } }
            ],
        });
    }

    if (overlappedBookings.length > 0) {
        req.flash("error", "This listing is not available for the selected dates.");
        return res.redirect(`/listings/${id}`);
    }

    // Calculate total price
    const days = Math.max(
        1,
        Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    );
    const totalPrice = days * listing.price;

    //Creating a new booking
    const newBooking = new Booking({
        listing: id,
        user: user._id,
        startDate,
        endDate,
        totalPrice,
        status: listing.instantBooking ? "confirmed" : "waiting",
    });
    await newBooking.save();

    if(listing.instantBooking) {
        user.bookings.push(newBooking._id);
        await user.save();
        listing.bookings.push(newBooking._id);
        await listing.save();
    } else {
        // Email or msg to the host about booking  
    }

    req.flash("success", listing.instantBooking ? "Booking confirmed!" : "Booking request sent to the host!");
    //res.render("users/bookings.ejs", {listing, newBooking});
    this.showBookings(req, res);
};

module.exports.showBookings = async (req, res) => {
    const { user } = req;
    const bookings = await Booking.find({ user: user._id }).populate("listing").exec();
    res.render("users/bookings.ejs", { bookings });
};

module.exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if(!booking) {
        req.flash("error", "Booking not found!");
        return res.redirect(`${res.locals.redirectUrl}`);
    }
    booking.status = "canceled";
    await booking.save();
    await User.findByIdAndUpdate(booking.user, {$pull: { bookings: booking._id}});
    await Listing.findByIdAndUpdate(booking.listing, {$pull: { bookings: booking._id }});
    req.flash("success", "Booking canceled successfully!");
    res.redirect("/bookings");
};