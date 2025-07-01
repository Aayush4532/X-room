const User = require('../models/userSchema');
const { ROLE } = require('../models/userSchema');
const HrMiddleware = async (req, res, next) => {
  try {
    let user = req.user;
    if (!user) {
      const clerkId = req.headers['x-clerk-id'];
      if (!clerkId) {
        return res.status(401).json({ error: 'Unauthorized: Clerk ID missing' });
      }
      user = await User.findOne({ clerkId });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized: user not found' });
      }
      req.user = user;
    }
    if (user.role !== ROLE.HR) {
      return res.status(403).json({ error: 'Forbidden: HRs only' });
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = HrMiddleware;