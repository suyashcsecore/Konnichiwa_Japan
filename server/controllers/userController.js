const User = require('../models/User');

const syncUser = async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, profileImageUrl } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: 'Missing required user data' });
    }

    const user = await User.findOneAndUpdate(
      { clerkId },
      {
        clerkId,
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        profileImageUrl: profileImageUrl || ''
      },
      { upsert: true, new: true } // Creates the user if they don't exist
    );

    console.log(`Synced user to MongoDB: ${email}`);
    res.status(200).json({ success: true, user });

  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: 'Failed to sync user data' });
  }
};

module.exports = {
  syncUser
};
