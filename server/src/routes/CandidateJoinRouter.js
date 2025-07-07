const express   = require("express");
const Schedule  = require("../models/hrSchedule.js");
const User      = require("../models/userSchema");

const CandidateJoinRouter = express.Router();

CandidateJoinRouter.post("/candidateJoin", async (req, res) => {
  try {
    const { roomId } = req.body;
    if (!roomId) return res.status(400).json({ error: "roomId required" });

    const clerkId = req.headers["x-clerk-id"];
    if (!clerkId) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const schedule = await Schedule.findOne({ room: roomId });
    if (!schedule) return res.status(404).json({ error: "Room not found" });

    let position = null;

    if (schedule.currentSlot) {
      const cur = schedule.slots.id(schedule.currentSlot);
      if (cur?.candidateId === user.email) position = "current";
    }

    if (!position && schedule.nextSlot) {
      const nxt = schedule.slots.id(schedule.nextSlot);
      if (nxt?.candidateId === user.email) position = "next";
    }

    if (!position) return res.status(403).json({ error: "Not your turn" });

    return res.status(200).json({ roomId, position });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = CandidateJoinRouter;