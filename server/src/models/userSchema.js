const mongoose = require('mongoose');
const { Schema } = mongoose;

const ROLE = Object.freeze({
  CANDIDATE: 'candidate',
  HR: 'hr',
  ADMIN: 'admin',
});

const userSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 59,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre('save', function (next) {
  if (this.isNew && this.role === ROLE.ADMIN && !this.$locals?.allowAdminCreation) {
    return next(new Error('Admin accounts can only be created by the super‑user process'));
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
module.exports.ROLE = ROLE;