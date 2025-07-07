const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema({
  candidateId:  { type: String, required: true },
  status:       { 
    type: String, 
    enum: ["queued", "in-progress", "done"], 
    default: "queued" 
  },
  startedAt:    { type: Date }, 
  finishedAt:   { type: Date } 
}, { _id: true });        

const scheduleSchema = new mongoose.Schema({
  hrId:     { type: String, required: true, index: true },
  date:     { type: Date,   required: true },
  room:     { type: String, required: true },
  slots: {
    type:     [slotSchema],
    default:  [],
    validate: [arr => arr.length > 0, "At least one slot is required"]
  },
  currentSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  "Schedule.slots",
    default: null
  },
  nextSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref:  "Schedule.slots",
    default: null
  }
}, { timestamps: true });

scheduleSchema.index({ hrId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Schedule", scheduleSchema);