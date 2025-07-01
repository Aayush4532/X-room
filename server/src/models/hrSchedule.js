const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    timeRange: { type: String, required: true },
    candidateId: { type: String, required: true }
  },
  { _id: false }
);

const scheduleSchema = new mongoose.Schema(
  {
    hrId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    room: { type: String, required: true },
    slots: {
      type: [slotSchema],
      default: [],
      validate: [
        v => v.length > 0,
        "At least one interview slot is required"
      ]
    }
  },
  { timestamps: true }
);

scheduleSchema.index({ hrId: 1, date: 1 }, { unique: true });
module.exports = mongoose.model("Schedule", scheduleSchema);