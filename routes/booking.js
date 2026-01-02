const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const bookingController = require("../controllers/bookings.js")
const { isLoggedIn, saveRedirectUrl } = require("../middleware");

router.get("/", isLoggedIn, wrapAsync(bookingController.showBookings));

router.route("/:id")
    .post(isLoggedIn, saveRedirectUrl, wrapAsync(bookingController.createBooking))
    .delete(isLoggedIn, wrapAsync(bookingController.cancelBooking));
module.exports = router;