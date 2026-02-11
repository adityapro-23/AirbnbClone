if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const Agenda = require("agenda");
const Booking = require("../models/booking");
const mongoose = require("mongoose");

const mongoConnectionString = process.env.ATLASDB_URL;

// Safety Check: Ensure DB connection string exists
if (!mongoConnectionString) {
    console.error("AGENDA ERROR: process.env.ATLASDB_URL is undefined.");
    // In production, we might not want to crash the whole app just for the scheduler,
    // so we return instead of exit, but logging the error is crucial.
}

const agenda = new Agenda({ 
    db: { address: mongoConnectionString, collection: "agendaJobs" }
});

agenda.define("Refactoring booking status", async (job) => {
    // Safety Check: Ensure Mongoose is connected before querying
    if (mongoose.connection.readyState !== 1) return;

    const now = new Date();

    try {
        // Task 1: Mark finished trips as 'completed'
        const completedResult = await Booking.updateMany(
            { 
                endDate: { $lt: now },
                status: "confirmed" 
            },
            { $set: { status: 'completed' } }
        );
        
        // Task 2: Auto-Cancel ignored requests
        const expiredResult = await Booking.updateMany(
            {
                startDate: { $lt: now },
                status: "waiting"
            },
            { $set: { status: 'canceled' } }
        );

        console.log(`[Agenda] Maintenance Run:`);
        // Only log if changes happened (Reduces log noise in production)
        if (completedResult.modifiedCount > 0 || expiredResult.modifiedCount > 0) {
            console.log(`   - Completed Trips: ${completedResult.modifiedCount}`);
            console.log(`   - Expired Requests: ${expiredResult.modifiedCount}`);
        } else {
            console.log("   - No changes needed.");
        }
    } catch (err) {
        console.error("Agenda Job Error:", err);
    }
});

const startAgenda = async () => {
    // If no DB string, don't start (prevents crash)
    if (!mongoConnectionString) return;

    try {
        await agenda.start();
        
        // 1. Clear old job locks from previous restarts (Prevents "Stuck" jobs)
        await agenda.cancel({ name: "Refactoring booking status" });

        // 2. Schedule the job to run every 10 minutes
        await agenda.every("10 minutes", "Refactoring booking status");
        
        // 3. Run once immediately on startup to catch up on downtime
        await agenda.now("Refactoring booking status");
        
        console.log("✅ Agenda Scheduler active.");
    } catch (err) {
        console.error("❌ Agenda Start Error:", err);
    }
};

module.exports = startAgenda;