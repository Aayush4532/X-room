const express = require("express");
const { customAlphabet } = require("nanoid");
const Schedule = require("../models/hrSchedule");
const HrMiddleware = require("../middleware/HrMiddleware");

const ScheduleRouter = express.Router();

ScheduleRouter.post("/createSchedule", HrMiddleware, async (req, res) => {
    try {
        const nano = customAlphabet(
            "0123456789abcdef1234567890ghijklmnopqrstuvwxyz",
            7
        );
        const roomId = nano();
        const { date, slots } = req.body;
        if (!date) {
            return res.status(400).json({ error: "`date` is required" });
        }
        if (!Array.isArray(slots) || slots.length === 0) {
            return res
                .status(400)
                .json({ error: "`slots` must be a non-empty array of candidateIds" });
        }

        const slotDocs = slots.map((candidateId) => ({
            candidateId,
        }));

        const schedule = new Schedule({
            hrId: req.user.id,
            date: new Date(date),
            room: roomId,
            slots: slotDocs,
            currentSlot: null,
            nextSlot: slotDocs[0]._id
        });

        await schedule.save();

        return res.status(201).json({
            roomId,
            scheduleId: schedule._id,
            nextSlot: schedule.nextSlot
        });
    } catch (err) {
        console.error("createSchedule error:", err);
        if (err.code === 11000) {
            return res
                .status(409)
                .json({ error: "A schedule for this HR on that date already exists" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = ScheduleRouter;