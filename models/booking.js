const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["waiting", "confirmed", "canceled", "completed"],
    },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;